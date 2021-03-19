import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import doneImg from '../img/done.png'
import { PropsCD } from '../Type_Interfaces/Interfaces'
import { Msg, HandleCH, BCstyle } from '../Type_Interfaces/types'
const statusArray:Array<string> = ['Zadužen', 'Ugrađen','Ugrađen a treba da se vrati','Vraćen','Čeka deo']

let msg:Msg
let handleChange:HandleCH
const ModalBootstrap:React.FC<PropsCD> = ({changeData, dataPoint, setDataPoint,setChangeData,setFiltData}) => {
    const [ newValue, setNewValue ] = useState<string>('')
    const [ serviseriList, setServiseriLIst ] = useState<object[]>([])
    const [ infoError, setInfoError ] = useState<string>('')
    const [ infoMsg, setInfoMsg ] = useState<string>('')
    const styleSU:BCstyle = {
        backgroundColor:'lightpink'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightgreen'
    }
    const styleG:BCstyle = {
        backgroundColor:'#fbf579'
    }
    const styleModalR = {
        backgroundColor:'#ff414e',
        color:'white'
    }
    msg = (dataPoint:any,newValue:any) =>{
        return `Vrednost polja ${dataPoint} sada je ${newValue}`
    }
    handleChange = (e, id, dataPoint) => {
        e.preventDefault()
        setInfoMsg('')
        if(newValue.trim()==='' || Math.max(Math.floor(Math.log10(Math.abs(Number(newValue)))), 0) + 1===0){
            setInfoError('Polje mora biti popunjeno')
        }
        else{
        switch (dataPoint) {
            case 'sifra': 
                firebase.firestore().collection('delovi').doc(id).update({
                    sifra: newValue}).then(()=>{ 
                        setInfoError('')
                        setNewValue('')
                        setInfoMsg(`Vrednost polja ${dataPoint} sada je ${newValue}`)
                        setChangeData((prev:any)=>{
                            return {...prev,sifra:newValue}
                        })
                        setFiltData((prevState:any):any =>{
                            let newData:any= [...prevState].map((data:any)=>{
                                if(data.id===id){
                                    return {...data,sifra:newValue}
                                }
                                else{
                                    return data
                                }
                            })
                            return newData
                        })
                    })
                setDataPoint('')
                break
            case 'serviser':
                if(newValue===''){
                    setInfoError('Izaberite servisera')
                } 
                else{
                    firebase.firestore().collection('delovi').doc(id).update({
                    serviser:newValue}).then(()=>{ 
                        setInfoMsg(msg(dataPoint,newValue))
                        setChangeData((prev:any)=>{
                            return {...prev,serviser:newValue}
                        })
                        setFiltData((prevState:any):any =>{
                            let newData:any= [...prevState].map((data:any)=>{
                                if(data.id===id){
                                    return {...data,serviser:newValue}
                                }
                                else{
                                    return data
                                }
                            })
                            return newData
                        })
                        setInfoError('')
                        setDataPoint('')
                        setNewValue('')
                    })
                }
                break;
            case 'naziv': 
                firebase.firestore().collection('delovi').doc(id).update({
                naziv:newValue}).then(()=>{
                setInfoMsg(msg(dataPoint,newValue))
                setChangeData((prev:any)=>{
                    return {...prev,naziv:newValue}
                })
                setFiltData((prevState:any):any =>{
                    let newData:any= [...prevState].map((data:any)=>{
                        if(data.id===id){
                            return {...data,naziv:newValue}
                        }
                        else{
                            return data
                        }
                    })
                    return newData
                })
                setInfoError('')
                setDataPoint('')
                setNewValue('')
                })
                break;
            case 'nalog': 
                firebase.firestore().collection('delovi').doc(id).update({
                nalog:Number(newValue)}).then((data:any)=>{
                    setInfoMsg(msg(dataPoint,newValue))
                    setChangeData((prev:any)=>{
                        return {...prev,nalog:newValue}
                    })
                    setFiltData((prevState:any):any =>{
                        let newData:any= [...prevState].map((data:any)=>{
                            if(data.id===id){
                                return {...data,nalog:newValue}
                            }
                            else{
                                return data
                            }
                        })
                        return newData
                    })
                    setInfoError('')
                    setDataPoint('')
                    setNewValue('')
                })
                break;
            case 'kolicina': 
                firebase.firestore().collection('delovi').doc(id).update({
                kolicina:Number(newValue)}).then(()=>{
                setInfoMsg(msg(dataPoint,newValue))
                setChangeData((prev:any)=>{
                    return {...prev,kolicina:newValue}
                })
                setFiltData((prevState:any):any =>{
                    let newData:any= [...prevState].map((data:any)=>{
                        if(data.id===id){
                            return {...data,kolicina:newValue}
                        }
                        else{
                            return data
                        }
                    })
                    return newData
                })
                setInfoError('')
                setDataPoint('')
                setNewValue('')
                })
                break;
            case 'status':
                firebase.firestore().collection('delovi').doc(id).update({
                    status:newValue
                    }).then(()=>{
                        setInfoMsg(msg(dataPoint,newValue))
                        setChangeData((prev:any)=>{
                            return {...prev,status:newValue}
                        })
                        setFiltData((prevState:any):any =>{
                            let newData:any= [...prevState].map((data:any)=>{
                                if(data.id===id){
                                    return {...data,status:newValue}
                                }
                                else{
                                    return data
                                }
                            })
                            return newData
                        })
                        setInfoError('')
                    setDataPoint('')
                    setNewValue('')
                    })
                break;
            case 'garancija':
                firebase.firestore().collection('delovi').doc(id).update({
                    garancija:newValue}).then(()=>{ 
                        setInfoMsg(msg(dataPoint,newValue))
                        setChangeData((prev:any)=>{
                            return {...prev,garancija:newValue}
                        })
                        setFiltData((prevState:any):any =>{
                            let newData:any= [...prevState].map((data:any)=>{
                                if(data.id===id){
                                    return {...data,garancija:newValue}
                                }
                                else{
                                    return data
                                }
                            })
                            return newData
                        })
                        setInfoError('')
                        setDataPoint('')
                        setNewValue('')
                    })
                break;
            case 'komentar':
                firebase.firestore().collection('delovi').doc(id).update({
                komentar:newValue}).then(()=>{ 
                    setInfoMsg(msg(dataPoint,newValue))
                    setChangeData((prev:any)=>{
                        return {...prev,komentar:newValue}
                    })
                    setFiltData((prevState:any):any =>{
                        let newData:any= [...prevState].map((data:any)=>{
                            if(data.id===id){
                                return {...data,komentar:newValue}
                            }
                            else{
                                return data
                            }
                        })
                        return newData
                    })
                    setInfoError('')
                    setDataPoint('')
                    setNewValue('')
                })
                break;
            default:
                break
        }
        setInfoMsg('')
        }
    }
    useEffect(()=>{
        const abortController = new AbortController()
        if(dataPoint==='serviser'){
        firebase.firestore().collection('serviseriLista').get().then(((snapshot) =>{
            const newData :any = snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }))
            setServiseriLIst(newData)
        })
        ).catch(err=>console.log(err))
        return () => {
            abortController.abort()
        }
    }},[dataPoint])
    return (
        <div className='container-fluid'>
            <div className="modal fade" id="myModal">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Promena podatka</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={()=>{
                                 setInfoMsg('')
                                 setInfoError('')
                                 setDataPoint('')
                                 setNewValue('')
                            }}>&times;</button>
                        </div>
                        <div className="modal-body">
                            {changeData.id? (<div className='table-responsive'>
                            Stavka koja se menja: <b>{dataPoint}</b>
                            <table className='table table-bordered table-centered table-hover'>
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
                                        {localStorage.getItem('user')==='WiVVMq2MUwWw18ZvnNNvSYl7vOG3'? 
                                        <th>Korisnik</th>:null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {<tr key={changeData.id} style={changeData.status==='Ugrađen a treba da se vrati'? (styleSU):(changeData.status==='Ugrađen' || changeData.status==='Vraćen'? (styleSZ):(undefined)) }>
                                        <td style={dataPoint==='serviser'? styleModalR:{}}>
                                            {changeData.serviser}
                                        </td>
                                        <td>
                                            {changeData.datumItem}
                                        </td>
                                        <td style={dataPoint==='sifra'? styleModalR:{}}>
                                            <b>{changeData.sifra}</b>
                                        </td>
                                        <td style={dataPoint==='naziv'? styleModalR:{}}>
                                            {changeData.naziv}
                                        </td>
                                        <td style={dataPoint==='kolicina'? styleModalR:{}}>
                                            <b>{changeData.kolicina}</b>
                                        </td>
                                        <td style={dataPoint==='nalog'? styleModalR:{}}>
                                            {changeData.nalog===11111 ? ('Privatno'):(changeData.nalog)}
                                        </td>
                                        <td style={dataPoint==='garancija' && changeData.garancija==='U garanciji' ? ({ backgroundColor:'#fbf579',color:'red'}):(changeData.garancija==='U garanciji'? styleG:undefined )}>
                                            {changeData.garancija}  
                                        </td>
                                        <td style={dataPoint==='status'? styleModalR:{}}>
                                            {changeData.nalog===11111 ? ('Privatno'):(changeData.status)}
                                        </td>
                                        <td style={dataPoint==='komentar'? styleModalR:{}}>
                                            {changeData.komentar}
                                        </td>
                                        {localStorage.getItem('user')==='WiVVMq2MUwWw18ZvnNNvSYl7vOG3'?
                                        (<td>
                                            {changeData.korisnik}
                                        </td>):null
                                        }
                                    </tr>
                                    }
                                </tbody>
                            </table>
                            {dataPoint===''? (<div></div>):(
                            <form  onSubmit={(e)=>handleChange(e,changeData.id,dataPoint)}>
                                <div className='row'>
                                    <div className='col-sm-4 offset-4'>
                                        {(dataPoint==='sifra' || dataPoint==='naziv' || dataPoint==='nalog' || dataPoint==='kolicina' )?(
                                        <>
                                            <p>Unesite novu vrednost polja</p>
                                            <input className='form-control' type={( dataPoint==='nalog'||dataPoint==='kolicina')?'number':'text'} onChange={(e)=>setNewValue(e.currentTarget.value)}/>
                                        </>):(dataPoint==='garancija'?(
                                            changeData.garancija==='U garanciji'?(<div><input className='form-check-input' type="radio" id="garancija" name="garancija" value="Van garancije" onChange={(e) => setNewValue(e.currentTarget.value) } /> <label>Van garancije</label></div>):( <div><input type="radio" id="garancija" name="garancija" value="U garanciji" onChange={(e) => setNewValue(e.currentTarget.value) } /> <label>U garanciji</label></div> )
                                            ):(dataPoint==='status'?(
                                            <select className='form-control' onChange={(e) => {
                                                setNewValue(e.currentTarget.value)
                                                }}>
                                                <option>-</option>
                                                {statusArray && statusArray.map((data:any)=>{
                                                if(changeData.status=== data){
                                                    return null
                                                }
                                                else{
                                                return <option value={data} key={data}>{data}</option>
                                                }
                                                })
                                             }
                                            </select>):((dataPoint==='komentar'?(
                                            <textarea className='form-control'  onChange={(e)=>setNewValue(e.currentTarget.value)}></textarea>
                                            ):(dataPoint==='serviser'?(
                                            <select className='form-control' onChange={(e) => setNewValue(e.currentTarget.value)}>
                                                <option value=''>-</option>
                                                {serviseriList && serviseriList.map((data:any)=> {
                                                    if(changeData.serviser=== data.serviser){
                                                        return null
                                                    }
                                                    else{
                                                        return <option key={data.id} value={data.serviser}>{data.serviser}</option>
                                                    }
                                                    })
                                                }
                                            </select>):(null))
                                            )
                                        )
                                    )
                                )
                            }
                            <div className="clearfix">
                                <span className="float-right">
                                    <button type='submit' className="btn btn-danger mt-2">Promeni</button>
                                </span>
                            </div>
                            </div>
                            <div className='col-sm-3'>
                                <p className='text-danger'>{infoError}</p>
                            </div>
                        </div>
                    </form>
                        )
                    }
                    {infoMsg && <><span>{infoMsg} </span><img className='image-done' src={doneImg} alt='doneImg'/></>}
                </div>):(
                <div></div>)
                }
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={()=>{
                setInfoMsg('')
                setInfoError('')
                setDataPoint('')
                setNewValue('')
                }} data-dismiss="modal">Zatvori</button>
          </div>
        </div>
       </div>
      </div>
    </div>
    )
}
export default ModalBootstrap
