import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz7a-gwPWgXMNh85ZdgewFvBj0SxLm8Lc",
  authDomain: "multivendor-e2573.firebaseapp.com",
  projectId: "multivendor-e2573",
  storageBucket: "multivendor-e2573.appspot.com",
  messagingSenderId: "871440151449",
  appId: "1:871440151449:web:e0923eafaa8134ac4f5908",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
