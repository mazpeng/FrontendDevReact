// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIriMYivyprUKBuH8cznD-KhjOu0tsZJg",
  authDomain: "react-projectdev.firebaseapp.com",
  databaseURL: "https://react-projectdev-default-rtdb.firebaseio.com",
  projectId: "react-projectdev",
  storageBucket: "react-projectdev.appspot.com",
  messagingSenderId: "9665166090",
  appId: "1:9665166090:web:bbcac6b0adf906f4a498f3",
  measurementId: "G-N24K6Y80YF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
