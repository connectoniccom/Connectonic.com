import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";

/**
 * This file contains the Firebase Functions for handling Mobile Money payments
 * via MTN and Airtel APIs. It includes endpoints for initiating payments,
 * handling provider callbacks, and a health check.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Create Express app
const app: express.Express = express();

// Middleware to parse JSON bodies
app.use(express.json());
// CORS handling
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).send('');
  } else {
    next();
  }
});

// MTN Mobile Money API configuration
const MTN_API_BASE_URL = "https://sandbox.momodeveloper.mtn.com";
const MTN_API_KEY = process.env.MTN_API_KEY || "";
const MTN_SUBSCRIPTION_KEY = process.env.MTN_SUBSCRIPTION_KEY || "";
const MTN_API_USER_ID = process.env.MTN_API_USER_ID || "";

// Airtel Mobile Money API configuration
const AIRTEL_API_BASE_URL = "https://openapiuat.airtel.com";
const AIRTEL_API_KEY = process.env.AIRTEL_API_KEY || '';

// Define interfaces for type safety
interface PaymentRequest {
  amount: number;
  phoneNumber: string;
  network: string;
  userId: string;
}

interface TransactionDocument {
  userId: string;
  amount: number;
  phoneNumber: string;
  network: string;
  status: string;
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
  providerCallbackData?: unknown; // Use unknown for data of any type
}

interface MTNTokenResponse {
  access_token: string;
}

interface MTNPaymentRequest {
  amount: string;
  currency: string;
 externalId: string;
  payer: {
 partyIdType: string;
 partyId: string;
  };
  payerMessage: string;
  payeeNote: string;
}

interface AirtelTokenResponse {
  access_token: string;
}

interface AirtelPaymentRequest {
  amount: number;
  phone_number: string; // Use snake_case as per API documentation
  reference: string;
}

/**
 * Express route to initiate a mobile money payment.
 * Expects amount, phoneNumber, network (MTN or Airtel), and userId in the
 * request body.
 * Saves transaction details to Firestore and calls the appropriate mobile money API.
 */
