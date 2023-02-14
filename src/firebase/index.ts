// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMaCS-GTB4UPydhYiffKLERrc_iopyR_U",
  authDomain: "fly-shoe.firebaseapp.com",
  projectId: "fly-shoe",
  storageBucket: "fly-shoe.appspot.com",
  messagingSenderId: "551756947903",
  appId: "1:551756947903:web:188929e7fe90226504c10a",
  measurementId: "G-RCT6KS6T19"
};


const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();
ggProvider.setCustomParameters({
  'display':'popup'
})
fbProvider.setCustomParameters({
  'display': 'popup'
});


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const dbFireStore = getFirestore(firebaseApp);

export {firebaseApp,fbProvider,ggProvider,dbFireStore};