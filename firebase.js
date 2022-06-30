// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR3JwMWC5Vh2GWPyivUdrlFWcxBBG90rs",
  authDomain: "port-insta.firebaseapp.com",
  projectId: "port-insta",
  storageBucket: "port-insta.appspot.com",
  messagingSenderId: "311704301798",
  appId: "1:311704301798:web:5baf55e8ab29f27cd88b27",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { db, app, storage };
