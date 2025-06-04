import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA-xw_cXP6W-QqWrBbmGu_qxXt2wOBVphQ",
  authDomain: "ac-walla.firebaseapp.com",
  projectId: "ac-walla",
  storageBucket: "ac-walla.firebasestorage.app",
  messagingSenderId: "884110701231",
  appId: "1:884110701231:web:e8d8cb88d7a9de39e85a5a",
  measurementId: "G-145GQB201K",
  databaseURL: "https://ac-walla-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);