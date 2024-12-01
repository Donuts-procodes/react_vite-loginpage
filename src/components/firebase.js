import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAjdgOgUwNv2LTx2y4Ay4MUoPdha0LIhM8",
  authDomain: "vite-b533a.firebaseapp.com",
  projectId: "vite-b533a",
  storageBucket: "vite-b533a.firebasestorage.app",
  messagingSenderId: "898113520768",
  appId: "1:898113520768:web:88e5304ce8afc0ef3b9265"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;