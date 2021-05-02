import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintRes from './PrintRes';
import firebase from '../db/config'
import { Doc, SnSh } from '../Type_Interfaces/types'
import logg from '../AuthComponent/LoggedIn';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet'

const ResTemplate = () => {
  const [ numb, setNumb ] = useState<any>(1)
  useEffect(()=>{
    const db = firebase.firestore()
    return db.collection('resNumb').onSnapshot((snapshot:SnSh) =>{
      const newData:any = snapshot.docs.map((doc:Doc)=>({
          id:doc.id,
          ...doc.data()
      }))
      setNumb(newData)
      } 
    )
  },[])
  const componentRef: any = useRef();
  const handlePrint:any = useReactToPrint({
    content: () => componentRef.current,
  });
  const setNumberInDB = () =>{
    firebase.firestore().collection('resNumb').doc(numb[0].id).update({
      numb: numb[0].numb+1})
  }
  if(!logg()) return <Redirect to='/prijava'/>
  return (
    <div>
       <Helmet>
          <title>GServis-IVAN | Prijemnica</title>
      </Helmet>
      <PrintRes ref={componentRef}/>
      <button className='btn btn-success' style={{position:'absolute',top:'90px',right:'20px'}} onClick={()=>{handlePrint();setNumberInDB()}}><i className="fa fa-print" ></i></button>
    </div>
  );
};
export default ResTemplate 