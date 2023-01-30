// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyA2kUGmPan6YZ2ib5qt6XiKCjBypg2M5Kk",
  authDomain: "vite-chat-d5fe7.firebaseapp.com",
  projectId: "vite-chat-d5fe7",
  storageBucket: "vite-chat-d5fe7.appspot.com",
  messagingSenderId: "727742212884",
  appId: "1:727742212884:web:7c9963bbe7a92c86b63001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()