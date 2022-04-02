import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from "firebase/auth";


//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDe_jEH3DPlGZeGhtjcoBkY2jFgvAcGWBE",
    authDomain: "whatsapp-clone-6f784.firebaseapp.com",
    projectId: "whatsapp-clone-6f784",
    storageBucket: "whatsapp-clone-6f784.appspot.com",
    messagingSenderId: "595444336474",
    appId: "1:595444336474:web:38a5d1cfe364a27dfa5563",
    measurementId: "G-NKYLWM6EKG"
};

//Initialize firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {app, db, storage, auth, provider};
