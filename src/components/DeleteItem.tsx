import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import loadingImg from '../img/loading.gif'
import { dat } from '../Type_Interfaces/Interfaces'
import { DeleteI, Doc, handleS, obj, SnSh } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
let handleSubmit:handleS
let deleteItem:DeleteI

const DeleteItem:React.FC = () => {
  const [ allData, setAllData ] = useState<obj[]>([])
  const [ item, setItem ] = useState<number | string>('')
  const [ filData, setFilData ] = useState<obj[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ msgInfo, setMsgInfo ] = useState<string>('')
  useEffect(()=>{
    setLoading(true)
    const abortController = new AbortController()
    firebase.firestore().collection('delovi').get().then(((snapshot:SnSh) =>{
      const newData:any = snapshot.docs.map((doc:Doc)=>({
        id:doc.id,
        ...doc.data()
      }))
    setAllData(newData.sort((a:dat,b:dat) => b.datum.localeCompare(a.datum)))
    setLoading(false) 
    })).catch(err=>console.log(err))
    return  () => {
      abortController.abort()
    }
  },[])
  handleSubmit = e => {
    e.preventDefault()
    setMsgInfo('')
    if(item===''){
      setMsgInfo('Polje mora biti popunjeno')
    }
    else{
      const newData1:any = allData.filter((data:any) => {
      if(data.nalog===item){
        return data
      }
      else{
        setMsgInfo(`Broj naloga ${item} ne postoji`)
        return  null
      }
    })
    if(newData1.length>0){
      setMsgInfo('')
    }
    setFilData(newData1)
    }
  }
  deleteItem = id => {
    const nalog = document.querySelector('#nalog-br') as HTMLInputElement
    firebase.firestore().collection('delovi').doc(id).delete().then(()=>{
      setMsgInfo(`Nalog ${item} je obrisan sa liste`)
      nalog.value=''
      setItem('')
    }).catch((err) =>{
      console.log(err)
    })
  }
  if(!logg()) return <Redirect to='/prijava'/>
  if(loading){
    return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
  }
  return (
    <div className='container'>
       <Helmet>
          <title>GServis-IVAN | Obriši nalog</title>
      </Helmet>
      <div className='row mt-2'>
        <div className='col-sm-3'></div>
        <div className='col-sm-6'>
          <h5>Izbriši nalog</h5>
          <div className="alert alert-secondary">
            <form onSubmit={(e)=>handleSubmit(e)}>
              Unesite broj naloga koji želite da izbrišete
              <div className="input-group mb-3">
                <input type='number'className="form-control" placeholder='Broj naloga' id='nalog-br' onChange={(e:any)=>setItem(Number(e.currentTarget.value))} />
                <div className="input-group-append">
                  <button type='submit' className='btn btn-success'>Prikaži</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='col-sm-3'>{msgInfo}</div>
      </div>
      <div className=' table-responsive'>
        {msgInfo==='' && filData.length>0 && <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Serviser</th>
            <th>Datum</th>
            <th>Sifra</th>
            <th>Naziv</th>
            <th>Kolicina</th>
            <th>Nalog</th>
            <th>Garancija</th>
            <th>Status</th>
            <th>Komentar</th>
            {localStorage.getItem('user')==='WiVVMq2MUwWw18ZvnNNvSYl7vOG3'? <th>Korisnik</th>:null}
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {filData && filData.map((data:any)=>(
          <tr key={data.id}>
            <td>
              {data.serviser}
            </td>
            <td>
              {data.datumItem}
            </td>
            <td>
              {data.sifra}
            </td>
            <td>
              {data.naziv}
            </td>
            <td>
              {data.kolicina}
            </td>
            <td>
              {data.nalog===11111 ? ('Privatno'):(data.nalog)}
            </td>
            <td>
              {data.garancija}
            </td>
            <td>
              {data.nalog===11111 ? ('Privatno'):(data.status)}
            </td>
            <td>
              {data.komentar}
            </td>
            {localStorage.getItem('user')==='WiVVMq2MUwWw18ZvnNNvSYl7vOG3'?  
            (<td>
              <p>{data.korisnik}</p>
            </td>):null
            }
            <td>
              <button className="btn btn-outline-danger btn-sm" onClick={()=>  {if (window.confirm('Da li ste sigruni da želite da obrišete izabrani nalog?')) deleteItem(data.id)}}>Obriši nalog</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>}
    </div>
  </div>
  )
}

export default DeleteItem