app.post("/initiate", async (req, res) => {
  try {
    const { amount, phoneNumber, network, userId }: PaymentRequest = req.body;

    if (!amount || !phoneNumber || !network || !userId) {
      res
        .status(400)
        .send("Amount, phone number, network, and user ID are required.");
      return;
    }

    // Validate network
    if (network !== "MTN" && network !== "Airtel") {
      res.status(400).send("Invalid network specified. Supported networks are MTN and Airtel.");
      return;
    }

    // Generate a unique transaction ID
    const transactionId: string = db.collection("transactions").doc().id;
    
    // Save initial transaction details to Firestore
    const transactionData: TransactionDocument = {
      userId: userId,
      amount: amount,
      phoneNumber: phoneNumber,
      network: network,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("transactions").doc(transactionId).set(transactionData);

    // Based on the 'network', call the respective mobile money API function
    let apiResponse: {
      status: string;
      reference?: string;
      error?: string;
    };
    
    if (network === "MTN") {
      apiResponse = await initiateMTNPayment(amount, phoneNumber, transactionId);
    } else if (network === "Airtel") {
      apiResponse = await initiateAirtelPayment(amount, phoneNumber, transactionId);
    } else {
      // This case should ideally not be reached due to prior validation
      throw new Error("Invalid network");
    }

    // Handle API response
    if (apiResponse && apiResponse.status === "SUCCESS") {
      res.status(200).send({
        status: "initiated",
        transactionId: transactionId,
        providerReference: apiResponse.reference,
      });
    } else {
      // Update transaction status to failed if API call was not successful
      await db.collection("transactions").doc(transactionId).update({
        status: "failed",
        providerCallbackData: { error: apiResponse.error },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.status(500).send(apiResponse.error || "Payment initiation failed");
    }
  } catch (error) {
    console.error("Error initiating mobile money payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Express route to handle callbacks from mobile money providers.
 * The structure of the request body depends on the provider's API.
 * Updates the transaction status in Firestore based on the callback data.
 */
app.post("/callback", async (req, res) => {
  try {
    // The structure of the callback data depends on the mobile money provider
    const callbackData = req.body;

    // Extract transaction ID and status from callback data
    // Note: This will vary based on provider documentation
    const transactionId: string = callbackData.transactionId || callbackData.reference;
    const paymentStatus: string = callbackData.status || callbackData.transactionStatus;

    if (!transactionId || !paymentStatus) {
      console.error(
        "Callback received with missing transaction ID or status:",
        callbackData
      );
      res.status(400).send("Missing transaction ID or status in callback");
      return;
    }

    // Find the transaction in your Firestore database using the transactionId
    const transactionRef = db.collection("transactions").doc(transactionId);
    const transactionDoc = await transactionRef.get();

    if (!transactionDoc.exists) {
      console.error("Callback received for non-existent transaction:", transactionId);
      res.status(404).send("Transaction not found");
      return;
    }

    // Update the transaction status
    await transactionRef.update({
      status: paymentStatus.toLowerCase(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(), // Update timestamp
      providerCallbackData: callbackData,
    });

    res.status(200).send("Callback received successfully");
  } catch (error) {
    console.error("Error handling mobile money callback:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("Mobile Money API is running");
});

/**
 * Fetches an access token from the MTN Mobile Money API.
 * @returns A promise that resolves with the access token string.
 * @throws An error if the token request fails.
 */
async function getMTNAccessToken(): Promise<string> {
  try {
    const fetch = (await import("node-fetch")).default;

    // MTN API requires an access token
    const tokenResponse = await fetch(
      `${MTN_API_BASE_URL}/collection/token/`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${Buffer.from(
            `${MTN_API_USER_ID}:${MTN_API_KEY}`
          ).toString("base64")}`,
          "Ocp-Apim-Subscription-Key": MTN_SUBSCRIPTION_KEY,
        },
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`MTN token request failed with status ${tokenResponse.status}: ${errorText}`);
    }

    // Type assertion for the token response
    const tokenData: MTNTokenResponse =
      (await tokenResponse.json()) as MTNTokenResponse;
    return tokenData.access_token;
  } catch (error) {
    console.error("Error fetching MTN access token:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

/**
 * Initiates a payment request with the MTN Mobile Money API.
 * @param amount - The amount to be paid.
 * @param phoneNumber - The phone number of the payer.
 * @param transactionId - A unique ID for the transaction.
 * @returns A promise that resolves with the status and reference of the payment.
 * @throws An error if the payment initiation fails.
 */
async function initiateMTNPayment(
  amount: number,
  phoneNumber: string,
  transactionId: string
): Promise<{ status: string; reference?: string; error?: string }> {
  try {
    const fetch = (await import("node-fetch")).default;

    // MTN API requires an access token
    const accessToken = await getMTNAccessToken();

    // Prepare payment request data
    const paymentRequest: MTNPaymentRequest = {
      amount: amount.toString(),
      currency: "UGX",
      externalId: transactionId,
      payer: {
        // Payer details as required by MTN API
        partyIdType: "MSISDN",
        partyId: phoneNumber,
      },
      payerMessage: "Payment for service", // Payer message
      payeeNote: "Service payment",
    };

    // Make the payment request
    const paymentResponse = await fetch(`${MTN_API_BASE_URL}/collection/v1_0/requesttopay`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "X-Reference-Id": transactionId, // Unique reference for the request
        "X-Target-Environment": "sandbox", // Specify target environment
        "Content-Type": "application/json", // Content type
        "Ocp-Apim-Subscription-Key": MTN_SUBSCRIPTION_KEY, // Subscription key
      },
      body: JSON.stringify(paymentRequest),
    });

    if (paymentResponse.ok) {
      return { status: "SUCCESS", reference: transactionId };
    } else {
      const errorData = await paymentResponse.text(); // Get error details
      console.error("MTN payment request failed:", errorData);
      return { status: "FAILED", error: "MTN API call failed" };
    }
  } catch (error) {
    console.error("Error in MTN payment initiation:", error);
    return { status: "FAILED", error: "MTN payment initiation error" };
  }
}

/**
 * Fetches an access token from the Airtel Mobile Money API.
 * @returns A promise that resolves with the access token string.
 * @throws An error if the token request fails.
 */
async function getAirtelAccessToken(): Promise<string> {
  try {
    const fetch = (await import("node-fetch")).default;

    // Airtel API requires an access token
    const tokenResponse = await fetch(
      `${AIRTEL_API_BASE_URL}/auth/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
          "Authorization": `Basic ${Buffer.from(`${AIRTEL_API_KEY}:`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(
 `Airtel token request failed with status ${tokenResponse.status}: ${errorText}`
 );
    }

    // Type assertion for the token response
    const tokenData: AirtelTokenResponse =
      (await tokenResponse.json()) as AirtelTokenResponse;
    return tokenData.access_token;
  } catch (error) {
    console.error("Error fetching Airtel access token:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

/**
 * Initiates a payment request with the Airtel Mobile Money API.
 * @param amount The amount to be paid.
 * @param phoneNumber The phone number of the payer.
 * @param transactionId A unique ID for the transaction.
 * @returns A promise that resolves with the status and reference of the payment.
 */
async function initiateAirtelPayment(
 amount: number,
 phoneNumber: string,
 transactionId: string
): Promise<{ status: string; reference?: string; error?: string }> {
  try {
    const fetch = (await import("node-fetch")).default;

    // Airtel API requires an access token
    const accessToken = await getAirtelAccessToken();

    // Prepare payment request data
    const paymentRequest: AirtelPaymentRequest = {
      amount: amount, // Amount as number
      phone_number: phoneNumber,
      reference: transactionId,
    };

    // Make the payment request
    const paymentResponse = await fetch(`${AIRTEL_API_BASE_URL}/v1/payments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Ocp-Apim-Subscription-Key": AIRTEL_API_KEY,
      },
      body: JSON.stringify(paymentRequest),
    });

    if (paymentResponse.ok) {
      const paymentData = (await paymentResponse.json()) as {
        data?: { transaction_id?: string };
      };
      return {
        status: "SUCCESS",
        reference: paymentData.data?.transaction_id || transactionId,
      };
    } else {
      const errorData = await paymentResponse.text();
      console.error("Airtel payment request failed:", errorData);
      return { status: "FAILED", error: "Airtel API call failed" };
    }
  } catch (error) {
    console.error("Error in Airtel payment initiation:", error);
    return { status: "FAILED", error: "Airtel payment initiation error" };
  }
}

// Export the Express app as a Firebase Function
export const mobileMoney = functions.https.onRequest(app);
