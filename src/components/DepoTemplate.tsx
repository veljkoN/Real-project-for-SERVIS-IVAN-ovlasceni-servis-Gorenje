import React, { useRef } from 'react';
import { Redirect } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import logg from '../AuthComponent/LoggedIn';
import PrintDepo from './PrintDepo';
import { Helmet } from 'react-helmet'

const DepoTemplate = () => {
  const componentRef: any = useRef();
  const handlePrint:any = useReactToPrint({ 
    content: () => componentRef.current,
  });
  const setLs = () =>{
    let LsNumb:string | null = localStorage.getItem('numb')
    localStorage.setItem('numb',`${Number(LsNumb)+1}`)
  }
  if(!logg()) return <Redirect to='/prijava'/>
  return (
    <div>
      <Helmet>
          <title>GServis-IVAN | Depozit</title>
      </Helmet>
      <PrintDepo ref={componentRef}/>
      <button className='btn btn-success' style={{position:'absolute',top:'90px',right:'20px'}} onClick={()=>{handlePrint();setLs()}}><i className="fa fa-print" ></i></button>
    </div>
  );
};
export default DepoTemplate