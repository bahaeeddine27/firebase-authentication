// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5ASnQnBnDrjVL7YrNlgQZ60OW8QC1gFc",
  authDomain: "test-auth-1427.firebaseapp.com",
  projectId: "test-auth-1427",
  storageBucket: "test-auth-1427.appspot.com",
  messagingSenderId: "495978913003",
  appId: "1:495978913003:web:d1f643b42a992ee46c32ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);