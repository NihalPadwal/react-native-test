// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH8g-Eo2NqU4IprmjYGn1K-5SAaZNGcSg",
  authDomain: "react-native-chat-app-5059e.firebaseapp.com",
  projectId: "react-native-chat-app-5059e",
  storageBucket: "react-native-chat-app-5059e.firebasestorage.app",
  messagingSenderId: "589539507573",
  appId: "1:589539507573:web:270b52a2f8d513d8ef673c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
