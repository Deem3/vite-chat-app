// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCedMAznG4HJ2MY0yifufFwdBs8xGxaMFo",
  authDomain: "vite-chat-app.firebaseapp.com",
  projectId: "vite-chat-app",
  storageBucket: "vite-chat-app.appspot.com",
  messagingSenderId: "493018459843",
  appId: "1:493018459843:web:2b952f0cbc678128dafc76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()