import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHziJvkiRWbB_Ol1A1rePIguzIHQ8fj54",
    authDomain: "decentralized-blog-68ea9.firebaseapp.com",
    projectId: "decentralized-blog-68ea9",
    storageBucket: "decentralized-blog-68ea9.firebasestorage.app",
    messagingSenderId: "539539986620",
    appId: "1:539539986620:web:0f90a2f086862bdcfed8b9",
    measurementId: "G-G0TL23WTBK"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);