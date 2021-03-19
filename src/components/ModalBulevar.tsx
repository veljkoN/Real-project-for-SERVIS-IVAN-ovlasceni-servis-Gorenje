import React, { useState } from 'react'
import firebase from '../db/config'
import doneImg from '../img/done.png'
import { PropsCD } from '../Type_Interfaces/Interfaces'
import { Msg, HandleCH, BCstyle } from '../Type_Interfaces/types'
import { showDate } from '../utils/SetDate'
const statusArray:Array<string> = ['Završeno','Poručeno']
let msg:Msg
let handleChange:HandleCH

const ModalBulevar:React.FC<PropsCD> = ({changeData, dataPoint, setDataPoint,setChangeData,setFiltData}) => {
    const [ newValue, setNewValue ] = useState<string>('')
    const [ infoError, setInfoError ] = useState<string>('')
    const [ infoMsg, setInfoMsg ] = useState<string>('')
    const styleSU:BCstyle = {
        backgroundColor:'lightgray'
    }
    const styleSZ:BCstyle = {
        backgroundColor:'lightblue'
    }
    const styleG:BCstyle = {
        backgroundColor:'lightgreen'
    }
    const styleModalR = {
        backgroundColor:'#ff414e',
        color:'white'
    }
    msg = (dataPoint:any,newValue:any) =>{
        return `Vrednost polja ${dataPoint.toUpperCase()} sada je ${newValue.toUpperCase()}`
    }
    handleChange = ( e, id ) => {
        e.preventDefault()
        setInfoMsg('')
        if(newValue.trim()==='' || Math.max(Math.floor(Math.log10(Math.abs(Number(newValue)))), 0) + 1===0){
            setInfoError('Polje mora biti popunjeno')
        }
        else{
        switch (dataPoint) {
            case 'ime': 
                firebase.firestore().collection('bulevar').doc(id).update({
                    ime: newValue}).then(()=>{ 
                        setInfoError('')
                        setNewValue('')
                        setInfoMsg(`Vrednost polja ${dataPoint} sada je ${newValue}`)
                        setChangeData((prev:any)=>{
                            return {...prev,ime:newValue}
                        })
                        setFiltData((prevState:any):any =>{
                            let newData:any= [...prevState].map((data:any)=>{
                                if(data.id===id){
                                    return {...data,ime:newValue}
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
            case 'sifra':
                if(newValue===''){
                    setInfoError('Izaberite servisera')
                } 
                else{
                    firebase.firestore().collection('bulevar').doc(id).update({
                    sifra:newValue}).then(()=>{ 
                        setInfoMsg(msg(dataPoint,newValue))
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
                        setInfoError('')
                        setDataPoint('')
                        setNewValue('')
                    })
                }
                break;
            case 'naziv': 
                firebase.firestore().collection('bulevar').doc(id).update({
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
            case 'kolicina': 
                firebase.firestore().collection('bulevar').doc(id).update({
                kolicina:Number(newValue)}).then((data:any)=>{
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
            case 'brojInterneNarudzbe': 
                firebase.firestore().collection('bulevar').doc(id).update({
                brojInterneNarudzbe:Number(newValue)}).then(()=>{
                setInfoMsg(msg(dataPoint,newValue))
                setChangeData((prev:any)=>{
                    return {...prev,brojInterneNarudzbe:newValue}
                })
                setFiltData((prevState:any):any =>{
                    let newData:any= [...prevState].map((data:any)=>{
                        if(data.id===id){
                            return {...data,brojInterneNarudzbe:newValue}
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
            case 'sag':
                firebase.firestore().collection('bulevar').doc(id).update({ 
                    sag:newValue }).then(()=>{
                    setInfoMsg(msg(dataPoint,newValue))
                    setChangeData((prev:any)=>{
                        return {...prev,sag:newValue}
                    })
                    setFiltData((prevState:any):any =>{
                        let newData:any= [...prevState].map((data:any)=>{
                            if(data.id===id){
                                return {...data,sag:newValue}
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
            case 'datum':
                firebase.firestore().collection('bulevar').doc(id).update({
                    datum:newValue}).then(()=>{ 
                        setInfoMsg(msg(dataPoint,newValue))
                        setChangeData((prev:any)=>{
                            return {...prev,datum:newValue}
                        })
                        setFiltData((prevState:any):any =>{
                            let newData:any= [...prevState].map((data:any)=>{
                                if(data.id===id){
                                    return {...data,datum:newValue}
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
                firebase.firestore().collection('bulevar').doc(id).update({
                    status:newValue}).then(()=>{ 
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
                case 'komentar':
                    firebase.firestore().collection('bulevar').doc(id).update({
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
                            <table className='table table-bordered table-centered'>
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
                                        {localStorage.getItem('user')==='WiVVMq2MUwWw18ZvnNNvSYl7vOG3'? 
                                        <th>Korisnik</th>:null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {<tr key={changeData.id} style={changeData.status==='Na stanju' || changeData.status==='Ne javlja se'? (styleSU):(changeData.status==='Obavešten'?(styleSZ):(changeData.status==='Završeno'? (styleG):(undefined)))  }>
                                        <td style={dataPoint==='ime'? styleModalR:{}}>
                                            {changeData.ime}
                                        </td >
                                        <td style={dataPoint==='sifra'? styleModalR:{}}>
                                            {changeData.sifra}
                                        </td>
                                        <td style={dataPoint==='naziv'? styleModalR:{}}>
                                            <b>{changeData.naziv}</b>
                                        </td>
                                        <td style={dataPoint==='kolicina'? styleModalR:{}}>
                                            <b>{changeData.kolicina}</b>
                                        </td>
                                        <td style={dataPoint==='brojInterneNarudzbe'? styleModalR:{}}>
                                            {changeData.brojInterneNarudzbe}
                                        </td>
                                        <td style={dataPoint==='sag'? styleModalR:{}}>
                                            {changeData.sag}  
                                        </td>
                                        <td style={dataPoint==='datum'? styleModalR:{}}>
                                            {showDate(changeData.datum)}
                                        </td>
                                        <td style={dataPoint==='status'? styleModalR:{}}>
                                            {changeData.status}
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
                                        {(dataPoint==='ime' || dataPoint==='sifra' || dataPoint==='naziv' || dataPoint==='kolicina' || dataPoint==='brojInterneNarudzbe' || dataPoint==='sag')?(
                                        <>
                                            <p>Unesite novu vrednost polja</p>
                                            <input className='form-control' type={(dataPoint==='kolicina'|| dataPoint==='brojInterneNarudzbe'||dataPoint==='sag')?'number':'text'} onChange={(e)=>setNewValue(e.currentTarget.value)}/>
                                        </>):(dataPoint==='status'?(
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
                                            ):(null))
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
                    {infoMsg && <><span>{infoMsg} </span><img style={{width:'1.3em'}} src={doneImg} alt='doneImg'/> </>}
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
export default ModalBulevar
