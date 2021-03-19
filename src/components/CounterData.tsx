import React,{ useEffect, useState } from 'react'
import firebase from '../db/config'

const CounterData = () => {
    const [allEdata, setAllEdata] = useState([])
    const [allEdataBulevar, setAllEdataBulevar] = useState([])
    useEffect(()=>{
        const db = firebase.firestore()
        return db.collection('uplodedData').onSnapshot((snapshot) =>{
            const newData:any = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setAllEdata(newData)
            })
        },[])
        useEffect(()=>{
            const db = firebase.firestore()
            return db.collection('bulevar').onSnapshot((snapshot) =>{
                const newData:any = snapshot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setAllEdataBulevar(newData)
                })
            },[])
    return (
        <div>
            {allEdata.length>0? (<h5>Ukupan broj sacuvanih naloga u bazi{} <span className="badge badge-info">{allEdata.length}</span>{' '}<span className="badge badge-success">{allEdataBulevar.length}</span></h5>):(null)}
        </div>
    )
}

export default CounterData
