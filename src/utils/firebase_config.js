import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2Hq54LaolWKSw50GYXHz3ZC0q3dtqW3g",
  authDomain: "resumego-c5137.firebaseapp.com",
  projectId: "resumego-c5137",
  storageBucket: "resumego-c5137.firebasestorage.app",
  messagingSenderId: "241351675958",
  appId: "1:241351675958:web:8511c8b16b66b8ff410897",
  measurementId: "G-J12482MWDS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { firebaseConfig, auth, app, db, storage };
