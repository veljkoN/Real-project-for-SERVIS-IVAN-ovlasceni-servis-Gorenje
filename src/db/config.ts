import firebase from 'firebase/app'
import 'firebase/firestore'
import { FirebaseConfig } from '../Type_Interfaces/Interfaces'
const firebaseConfig: FirebaseConfig = {
  apiKey: ".........",
}  
firebase.initializeApp(firebaseConfig)   
  
export default firebase


 
