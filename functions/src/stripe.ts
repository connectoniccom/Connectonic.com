
import {onCall} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

export const getStorageFile = onCall(async (request) => {
  const {filePath} = request.data;
  if (!filePath || typeof filePath !== "string") {
    throw new Error("File path is required.");
  }

  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    if (!exists) {
      throw new Error("File not found.");
    }
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });
    return {signedUrl: url};
  } catch (error) {
    console.error("Error getting signed URL", error);
    throw new Error("Could not get file URL.");
  }
});
