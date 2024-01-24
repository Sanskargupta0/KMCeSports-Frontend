import config from '../config';
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider ,TwitterAuthProvider} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey:`${config.apiKey}`,
  authDomain: `${config.authDomain}`,
  projectId: `${config.projectId}`,
  storageBucket: `${config.storageBucket}`,
  messagingSenderId: `${config.messagingSenderId}`,
  appId: `${config.appId}`,
  measurementId: `${config.measurementId}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const twitterProvide = new TwitterAuthProvider();

export {auth, googleProvider, twitterProvide};