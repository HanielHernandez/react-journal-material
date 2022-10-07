// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqwpujkS7y2EJzR9MSOKC3GLsqRxdC5-8",
  authDomain: "firechat-c857f.firebaseapp.com",
  projectId: "firechat-c857f",
  storageBucket: "firechat-c857f.appspot.com",
  messagingSenderId: "50201580034",
  appId: "1:50201580034:web:da6d10e3cfd9a5a3884d1b"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB   = getFirestore(FirebaseApp)