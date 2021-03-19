import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import { DB, Doc, handleS, SnSh } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'

let handleSubmit:handleS
const NewWorker:React.FC= () => {
    const [ serviser, setServiser ] = useState<string>('')
    const [ sviServiseri, setSviServiseri ] = useState<string[]>([])
    const [ msgInfo, setMsgInfo ] = useState<string>('')
    useEffect(()=>{
        const db:DB = firebase.firestore()
        return db.collection('serviseriLista').onSnapshot((snapshot:SnSh) =>{
             const newData:any = snapshot.docs.map((doc:Doc)=>({
                 id:doc.id,
                 ...doc.data()
             }))
             setSviServiseri(newData)
        })
    },[])
    handleSubmit = (e) => {
        e.preventDefault()
        let serviserItem = document.querySelector('#serviser') as HTMLInputElement
        if(serviserItem.value!==''){
            firebase.firestore().collection('serviseriLista').add({
                serviser:serviser
            }).then(() =>{
                setMsgInfo('Serviser je dodat na listu')
                serviserItem.value=''
            }).catch(err =>{
               setMsgInfo(err)
            })
        }
        else{
            setMsgInfo('Polje ne moze biti prazno')
        }
    }
    if(!logg()) return <Redirect to='/prijava'/>
    else if(localStorage.getItem('user')==='wWrtOckr0gaLsrSNbIZqemJqRCh1') return <Redirect to='/sviPodaci'/>
    return (
        <div className='container '>
            <Helmet>
                <title>GServis-IVAN | Novi serviser</title>
            </Helmet>
            <div className='row mt-2'>
                <div className='col-lg-2'></div>
                <div className='col-lg-6'>
                    <h5>Dodaj novog servisera u listu</h5>
                    <div className="alert alert-secondary">
                         Unesite ime i prezime servisera
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            <div className="input-group mb-3">
                                <input type='text' className="form-control" placeholder='Ime i prezime' id='serviser' onChange={(e)=>setServiser(e.currentTarget.value)} />
                                <div className="input-group-append">
                                    <button type='submit' className='btn btn-success'>Potvrdi</button>
                                </div>
                            </div>
                        </form>
                        <p>{msgInfo}</p>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <h5>Lista aktivnih servisera</h5>
                    <ul className="list-group">
                        {sviServiseri && sviServiseri.map((data:any)=>(
                        <li className="list-group-item list-group-item-warning mb-1 text-center" key={data.id}>
                            {data.serviser}
                        </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NewWorker
