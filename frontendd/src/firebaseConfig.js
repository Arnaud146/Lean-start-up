// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Ajoutez cette ligne

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGtnLUjAIZrm8JAS9Gd5mht-oMXYrH85I",
  authDomain: "handy-s-6961d.firebaseapp.com",
  projectId: "handy-s-6961d",
  storageBucket: "storageBucket: handy-s-6961d.appspot.com",
  messagingSenderId: "760769633537",
  appId: "1:760769633537:web:4bce1c1903e9c22291cf00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app); // ✅ Ajoutez cette ligne

export default app;