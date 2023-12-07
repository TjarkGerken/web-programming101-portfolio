import firebase from "firebase/compat/app";
import "firebase/compat/auth";

/**
 * Firebase Configuration from Environment Variables
 * @type {{storageBucket: any, apiKey: any, messagingSenderId: any, appId: any, projectId: any, measurementId: any, authDomain: any}}
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
export const firebase_app = firebase.initializeApp(firebaseConfig);

const fire_store_db = firebase_app.firestore;
/**
 * Sets the Firebase Authentication Persistence to Local Storage so the user stays logged in
 * @type {Promise<void>}
 */
const auth = firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default { firebase_app, fire_store_db };
