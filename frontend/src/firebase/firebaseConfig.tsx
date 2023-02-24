import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCgZi3MgkZ_LrODhwJPC7ezqcMPmOSlxIs",
  authDomain: "be-a-developer.firebaseapp.com",
  projectId: "be-a-developer",
  storageBucket: "be-a-developer.appspot.com",
  messagingSenderId: "1096840637613",
  appId: "1:1096840637613:web:2a0eef3e0bbc7abb362a24",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

