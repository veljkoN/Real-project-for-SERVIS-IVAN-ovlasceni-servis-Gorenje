import React, { useEffect, useState } from 'react'
import firebase from '../db/config'
import { objSV } from '../Type_Interfaces/Interfaces'
import { handleSC, BCstyle, SnSh, Doc, DB, handleS } from '../Type_Interfaces/types'
import ModalUpdateData from './ModalUpdateData'
import { showDate } from '../utils/SetDate'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import loadingImg from '../img/loading.gif'
import { Helmet } from 'react-helmet'
let handleSelectChange:handleSC
let handleSubmit:handleS 

const ChangeUpdateData:React.FC = () => {
    const [dataDB, setDataDB] = useState<any[]>([])
    const [selectValue, setSelectValue] = useState<string>('')
    const [filtData, setFiltData] = useState<any[]>([])
    const [changeData, setChangeData] = useState<any>({})
    const [dataPoint, setDataPoint] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [dates, setDates ] = useState<number[]>([])
    const [numIntN, setNumIntN] = useState<number[]>([])
    const [errorMsg, setErrorMsg] = useState<string>('')
    let datesAll:string[] = []
    let numIntNAll:number[] = []
    const styleSU:BCstyle = {
        backgroundColor:'lightgray'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightblue'
    }
    
    const styleG:BCstyle = {
        backgroundColor:'lightgreen'
    }   
    useEffect(() => {
        const abortController = new AbortController()
        if (selectValue === 'datum') {
            setLoading(true)
            let newRData:any[] = []
            dataDB.forEach((item:any)=>{
                newRData.push(item.datum)
            })
            setDates(newRData.sort((a:any,b:any):any => (a > b ? 1 : ((b > a) ? -1 : 0))))
            setLoading(false)
        }
        abortController.abort()
    }, [selectValue,dataDB])
    dates.forEach((date:any)=>{
        if(!datesAll.includes(date)){
            datesAll.push(date)
        }
    })
    useEffect(() => {
        const abortController = new AbortController()
        if (selectValue === 'brojInterneNarudzbe') {
            setLoading(true)
            let newNumInData:any[] = []
            dataDB.forEach((item:any)=>{
                newNumInData.push(item.brojInterneNarudzbe)
            })
            setNumIntN(newNumInData)
            setLoading(false)
        }
        abortController.abort()
    }, [selectValue, dataDB])
    numIntN.forEach((date:any)=>{
        if(!numIntNAll.includes(date)){
            numIntNAll.push(date)
        }
    })
    //set db
    useEffect(()=>{
        setLoading(true)
        const db:DB = firebase.firestore()
        return db.collection('uplodedData').onSnapshot((snapshot:SnSh) => {
            const newData: any = snapshot.docs.map((doc:Doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setDataDB(newData)
            setLoading(false)
            }
        )
    },[])
    handleSelectChange = e => {
        setFiltData([])
        setSelectValue(e.currentTarget.value)  
    }
    handleSubmit = e => {
        e.preventDefault()
        const searchInput = document.querySelector('#searchInput') as HTMLInputElement
        if (searchInput.value === '' || searchInput.value === '-') {
            setLoading(false)
            setErrorMsg(`Polje ${selectValue} mora biti popunjeno`)
        }
        else {
            setLoading(true)
            let newDataFil:objSV[] = dataDB.filter((data:any) => {
               
                if (String(data[selectValue]).toLocaleLowerCase().includes(searchInput.value.trim().toString().toLocaleLowerCase()))   {
                    return data
                }
                return null
            })
            const tempDataPr = newDataFil.sort((a:any,b:any):any => (a.datum > b.datum ? 1 : ((b.datum > a.datum) ? -1 : 0)))
            const tempData = tempDataPr.sort((a:any,b:any):any => (a.ime > b.ime) ? 1 : ((b.ime > a.ime) ? -1 : 0))
            setFiltData(tempData)
            setSelectValue('')
            searchInput.value = ''
            setErrorMsg('')
            setLoading(false)
        }
    }
    if(!logg()) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Promena uvezenih podataka</title>
            </Helmet>
        <div className='row mt-4'>
            <div className='col-sm-4'></div>
            <div className='col-sm-4 borderColor mb-3 shadow-sm' >
                <form onSubmit={(e) => handleSubmit(e)}>
                    Izaberite kriterijum pretrage
                <select className="form-control form-control-sm mb-1" onChange={(e) => handleSelectChange(e)} value={selectValue}>
                    <option value=''>-</option>
                    <option value='ime'>Ime i prezime</option>
                    <option value='sifra'>Šifra</option>
                    <option value='datum'>Datum</option>
                    <option value='brojInterneNarudzbe'>Broj interne narudžbe</option>
                    <option value='status'>Status</option>
                </select>
                    { selectValue==='brojInterneNarudzbe'?(<select id='searchInput' className="form-control form-control-sm">
                    <option>-</option>
                    {numIntNAll && numIntNAll.map((data:any) => {
                        return <option value={data} key={data}>{data}</option>
                        })
                    }
                </select>):(selectValue==='datum'? (
                    <select id='searchInput' className="form-control form-control-sm select-date-sort">
                    <option></option>
                    {
                        datesAll && datesAll.map((data:any) => {
                            return <option value={data} key={data} >{showDate(data)}</option>
                        })
                    }
                </select>):( (selectValue === 'status' ? (
                            <select id='searchInput' className="form-control form-control-sm">
                                <option>-</option>
                                <option value='Poručeno'>Poručeno</option>
                                <option value='Na stanju'>Na stanju</option>
                                <option value='Obavešten'>Obavešten</option>
                                <option value='Ne javlja se'>Ne javlja se</option>
                                <option value='Prodato'>Prodato</option>
                            </select>
                        ) : (<input type={selectValue === 'datum' || selectValue === 'ime' || selectValue === 'sifra'   ? ('text') : ('number')} className="form-control form-control-sm" id='searchInput' placeholder='Unesite vrednost polja' disabled={selectValue ? false : true} />))))
                    }
                    <div className="clearfix">
                        <span className="float-right">
                        <button type='submit' className="btn btn-outline-info mt-1 mb-1" disabled={selectValue && filtData ? false : true}>Pretraži</button>
                        </span>
                    </div>
                </form>
            </div>
            <div className='col-sm-4'>
                <p>{errorMsg}</p>
            </div>
            <div className='table-responsive'>
                {filtData.length>0 &&
                <table className='table table-bordered table-centered  table-hover' id='tableSearch' >
                    <thead className='table-header'>
                        <tr >
                            <th>Ime I prezime</th>
                            <th>Šifra</th>
                            <th>Naziv</th>
                            <th>Količina</th>
                            <th>Broj interne narudžbe</th>
                            <th>Broj SAG narudžbe</th>
                            <th>Datum</th>
                            <th>Status</th>
                            <th>Komentar</th>
                            {localStorage.getItem('user')==='RLFO2ObiJuh5YJRf6UQHqgfRuYf1'? 
                            <th>Korisnik</th>:null}
                        </tr>
                    </thead>
                    <tbody>
                    {filtData && filtData.map((item: any) =>{
                        return(
                        <tr key={item.id} style={item.status==='Na stanju' || item.status==='Ne javlja se'? (styleSU):(item.status==='Obavešten'?(styleSZ):(item.status==='Prodato'? (styleG):(undefined)))}>
                            <td className='textInTable' data-toggle="modal" data-target="#myModal"  onClick={() => {
                                setChangeData(item)
                                setDataPoint('ime')
                                }}>
                                {item.ime}
                            </td>
                            <td className='textInTable' data-toggle="modal" data-target="#myModal"  onClick={() => {
                                setChangeData(item)
                                setDataPoint('sifra')
                                }}>
                                {item.sifra}
                            </td>
                            <td>
                                {item.naziv}
                            </td>
                            <td  data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('kolicina')
                                }}>
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
                            <td data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('status')
                                }}>
                            {item.status}
                            </td>
                            <td data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('komentar')
                                }}>
                                {item.komentar}
                            </td>
                            {localStorage.getItem('user')==='RLFO2ObiJuh5YJRf6UQHqgfRuYf1'?
                            (<td>
                                {item.korisnik}
                            </td>):null
                            }
                        </tr>)
                        })}
                    </tbody>
                </table>}   
            </div>
            <div className='col-sm-10'>
                <ModalUpdateData changeData={changeData} dataPoint={dataPoint} setDataPoint={setDataPoint} setChangeData={setChangeData} setFiltData={setFiltData}/>
            </div>
        </div>  
    </div>
    )
}

export default ChangeUpdateData
