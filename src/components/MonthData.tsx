import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import AllDataToExcel from '../ExportExcelUtils/AllDataToExcel'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import { getM } from '../utils/SetDate'
import loadingImg from '../img/loading.gif'
import { dat } from '../Type_Interfaces/Interfaces'
import { BCstyle, Doc, HandleCLMD, obj, SnSh } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
let years:Array<number> = []
for(let i=2019; i<2040;i++){
    years.push(i+1)
}
let handleClick: HandleCLMD

const MonthData:React.FC = () => {
    const [ dataAll, setDataAll ] = useState<obj[]>([])
    const [ data, setData ] = useState<object[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ showBtn, setShwoBtn ] =useState<boolean>(false)
    const [ monCurr, setMonCurr ] = useState<string>('')
    const [ yearCurr, setYearCurr ] = useState<string>('')
    const styleSU:BCstyle = {
        backgroundColor:'lightpink'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightgreen'
    }
    const styleG:BCstyle = {
        backgroundColor:'#fbf579'
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
    handleClick = (monCurr:string,yearCurr:string) => {
        setLoading(true)
        const dateCurr:string =`${monCurr}-${yearCurr}`
        const newData:obj[] = dataAll.filter((item:obj)=>{
            if(item.datumItem.toString().toLowerCase().indexOf(dateCurr.toLowerCase())>-1){
                return item
            }
            else{
                return null
            }
       })
       const tempData = newData.sort((a:any,b:any):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
        setData(tempData)
        setShwoBtn(true)
        setLoading(false)
    } 
    if(!logg()) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
             <Helmet>
                <title>GServis-IVAN | Mesečni podaci</title>
            </Helmet>
            <div className='row mt-2'>
                Izaberi mesec i godinu za prikaz podataka
                <div className='col-sm-4 ml-2'>
                    <form className="form-inline" onSubmit={(e)=>{e.preventDefault(); handleClick(monCurr,yearCurr)}}>
                        <select className="form-control form-control-sm ml-1 mt-1" id='selectMon' onChange={(e)=>{setData([]);setShwoBtn(false); setMonCurr(String(e.currentTarget.value))}}>
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
                            <option id='val1' value={year} key={year}>{year}</option>
                                ))
                            }
                        </select>
                        <div className="clearfix">
                            <span className="float-right">
                                <button className='btn btn-info btn-sm ml-1 mt-1' disabled={monCurr===null || yearCurr===''?true:false}>Potvrdi</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <div className='col'></div>
            <div className='col-sm-12'>
                {data.length===0 &&  showBtn && <h4 className='mt-2'>Nema podataka za izabrani mesec</h4>}            
                {data.length>0 &&
                <div className='table-responsive mt-2'>
                    <div className="clearfix">
                        <span className="float-left">
                            <h4>Podaci za mesec {getM(Number(monCurr)-1)}</h4>
                        </span>
                        <span className="float-right">
                            {data.length>0 &&  <h5>Ukupan broj naloga {} <span className="badge badge-danger">{data.length}</span></h5>} 
                        </span>
                    </div>
                <table className='table table-bordered table-centered  table-hover' id='table-to-excel' >
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
                            <td  style={item.garancija==='U garanciji'? styleG:undefined}>
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
            </div>
            }
        </div>
        <div className='mb-4'>
                {showBtn && data.length>0 && localStorage.getItem('user')!=='wWrtOckr0gaLsrSNbIZqemJqRCh1' && <AllDataToExcel datum={`${monCurr}-${yearCurr}`} />}
        </div>
    </div>
    )
}

export default MonthData
