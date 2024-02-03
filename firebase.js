// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg9iDyVNbp2ehcb3OkEwOzflTGOqg68Ao",
  authDomain: "dinein-7480a.firebaseapp.com",
  projectId: "dinein-7480a",
  storageBucket: "dinein-7480a.appspot.com",
  messagingSenderId: "178739097515",
  appId: "1:178739097515:web:43242b38c34f99fd0eecee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);