// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBQkCorPf61RcUb0axvuLPtvZ7aWRDhXU",
  authDomain: "ecomm-cartridge-valley.firebaseapp.com",
  projectId: "ecomm-cartridge-valley",
  storageBucket: "ecomm-cartridge-valley.appspot.com",
  messagingSenderId: "882129344730",
  appId: "1:882129344730:web:e44e5cf383a80beddcade3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);