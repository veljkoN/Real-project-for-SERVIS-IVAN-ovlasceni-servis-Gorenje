import React, { useState } from 'react'
import firebase from '../db/config'
import AllDataToExcel from '../ExportExcelUtils/AllDataToExcel'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import loadingImg from '../img/loading.gif'
import { BCstyle, Doc, handleCL, SnSh,obj } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
let handleClick:handleCL
  
const DailyData:React.FC = () => {
    const [ data, setData ] = useState<obj[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ showText, setShowText ] =useState<boolean>(false)
    const [ dateCurr, setDateCurr ] = useState<string>('')
    const styleSU:BCstyle = {
        backgroundColor:'lightpink'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightgreen'
    }
    const styleG:BCstyle = {
        backgroundColor:'#fbf579'
    }
    handleClick = (e:React.FormEvent<HTMLFormElement>,dateCurr:string) => {
       e.preventDefault()
       setDateCurr('') 
       setLoading(true)
       firebase.firestore().collection("delovi").where("datumItem", "==", dateCurr.trim())
    .get()
    .then(((snapshot:SnSh) =>{
        const newData:any = snapshot.docs.map((doc:Doc)=>({
            id:doc.id,
            ...doc.data()
        }))
        const tempData = newData.sort((a:any,b:any):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
        setData(tempData)
        setLoading(false)
    })
    )
    .catch(err =>console.log(err))
    setShowText(true)
    } 
    if(!logg()) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Dnevni podaci</title>
            </Helmet>
            <div className='row mt-2'>
                <div className='col-sm-4'> 
                    Unesi datum
                    <form className="form-inline"  onSubmit={(e)=>handleClick(e,dateCurr)}>
                        <input type='text' className="form-control form-control-sm ml-1" id='datum' onChange={(e)=>{setShowText(false); setData([]); setDateCurr(e.currentTarget.value)}}  placeholder='Forma datuma 02-02-2020'/>
                        <div className="clearfix">
                            <span className="float-right">
                                <button type='submit' className='btn btn-sm btn-info mt-1 mb-1 ml-1' disabled={ dateCurr? false:true} >Potvrdi</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            {data.length ===0 && showText && <h4>Nema podataka za izabrani datum</h4> }
            {data.length>0 &&  
            <div className='table-responsive mt-2'>
            <div className="clearfix">
                <span className="float-left">
                    <h4>Podaci za {data && data[0].datumItem}</h4>
                </span>
                <span className="float-right">
                    {data.length>0 && <h5>Ukupan broj naloga {} <span className="badge badge-danger">{data.length}</span></h5>} 
                </span>
            </div>
            <table className='table table-bordered  table-hover' id='table-to-excel'>
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
                        <td style={item.garancija==='U garanciji'? styleG:undefined }>
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
            {localStorage.getItem('user')!=='wWrtOckr0gaLsrSNbIZqemJqRCh1' && <AllDataToExcel  datum={dateCurr} />}
        </div>}                   
    </div>
    )
}

export default DailyData
