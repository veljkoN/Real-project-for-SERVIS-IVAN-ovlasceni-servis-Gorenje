import firebase from '../db/config'
require('firebase/auth')

const  logg = () =>{
    const auth =firebase.auth()
    auth.onAuthStateChanged(((user:any)=>{
        if(user){
            localStorage.setItem('user', user.uid)
        }
        })
    )
    return localStorage.getItem('user')
}

export default logg