// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUDybHiLih6alup24rmAxGlUbPOf8Tudo",
  authDomain: "prueba-6776b.firebaseapp.com",
  projectId: "prueba-6776b",
  storageBucket: "prueba-6776b.firebasestorage.app",
  messagingSenderId: "745152034472",
  appId: "1:745152034472:web:52d12e2ccab5b173c5349d",
  measurementId: "G-QEZX159990"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firebase_db = getFirestore(firebase);