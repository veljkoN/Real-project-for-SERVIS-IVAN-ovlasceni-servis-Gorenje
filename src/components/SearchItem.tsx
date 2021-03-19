import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import ModalBootstrap from './ModalBootstrap'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import loadingImg from '../img/loading.gif'
import { objSV } from '../Type_Interfaces/Interfaces'
import { handleSC, BCstyle, SnSh, Doc, DB, handleS } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
let handleSelectChange:handleSC
let handleSubmit:handleS

const SearchItem:React.FC = () => {
    const [dataDB, setDataDB] = useState<objSV[]>([])
    const [selectValue, setSelectValue] = useState<string>('')
    const [filtData, setFiltData] = useState<objSV[]>([])
    const [changeData, setChangeData] = useState<any>({})
    const [dataPoint, setDataPoint] = useState<string>('')
    const [serviseri, setServiseri] = useState<object[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>('')
    let counter=0
    const styleSU:BCstyle = {
        backgroundColor:'lightpink'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightgreen'
    }
    const styleG:BCstyle = {
        backgroundColor:'#fbf579'
    }
    handleSelectChange = e => {
        setFiltData([])
        setSelectValue(e.currentTarget.value)
        setLoading(true)
        const db:DB = firebase.firestore()
        return db.collection('delovi').onSnapshot((snapshot:SnSh) => {
            const newData: any = snapshot.docs.map((doc:Doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setDataDB(newData)
            setLoading(false)
            }
        )
    }
    useEffect(() => {
        const abortController = new AbortController()
        if (selectValue === 'serviser') {
           setLoading(true)
           const db =  firebase.firestore().collection('serviseriLista')
           db.onSnapshot((snapshot:SnSh) => {
                const newData:any = snapshot.docs.map((doc:Doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setServiseri(newData)
                setLoading(false)
                }
            )
            return () => {
                abortController.abort()
            }  
        }
        else{
            return () => {
                abortController.abort()
            } 
        }
        
    }, [selectValue])
    handleSubmit = e => {
        e.preventDefault()
        const searchInput = document.querySelector('#searchInput') as HTMLInputElement
        setLoading(true)
        if (searchInput.value === '' || searchInput.value === '-') {
            setLoading(false)
            setErrorMsg(`Polje ${selectValue} mora biti popunjeno`)
        }
        else {
            let newDataFil:objSV[] = dataDB.filter((data:any) => {
               setLoading(false)
                if (String(data[selectValue]).toLocaleLowerCase() === searchInput.value.toString().toLocaleLowerCase()) {
                    return data
                }
                return null
            })
            const tempData = newDataFil.sort((a:any,b:any):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
            setFiltData(tempData)
            setSelectValue('')
            searchInput.value = ''
            setErrorMsg('')
        }
    }
    if(!logg())  return <Redirect to='/prijava'/>
    else if(localStorage.getItem('user')==='wWrtOckr0gaLsrSNbIZqemJqRCh1') return <Redirect to='/sviPodaci'/>
    if (loading) {
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)    }
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Promena podataka</title>
            </Helmet>
            <div className='row mt-4'>
                <div className='col-sm-4'></div>
                <div className='col-sm-4 borderColor mb-3 shadow-sm'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        Izaberite kriterijum pretrage
                    <select className="form-control form-control-sm mb-1" onChange={(e) => handleSelectChange(e)} value={selectValue}>
                        <option value=''>-</option>
                        <option value='serviser'>Serviser</option>
                        <option value='sifra'>Šifra</option>
                        <option value='naziv'>Naziv</option>
                        <option value='kolicina'>Količina</option>
                        <option value='nalog'>Nalog</option>
                        <option value='garancija'>Garancija</option>
                        <option value='status'>Status</option>
                    </select>
                        {selectValue === 'serviser' ? (
                                <select id='searchInput' className="form-control form-control-sm">
                                    <option>-</option>
                                    {
                                        serviseri && serviseri.map((data:any) => {
                                            return <option value={data.serviser} key={data.id} >{data.serviser}</option>
                                        })
                                    }
                                </select>
                            ) : (selectValue === 'garancija' ? (
                                <select id='searchInput' className="form-control form-control-sm">
                                    <option>-</option>
                                    <option value='U garanciji'>U garanciji</option>
                                    <option value='Van garancije'>Van garancije</option>
                                </select>
                            ) : (selectValue === 'status' ? (
                                <select id='searchInput' className="form-control form-control-sm">
                                    <option>-</option>
                                    <option value='Zadužen'>Zadužen</option>
                                    <option value='Ugrađen'>Ugrađen</option>
                                    <option value='Ugrađen a treba da se vrati'>Ugrađen a treba da se vrati</option>
                                    <option value='Vraćen'>Vraćen</option>
                                    <option value='Čeka deo'>Čeka deo</option>
                                </select>
                            ) : (<input type={selectValue === 'naziv' || selectValue=== 'sifra' ? ('text') : ('number')} className="form-control form-control-sm" id='searchInput' placeholder='Unesite vrednost polja' disabled={selectValue ? false : true} />)))
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
                    <thead>
                        <tr>
                            <th>-</th>
                            <th>Serviser</th>
                            <th>Datum</th>
                            <th>Sifra</th>
                            <th>Naziv</th>
                            <th>Kolicina</th>
                            <th>Nalog</th>
                            <th>Garancija</th>
                            <th>Status</th>
                            <th>Komentar</th>
                            {localStorage.getItem('user')==='eHNW8XsT1BQB23S8okc4JFXk2O43'? 
                            <th>Korisnik</th>:null}
                        </tr>
                    </thead>
                    <tbody>
                    {filtData && filtData.map((item: any) =>{
                        counter++
                        return(
                        <tr key={item.id} style={item.status==='Ugrađen a treba da se vrati'? (styleSU):(item.status==='Ugrađen' || item.status==='Vraćen'? (styleSZ):(undefined)) }>
                            <td>{counter}.</td>
                            <td className='textInTable' data-toggle="modal" data-target="#myModal"  onClick={() => {
                                setChangeData(item)
                                setDataPoint('serviser')
                                }}>
                                {item.serviser}
                            </td>
                            <td>
                                {item.datumItem}
                            </td>
                            <td data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('sifra')
                                }}>
                                <b>{item.sifra}</b>
                            </td>
                            <td data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('naziv')
                                }}>
                                {item.naziv}
                            </td>
                            <td data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('kolicina')
                                }}>
                                <b>{item.kolicina}</b>
                            </td>
                            <td data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('nalog')
                                }}>
                                {item.nalog===11111 ? ('Privatno'):(item.nalog)}
                            </td>
                            <td  data-toggle="modal" data-target="#myModal" onClick={() => {
                                setChangeData(item)  
                                setDataPoint('garancija')
                                }} style={item.garancija==='U garanciji'? styleG:undefined }>
                                <span className='textInTable'>{item.garancija}</span>
                            </td>
                            <td data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('status')
                                }}>
                                {item.nalog===11111 ? ('Privatno'):(item.status)}
                            </td>
                            <td data-toggle="modal" data-target="#myModal" className='textInTable' onClick={() => {
                                setChangeData(item)
                                setDataPoint('komentar')
                                }}>
                                {item.komentar}
                            </td>
                            {localStorage.getItem('user')==='eHNW8XsT1BQB23S8okc4JFXk2O43'?
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
                <ModalBootstrap changeData={changeData} dataPoint={dataPoint} setDataPoint={setDataPoint} setChangeData={setChangeData} setFiltData={setFiltData} />
            </div>
        </div>  
    </div>
    )
}

export default SearchItem
