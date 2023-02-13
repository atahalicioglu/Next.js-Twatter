// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCaPS0Y5oh-RrwHCcyxCbZe0STbM9MiK3A",
  authDomain: "nextjs-fullstack-f17e3.firebaseapp.com",
  projectId: "nextjs-fullstack-f17e3",
  storageBucket: "nextjs-fullstack-f17e3.appspot.com",
  messagingSenderId: "456845287668",
  appId: "1:456845287668:web:1d4064aa5790581fcd3ea1",
  measurementId: "G-H0JG073MMK"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

