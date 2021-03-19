
import firebase from '../db/config'
let tempU:string =''

const getUser:any = () => {
    const localD:any = localStorage.getItem('user')
    if(localD){
        const db = firebase.firestore()
        db.collection('users').doc(localD).onSnapshot((doc:any)=>{
        tempU=doc.data().firstName+' '+doc.data().lastName
        })
        return tempU
    }
    else{   
    }
}
export default getUser
    
