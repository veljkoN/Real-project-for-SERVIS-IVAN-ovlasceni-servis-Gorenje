import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import { showDate } from '../utils/SetDate'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import loadingImg from '../img/loading.gif'
import { BCstyle, DB, Doc, obj, SnSh } from '../Type_Interfaces/types'
import ModalCheck from './ModalCheck'
import { Helmet } from 'react-helmet'

const AllUploadingData:React.FC = () => {
    const [ data, setData ] = useState<obj[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const styleG:BCstyle = {
        backgroundColor:'lightpink'
    }  
    const styleGBorder:BCstyle = {
        backgroundColor:'red'
    }
    useEffect(()=>{
        setLoading(true)
        const db:DB = firebase.firestore()
        return db.collection('uplodedData').onSnapshot((snapshot:SnSh) =>{
            const newData:any = snapshot.docs.map((doc:Doc)=>({
                id:doc.id,
                ...doc.data(),
                poruceno:false,
                border:false
            }))
            const tempDataPr = newData.sort((a:any,b:any):any => (a.datum > b.datum ? 1 : ((b.datum > a.datum) ? -1 : 0)))
            const filteredData = tempDataPr.filter((item:any)=>{
                return item.status==="Poručeno"
            })
            setData(filteredData)
            setLoading(false)
            }
        )
    },[])
    const handleChange = (id:number) => {
        setData( data.map((item:any)=>{
            if(item.id===id){
                return{...item,poruceno:!item.poruceno}
            }
            else{
                return item
            }
        }))
    }
    const handleBorderChange = (id:string) =>{
        setData( data.map((item:any)=>{
            if(item.id===id){
                return{...item,border:!item.border}
            }
            else{
                return item
            }
        }))
    }
    if(!logg()) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Provera delova</title>
            </Helmet>
            <div className='row'>
                <div className='col-lg-1'></div>
                {data.length>0 ?       
                (<div className='table-responsive mt-2'>
                    <div className="clearfix">
                        <span className="float-left">
                            <h4>Svi podaci koji se trenutno nalaze u bazi</h4> 
                        </span>
                        <span className="float-right">
                            {data.length>0 &&  <h5>Ukupan broj naloga {} <span className="badge badge-danger">{data.length}</span></h5>} 
                        </span>
                    </div>
                    <table className='table table-bordered table-hover tableFixHead mt-1' id='table-to-excel'>
                        <thead>
                            <tr>
                                <th>Šifra</th>
                                <th>Naziv</th>
                                <th>Količina</th>
                                <th>Broj interne narudžbe</th>
                                <th>Broj SAG narudžbe</th>
                                <th>Datum</th>
                                <th>Izaberi nalog</th>
                                <th>Komentar</th> 
                            </tr>
                        </thead>
                        <tbody>
                        {data && data.map((item:any)=>(
                            <tr key={item.id} style={item.poruceno===true? (styleG):(item.border===true?(styleGBorder):(undefined))}>
                                <td>
                                <b> {item.sifra} </b>
                                </td>
                                <td  onClick={()=>handleBorderChange(item.id)} style={{cursor:'pointer'}}>
                                    {item.naziv}
                                </td>
                                <td>
                                    {item.kolicina}
                                </td>
                                <td>
                                    {item.brojInterneNarudzbe}
                                </td>
                                <td>
                                {item.sag}
                                </td>
                                <td>
                                    {showDate(item.datum)}
                                </td>
                                <td>
                                    <input type="checkbox" onChange={()=>handleChange(item.id)} />
                                </td>
                                <td>
                                    {item.komentar}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#myModal">
                        Učitaj selektovane podatke
                        </button>
                    <div className="container">
                        <ModalCheck data={data} />
                    </div>
                </div>):('Trenutno nema sačuvanih podataka.')
                }
            </div>
        </div>
    )
}

export default AllUploadingData


