import React,{useState} from 'react'
import firebase from '../db/config'
import { useHistory, Redirect } from 'react-router'
import logg from './LoggedIn'
import { handleSLI } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
require('firebase/auth')

let handleSubmit:handleSLI
const Login:React.FC = () => {
    const history = useHistory()
    if(logg()){
        history.push('/')
    }
    const [ msgError, setMsgError ] = useState<any>('')
    const [ person, setPerson ] = useState<object>({
        email:'',
        pwd:''
    })
    handleSubmit = e => {
        e.preventDefault()
        let { email }:any = person
        let { pwd }:any = person
        const auth =firebase.auth()
        auth.signInWithEmailAndPassword(email,pwd).then((cred) => {
            history.push('/prijava')
            window.location.reload(false)
        }).catch((err)=>{
            setMsgError(err)
        })
    } 
    if(logg()) return <Redirect to='/'/>
    return (
        <div className='container'>
             <Helmet>
                <title>GServis-IVAN | Prijava</title>
            </Helmet>
            <div className='row mt-3'>
                <div className='col-sm-4'></div>
                <div className='col-sm-4 mt-5 borderColor shadow-sm'>
                    <h6>Prijavi se</h6>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="email" style={{fontSize:'0.9em'}}>E-mail:</label>
                        <input type="email" className="form-control form-control-sm" placeholder='E-mail' id='email' onChange={(e) => setPerson({...person,email:e.currentTarget.value})}  />
                        <label htmlFor="pwd" style={{fontSize:'0.9em'}}>Lozinka:</label>
                        <input type="password" className="form-control form-control-sm" placeholder='Lozinka' id='pwd' onChange={(e) => setPerson({...person,pwd:e.currentTarget.value})} />
                        <button type='submit' className='btn btn-success btn-block mt-2'>Potvrdi</button>
                    </form>
                </div>
                <div className='col-sm-4'>
                    <p className='mt-3'>{msgError.message}</p>
                </div>
            </div>
        </div>
    )
}

export default Login
