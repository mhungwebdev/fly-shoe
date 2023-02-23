// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getMessaging,getToken,onMessage } from "firebase/messaging";

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
const firebaseApp:FirebaseApp = initializeApp(firebaseConfig);
const dbFireStore:Firestore = getFirestore(firebaseApp);
const messaging = getMessaging(firebaseApp);
const token = await getToken(messaging,{vapidKey:`BC7TT0p04BRfbLdZmzzVJilexS2Y_GsPcIbeEd1vH5FvW1Wci4TTT34zd77qdUlbEwrZwBi1PNKwvYN_MEnT_Rk`});

export {firebaseApp,fbProvider,ggProvider,dbFireStore,token,messaging};