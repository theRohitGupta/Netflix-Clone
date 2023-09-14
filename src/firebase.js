  // Import the functions you need from the SDKs you need
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';
  import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.firebase_key,
  authDomain: "netflixclone-byrohitgupta.firebaseapp.com",
  projectId: "netflixclone-byrohitgupta",
  storageBucket: "netflixclone-byrohitgupta.appspot.com",
  messagingSenderId: "448296912936",
  appId: "1:448296912936:web:0d0e763062a86e1f724d1d"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export {auth};
export default db;