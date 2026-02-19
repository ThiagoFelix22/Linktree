
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC5wF75yxlUatgr0cyDwFAPPawCi2RDOKo",
  authDomain: "reactlinks-f93c7.firebaseapp.com",
  projectId: "reactlinks-f93c7",
  storageBucket: "reactlinks-f93c7.firebasestorage.app",
  messagingSenderId: "594985020031",
  appId: "1:594985020031:web:f1f922f349e2b51842ed4a",
  measurementId: "G-G4CN6W58YK"
};

const app = initializeApp(firebaseConfig);
const auth =  getAuth(app)
const db = getFirestore(app)

export {auth, db}