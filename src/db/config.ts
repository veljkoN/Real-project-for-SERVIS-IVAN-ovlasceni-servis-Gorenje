import firebase from 'firebase/app'
import 'firebase/firestore'
import { FirebaseConfig } from '../Type_Interfaces/Interfaces'
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBmi5aDL8XyVfcFJOrUEKJqfkBTJb1-k9Y",
    authDomain: "g-service-4f3ae.firebaseapp.com",
    projectId: "g-service-4f3ae",
    storageBucket: "g-service-4f3ae.appspot.com",
    messagingSenderId: "1037726900717",
    appId: "1:1037726900717:web:1f0ba96a512634b475c7e4",
    measurementId: "G-EMCWV86QRL"
  }
  firebase.initializeApp(firebaseConfig) 

  export default firebase    

  
