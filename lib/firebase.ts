
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";

let app: FirebaseApp;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// This function initializes Firebase and returns the app instance.
// It ensures that Firebase is initialized only once.
export function getFirebaseApp() {
  if (!getApps().length) {
    if (!firebaseConfig.apiKey) {
      console.error("Firebase config is missing API key. App cannot be initialized.");
      // We can't proceed without a config, so we throw an error or handle it.
      throw new Error("Missing Firebase configuration.");
    }
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  return app;
}
