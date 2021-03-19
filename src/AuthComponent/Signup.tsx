import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router'
import firebase from '../db/config'
import { handleSLI } from '../Type_Interfaces/types'
import validateSignUp,{errorM} from '../utils/signUpUtils'
import logg from './LoggedIn'
import { Helmet } from 'react-helmet'
require('firebase/auth')
let handleSubmit:handleSLI
type personSU = {
    firstName:string,
    lastName:string,
    email:string,
    pwd:string
}

const Signup:React.FC = () => {
    const history = useHistory()
    if(logg()){
        history.push('/')
    }
    const [ person, setPerson ] = useState<personSU>({
        firstName:'',
        lastName:'',
        email:'',
        pwd:''
    })
    const [ msgError, setMsgError ] = useState<any>('')
    const [ msgSignUp,setMsgSignUp ] = useState<any>('')
    handleSubmit = e => {
        e.preventDefault()
        const auth =firebase.auth()
        let { firstName }:personSU = person
        let { lastName }:personSU = person
        let { email }:personSU = person
        let { pwd }:personSU = person
        if(validateSignUp(person)){
            auth.createUserWithEmailAndPassword(email,pwd).then((cred)=>{
                let {uid}:any = cred.user
                localStorage.setItem('user',uid)
                return firebase.firestore().collection('users').doc(uid).set({
                    id:uid,
                    firstName:firstName,
                    lastName:lastName
                })
            }).then(()=>{
                console.log('Created account')
                history.push('/prijava')
                window.location.reload(false)
            }).catch((err)=>{
                setMsgError(err)
            })
        }
        else{
            setMsgSignUp(errorM)
        }
    }
    if(logg()) return <Redirect to='/'/>
    return (
        <div className='container'>
             <Helmet>
                <title>GServis-IVAN | Registracija</title>
            </Helmet>
            <div className='row mt-2'>
                <div className='col-sm-4'></div>
                <div className='col-sm-4 mt-5 borderColor shadow-sm'>
                    <h6>Registruj se</h6>
                    <form onSubmit={(e) => handleSubmit(e)} id='signup-form'>
                        <label htmlFor="firstName" className='label-font-size'>Ime:</label>
                        <input type="text" className="form-control form-control-sm" id='firstName'  placeholder='Ime' onChange={(e) => setPerson({...person,firstName:e.currentTarget.value})} />
                        <label htmlFor="lastName" className='label-font-size'>Prezime:</label>
                        <input type="text" className="form-control form-control-sm" placeholder='Prezime' id='lastName' onChange={(e) => setPerson({...person,lastName:e.currentTarget.value})}  />
                        <label htmlFor="email" className='label-font-size'>E-mail:</label>
                        <input type="email" className="form-control form-control-sm" placeholder='E-mail' id='email' onChange={(e) => setPerson({...person,email:e.currentTarget.value})}  />
                        <label htmlFor="pwd" className='label-font-size'>Lozinka:</label>
                        <input type="password" className="form-control form-control-sm" placeholder='Lozinka' id='pwd' onChange={(e) => setPerson({...person,pwd:e.currentTarget.value})} />
                        
                        <button type='submit' className='btn btn-success btn-block mt-2'>Potvrdi</button>
                    </form>
                </div>
                <div className='col-sm-4'>
                    <p className='mt-3'>{msgError.message}</p>
                    <p className='mt-3 text-danger'>{msgSignUp}</p>
                </div>
            </div>
        </div>
    )
}

export default Signup
