import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import AllDataToExcel from '../ExportExcelUtils/AllDataToExcel'
import { mesec, godina } from '../utils/SetDate'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import loadingImg from '../img/loading.gif'
import { BCstyle, DB, Doc, obj, SnSh } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'

const AllData:React.FC = () => {
    const [ data, setData ] = useState<obj[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const datum:string =`${mesec}-${godina}`
    const styleSU:BCstyle = {
        backgroundColor:'lightpink'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightgreen'
    }
    const styleG:BCstyle = {
        backgroundColor:'#fbf579',
    }  
    useEffect(()=>{
           setLoading(true)
           const db:DB = firebase.firestore()
           return db.collection('delovi').onSnapshot((snapshot:SnSh) =>{
                const newData:any = snapshot.docs.map((doc:Doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                const tempData = newData.sort((a:any,b:any):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
                setData(tempData)
                setLoading(false)
                }
            )
    },[])
    if(!logg()) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Svi podaci</title>
            </Helmet>
            <div className='row'>
                <div className='col-lg-1'></div>
                {data.length>0 ?       
                (<div className='table-responsive '>
                    <div className="clearfix">
                        <span className="float-left">
                            <h4>Svi podaci koji se trenutno nalaze u bazi</h4> 
                        </span>
                        <span className="float-right">
                            {data.length>0 &&  <h5>Ukupan broj naloga {} <span className="badge badge-danger">{data.length}</span></h5>} 
                        </span>
                    </div>
                    <table className='table table-bordered table-hover mt-4' id='table-to-excel' >
                        <thead>
                            <tr>
                                <th>Serviser</th>
                                <th>Datum</th>
                                <th>Šifra</th>
                                <th>Naziv</th>
                                <th>Količina</th>
                                <th>Nalog</th>
                                <th>Garancija</th>
                                <th>Status</th>
                                <th>Komentar</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data && data.map((item:any)=>(
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
                                <td  style={item.garancija==='U garanciji' ? styleG:undefined }>
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
                    {localStorage.getItem('user')!=='wWrtOckr0gaLsrSNbIZqemJqRCh1' && <AllDataToExcel datum={datum}/>}
                    </div>
                </div>):('Trenutno nema sacuvanih podataka.')
                }
            </div>
        </div>
        )
}

export default AllData
