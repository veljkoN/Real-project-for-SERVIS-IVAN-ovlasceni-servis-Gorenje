import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import firebase from '../db/config'
import loadingImg from '../img/loading.gif'
import { dat } from '../Type_Interfaces/Interfaces'
import { BCstyle, DeleteMO, Doc, obj, SnSh, DocGT, DocGTItem, HandleCLDD } from '../Type_Interfaces/types'
import { getM } from '../utils/SetDate'
import { Helmet } from 'react-helmet'
require('firebase/auth')
let years:Array<number> = []
for(let i=2019; i<2040;i++){
    years.push(i+1)
}
let deleteMonth:DeleteMO
let handleClick:HandleCLDD

const DeleteData:React.FC = () => {
    const [ monCurr, setMonCurr ] = useState<any>('')
    const [ yearCurr, setYearCurr ] = useState<any>('')
    const [ dataAll, setDataAll ] = useState<obj[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ data, setData ] = useState<object[]>([])
    const [ showBtn, setShwoBtn ] =useState<boolean>(false)
    const [ msgInfo, setMsgInfo] = useState<string>('')
    const styleSU:BCstyle = {
        backgroundColor:'lightpink'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightgreen'
    }
    
    const styleG:BCstyle = {
        backgroundColor:'yellow'
    }
    useEffect(()=>{
        setLoading(true)
        const db = firebase.firestore()
        return db.collection('delovi').onSnapshot((snapshot:SnSh) =>{
            const newData:any = snapshot.docs.map((doc:Doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setDataAll(newData.sort((a:dat,b:dat) => b.datum.localeCompare(a.datum)))
            setLoading(false)
        }
        )
    },[])
    deleteMonth = (monCurr:number,yearCurr:string) => {   
    const dateCurr:string = `${monCurr}-${yearCurr}`
    firebase.firestore().collection('delovi').where('datumBrisanje','==',dateCurr).get().then((doc:DocGT) => {
        (doc.forEach((item:DocGTItem)=>{
            item.ref.delete()
            }))
            setMsgInfo(`Svi podaci za mesec ${getM(monCurr-1)} ${yearCurr} godine su obrisani`)
            setData([])
        })
    }
    handleClick = (monCurr:string,yearCurr:string) => {
        const dateCurr:string =`${monCurr}-${yearCurr}`
        const newData:obj[] = dataAll.filter((item:any)=>{
            if(item.datumBrisanje && item.datumBrisanje.toString().toLowerCase().indexOf(dateCurr.toLowerCase())>-1){
                return item
            }
            else{
                return null
            }
        })
        setData(newData)
        setShwoBtn(true)
    } 
    if(!logg()) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
             <Helmet>
                <title>GServis-IVAN | Obriši podatke</title>
            </Helmet>
            <div className='row'>
            <div className='col-sm-4'></div>
            <div className='col-sm-4'>
            <h5>Brisanje podataka</h5>
                Izaberi mesec i godinu 
                <form className="form-inline" onSubmit={(e)=>{e.preventDefault();  handleClick(monCurr,yearCurr)}} >
                <select className="form-control form-control-sm ml-1 mt-1" id='selectMon' onChange={(e)=>{setData([]);setShwoBtn(false); setMonCurr(e.currentTarget.value)}}>
                    <option value=''>-</option>
                    <option value='01'>Januar</option>
                    <option value='02'>Februar</option>
                    <option value='03'>Mart</option>
                    <option value='04'>April</option>
                    <option value='05'>Maj</option>  
                    <option value='06'>Jun</option>
                    <option value='07'>Jul</option>
                    <option value='08'>Avgust</option>
                    <option value='09'>Septembar</option>
                    <option value='10'>Oktobar</option>
                    <option value='11'>Novembar</option>
                    <option value='12'>Decembar</option>
                </select>
                <select className="form-control form-control-sm ml-1 mt-1"  onChange={(e)=>{setYearCurr(e.currentTarget.value)}}>
                    <option value=''>-</option>
                    {years.map((year:any)=>(
                        <option value={year} key={year}>{year}</option>
                    ))
                    }
                </select>
                <div className="clearfix">
                    <span className="float-right">
                        <button className='btn btn-info btn-sm ml-1 mt-1' disabled={monCurr==='' || yearCurr===''?true:false}>Potvrdi</button>
                    </span>
                </div>
                </form>
            </div>
            <div className='col-sm-4'>
                {data.length===0 &&  showBtn && <h4>Nema podataka za izabrani mesec</h4>}
                <p className='text-danger'>{msgInfo}</p>
            </div>
            <div className='col-sm-2'></div>
            {data.length>0 &&
            <div className='table-responsive'>
                <h4>Podaci za mesec {getM(monCurr-1)}</h4>
                <table className='table table-bordered table-centered  table-hover' id='table-to-excel' >
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
                        </tr>
                    </thead>
                    <tbody>
                    {   data && data.map((item:any)=>(
                        <tr key={item.id} style={item.status==='Ugrađen a treba da se vrati'? (styleSU):(item.status==='Ugrađen' || item.status==='Vraćen'? (styleSZ):(undefined))}>
                            <td>
                                {item.serviser}
                            </td>
                            <td>
                                {item.datumItem}
                            </td>
                            <td>
                            <b>{item.sifra}</b>
                            </td>
                            <td>
                                {item.naziv}
                            </td>
                            <td>
                            <b>{item.kolicina}</b>
                            </td>
                            <td>
                                {item.nalog===11111 ? ('Privatno'):(item.nalog)}
                            </td>
                            <td  style={item.garancija==='U garanciji'? styleG:undefined }>
                                {item.garancija}
                            </td>
                            <td>
                                {item.nalog===11111 ? ('Privatno'):(item.status)}
                            </td>
                            <td>
                                {item.komentar}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className='mb-4'>
                    {showBtn && data.length>0 &&  <button className='btn btn-danger' onClick={()=>{ if (window.confirm(`Da li ste sigruni da želite da obrišete sve podatke za ${getM(monCurr-1)} mesec ${yearCurr} godine sa liste?`)) deleteMonth(monCurr,yearCurr)}}>Obriši podatke</button>}
                </div>
            </div>
            }   
        </div>
    </div>
    )
}

export default DeleteData
