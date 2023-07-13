// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-qqqjHcVxwDJgEexPL2DcYgfvbLpFCNA",
  authDomain: "frontend-dev-js.firebaseapp.com",
  projectId: "frontend-dev-js",
  storageBucket: "frontend-dev-js.appspot.com",
  messagingSenderId: "1081039282370",
  appId: "1:1081039282370:web:ab6412998856f53af61b5b",
  measurementId: "G-2KD077VCXM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
