import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/storage"
import Environment from "./environments";

// Initialize Firebase
firebase.initializeApp({
  apiKey: Environment["FIREBASE_API_KEY"],
  authDomain: Environment["FIREBASE_AUTH_DOMAIN"],
  databaseURL: Environment["FIREBASE_DATABASE_URL"],
  projectId: Environment["FIREBASE_PROJECT_ID"],
  storageBucket: Environment["FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: Environment["FIREBASE_MESSAGING_SENDER_ID"],
  googleCloudVisionAPIKey: Environment["GOOGLE_CLOUD_VISION_API_KEY"],
});

export default firebase;
