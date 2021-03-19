import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import firebase from '../db/config'
import loadingImg from '../img/loading.gif'
import { BCstyle, Doc, obj, SnSh, DocGT, DocGTItem } from '../Type_Interfaces/types'
import { showDate } from '../utils/SetDate'
import { Helmet } from 'react-helmet'
require('firebase/auth')
let years:Array<number> = []
for(let i=2019; i<2040;i++){
    years.push(i+1)
}
let handleClick:()=>void

const DeleteUplodingData:React.FC = () => {
    const [ dataAll, setDataAll ] = useState<obj[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ data, setData ] = useState<object[]>([])
    const [ showBtn, setShwoBtn ] =useState<boolean>(false)
    const [ msgInfo, setMsgInfo] = useState<string>('')
    const styleSU:BCstyle = {
        backgroundColor:'lightgreen'
    }
    useEffect(()=>{
        setLoading(true)
        const db = firebase.firestore()
        return db.collection('uplodedData').onSnapshot((snapshot:SnSh) =>{
            const newData:any = snapshot.docs.map((doc:Doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setDataAll(newData)
            setLoading(false)
            }
        )
    },[])
    handleClick = () => {
        const newData:obj[] = dataAll.filter((item:any)=>{
            if(item.status==='Prodato'){
                return item
            }
            else{
                return null
            }
        })
        const tempDataPr = newData.sort((a:any,b:any):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
        const tempData = tempDataPr.sort((a:any,b:any):any => (a.ime > b.ime) ? 1 : ((b.ime > a.ime) ? -1 : 0))
        setData(tempData)
        setShwoBtn(true)
    } 
    const deleteData = () => {
        firebase.firestore().collection('uplodedData').where('status','==','Prodato').get().then((doc:DocGT) => {
            (doc.forEach((item:DocGTItem)=>{
                item.ref.delete()
                }))
                setMsgInfo(`Svi završeni nalozi su obrisani`)
                setData([])
            })
    }
    if(!logg()) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Brisanje uvezenih podataka</title>
            </Helmet>
            <div className='row mt-3'>
                <div className='col-sm-4'></div>
                <div className='col-sm-4'>
                <h5>Brisanje uvezenih podataka</h5>
                    <p>Prikaži sve naloge koji su završeni</p>
                    <button className='btn btn-info' onClick={()=>handleClick()}>Prikaži</button>
                </div>
                <div className='col-sm-4'>
                    {data.length===0 &&  showBtn && <h4>Nema završenih naloga</h4>}
                    <p className='text-danger'>{msgInfo}</p>
                </div>
                <div className='col-sm-2'></div>
                {
                data.length>0 &&
                <div className='table-responsive'>
                    <h4 className='mt-1'>Ukupan broj završenih naloga {} <span className="badge badge-danger">{data.length}</span>{} </h4>
                    <table className='table table-bordered table-centered table-hover' id='table-to-excel' >
                        <thead>
                            <tr>
                                <th>Ime I prezime</th>
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
                            <tr key={item.id} style={item.status==='Prodato' ? (styleSU):(undefined) }>
                                <td data-toggle="modal" data-target="#myModal">{item.ime}</td>
                                <td data-toggle="modal" data-target="#myModal">
                                    <b>{item.sifra}</b>
                                </td>
                                <td data-toggle="modal" data-target="#myModal">
                                    {item.naziv}
                                </td>
                                <td data-toggle="modal" data-target="#myModal">
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
                        {showBtn && data.length>0 && <button className='btn btn-danger' onClick={()=>{ if (window.confirm(`Da li ste sigruni da želite da obrišete sve urađene naloge?`)) deleteData()}}>Obriši podatke</button>}
                    </div>
                </div>
                }   
        </div>
    </div>
    )
}

export default DeleteUplodingData
