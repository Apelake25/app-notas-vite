import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZg1MMKY5xx1HE_jHXJyirMjPDX57HoGs",
  authDomain: "app-notas-1d2e7.firebaseapp.com",
  projectId: "app-notas-1d2e7",
  storageBucket: "app-notas-1d2e7.firebasestorage.app",
  messagingSenderId: "869972714109",
  appId: "1:869972714109:web:de8cd3aa34dd65ea408714"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
