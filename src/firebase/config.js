import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9aSZ5v4xM98_cWdBs1Uq3AOQ0rHPaosE",
    authDomain: "vinotecaalvarezrapetti.firebaseapp.com",
    projectId: "vinotecaalvarezrapetti",
    storageBucket: "vinotecaalvarezrapetti.appspot.com",
    messagingSenderId: "341382980273",
    appId: "1:341382980273:web:ce4d73ccaa0c0a486eb890"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);