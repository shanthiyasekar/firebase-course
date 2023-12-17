import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDqBMmy86bZbYwmNTVz7x0xNGYrBiTeWrI",
  authDomain: "fir-course-88e04.firebaseapp.com",
  projectId: "fir-course-88e04",
  storageBucket: "fir-course-88e04.appspot.com",
  messagingSenderId: "116129428342",
  appId: "1:116129428342:web:a0d06471239485e6e78057",
  measurementId: "G-HX7ELY7X88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);