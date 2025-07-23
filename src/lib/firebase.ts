// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "connectoniccom-k2gsh",
  "appId": "1:370207863142:web:8dec55f0969798e9f098a7",
  "storageBucket": "connectoniccom-k2gsh.appspot.com",
  "apiKey": "AIzaSyA6kP59kWoPLKedD9C2XIcvPHUdJQv4oE0",
  "authDomain": "connectoniccom-k2gsh.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "370207863142"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
