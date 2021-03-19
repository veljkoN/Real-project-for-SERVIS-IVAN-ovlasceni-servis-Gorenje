
import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import { DB, DeleteO, DocGTItem, obj, SnSh } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
let deleteOne:DeleteO

const DeleteWorker:React.FC = () => {
    const [ sviServiseri, setSviServiseri ] = useState<obj[]>([])
    const [ msgInfo, setMsgInfo ] = useState<string>('')
    useEffect(()=>{
        const db:DB = firebase.firestore()
        return db.collection('serviseriLista').onSnapshot((snapshot:SnSh) =>{
            const newData:any = snapshot.docs.map((doc:DocGTItem)=>({
                id:doc.id,
                ...doc.data()
            }))
            setSviServiseri(newData)
         })
        
    },[msgInfo])
    deleteOne = (id, name) => {
        const abortController = new AbortController()
        firebase.firestore().collection('serviseriLista').doc(id).delete()
        .then(()=>{
           setMsgInfo(`Serviser ${name} je obrisan sa liste`)
        })
        .catch((err) =>{
           console.log(err)
        })
        return function cleanup (){
            abortController.abort()
        }
    }
    if(!logg()) return <Redirect to='/prijava'/>
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Brisanje servisera</title>
            </Helmet>
            <div className='row mt-2'>
                <div className='col-lg-6 offset-2'>
                <h5>Izbriši servisera</h5>
                <ul  className="list-group mt-1">
                {sviServiseri && sviServiseri.map((data:any)=>(
                    <li className="list-group-item list-group-item-warning mb-1" key={data.id}>
                        <div className="clearfix">
                            <span className="float-left">
                                {data.serviser}
                            </span>
                            <span className="float-right">
                                <button className="btn btn-outline-danger btn-sm" onClick={()=>{
                                if (window.confirm('Da li ste sigruni da želite da obrišete servisera sa liste?')) deleteOne(data.id,data.serviser)
                                }}>Ukloni sa liste</button>
                            </span>
                        </div>
                    </li>
                    ))
                }
                </ul>
            </div>
            <div className='col-lg-4'>
                <p className='text-danger'>{msgInfo}</p>
            </div>
        </div>
    </div>
    )
}

export default DeleteWorker
