import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };