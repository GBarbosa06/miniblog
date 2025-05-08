import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARYUgx-_3klYM7uQQw8xMsr5KqXugt88U",
  authDomain: "miniblog-gbarbosa.firebaseapp.com",
  projectId: "miniblog-gbarbosa",
  storageBucket: "miniblog-gbarbosa.firebasestorage.app",
  messagingSenderId: "18826349578",
  appId: "1:18826349578:web:b7340a38d4f244a08ee3f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };