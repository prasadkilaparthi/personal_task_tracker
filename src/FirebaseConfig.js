// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const Api_key = import.meta.env.VITE_APIKEY;
const Auth_Domain = import.meta.env.VITE_AUTHDOMAIN;
const Project_Id = import.meta.env.VITE_PROJECTID;
const Storage_Bucket = import.meta.env.VITE_STORAGEBUCKET;
const Messaging_Sender_id = import.meta.env.VITE_MESSAGINSENDERID;
const App_Id = import.meta.env.VITE_APPID;
const Measurement_id = import.meta.env.VITE_MEASUREMENTID;
const firebaseConfig = {
  apiKey: Api_key,
  authDomain: Auth_Domain,
  projectId: Project_Id,
  storageBucket: Storage_Bucket,
  messagingSenderId: Messaging_Sender_id,
  appId: App_Id,
  measurementId: Measurement_id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
