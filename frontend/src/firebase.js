import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace these values with the ones Firebase gives you in Step 1
const firebaseConfig = {
  apiKey: "AIzaSyDcStl4H79HlA2YQXGeasUexFZcyS10KCs",
  authDomain: "servicebookingapp-61633.firebaseapp.com",
  projectId: "servicebookingapp-61633",
  storageBucket: "servicebookingapp-61633.firebasestorage.app",
  messagingSenderId: "943404241359",
  appId: "1:943404241359:web:1ef275fcd88954a3d002ba"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();