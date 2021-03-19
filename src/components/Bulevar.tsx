import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import AllDataToExcel from '../ExportExcelUtils/AllDataToExcel'
import { mesec, godina, showDate } from '../utils/SetDate'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import loadingImg from '../img/loading.gif'
import { BCstyle, DB, Doc, obj, SnSh } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
 
const Bulevar:React.FC = () => {
    const [ data, setData ] = useState<obj[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const datum:string =`${mesec}-${godina}`
    const styleSU:BCstyle = {
        backgroundColor:'lightgray'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightblue'
    }
    const styleG:BCstyle = {
        backgroundColor:'lightgreen'
    }
    useEffect(()=>{
        setLoading(true)
        const db:DB = firebase.firestore()
        return db.collection('bulevar').onSnapshot((snapshot:SnSh) =>{
            const newData:any = snapshot.docs.map((doc:Doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            const tempDataPr = newData.sort((a:any,b:any):any => (a.datum > b.datum ? 1 : ((b.datum > a.datum) ? -1 : 0)))
            const tempData = tempDataPr.sort((a:any,b:any):any => (a.ime > b.ime) ? 1 : ((b.ime > a.ime) ? -1 : 0))
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
                <title>GServis-IVAN | Bulevar - tabela</title>
            </Helmet>
            <div className='row'>
                <div className='col-lg-1'></div>
                {data.length>0 ?       
                (<div className='table-responsive mt-2'>
                    <div className="clearfix">
                        <span className="float-left">
                            <h4>Svi podaci koji se trenutno nalaze u magacinu - Bulevar</h4> 
                        </span>
                        <span className="float-right">
                            {data.length>0 &&  <h5>Ukupan broj naloga {} <span className="badge badge-danger">{data.length}</span></h5>} 
                        </span>
                    </div>
                    <table className='table table-bordered table-hover tableFixHead mt-1' id='table-to-excel'>
                        <thead>
                            <tr className="table-bulevar">
                                <th>Magacin</th>
                                <th>Šifra</th>
                                <th>Naziv</th>
                                <th>Količina</th>
                                <th>Broj interne narudžbe</th>
                                <th>Broj SAG narudžbe</th>
                                <th>Datum</th>
                                <th>Status</th>
                                <th>Komentar</th> 
                            </tr>
                        </thead>
                        <tbody>
                        {data && data.map((item:any)=>(
                            <tr key={item.id} style={item.status==='Na stanju' || item.status==='Ne javlja se'? (styleSU):(item.status==='Obavešten'?(styleSZ):(item.status==='Završeno'? (styleG):(undefined))) }>
                                <td data-toggle="modal" data-target="#myModal">
                            {item.ime}
                        </td>
                        <td data-toggle="modal" data-target="#myModal">
                           <b> {item.sifra} </b>
                        </td>
                        <td data-toggle="modal" data-target="#myModal">
                            {item.naziv}
                        </td>
                        <td  data-toggle="modal" data-target="#myModal">
                            {item.kolicina}
                        </td>
                        <td data-toggle="modal" data-target="#myModal">
                            {item.brojInterneNarudzbe}
                        </td>
                        <td data-toggle="modal" data-target="#myModal">
                           {item.sag}
                        </td>
                        <td>
                            {showDate(item.datum)}
                        </td>
                        <td data-toggle="modal" data-target="#myModal">
                          {item.status}
                        </td>
                        <td data-toggle="modal" data-target="#myModal">
                            {item.komentar}
                        </td>
                    </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className='mb-4'>
                        <AllDataToExcel datum={datum}/>
                    </div>
                </div>):('Trenutno nema sačuvanih podataka.')
                }
            </div>
        </div>
    )
}

export default Bulevar