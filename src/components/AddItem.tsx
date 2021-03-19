import React, { useState, useEffect } from 'react'
import firebase from '../db/config'
import { HandleInput } from '../Type_Interfaces/Interfaces'
import validateCheck, { errorM } from '../utils/inputValidate'
import { datumItem } from '../utils/SetDate'
import imageSucces from '../img/imageSuccess.png'
import imageError from '../img/imageError.png'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import getUser from '../utils/GetUser'
import loadingImg from '../img/loading.gif'
import { Data, Doc, handleS } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'

let handleSubmit:handleS
const AddItem:React.FC = () => {
    const [ serviseri, setServiseri] = useState<object[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ allData, setAllData ] = useState<object[]>([])
    const [ dailyD, setDailyD ] = useState<object[]>([])
    const [ showImage, setShowImage] = useState<boolean>(false)
    const [ showErrorImage, setShowErrorImage ] = useState<boolean>(false)
    const [ user, setUser ] = useState<string>('')
    const [ item, setItem ] = useState <HandleInput> ({
        serviser:'',
        sifra:'',
        naziv:'',
        kolicina:null,
        nalog:null,
        garancija:'',
        komentar:'',
        status:''
    })
    const [ errorMsg, setErrorMsg ] = useState <string> ('')
    const [ successMsg, setSuccessMsg ] = useState<string>('')
    
    useEffect(()=>{
        setLoading(true)
        const db = firebase.firestore()
        return db.collection('serviseriLista').onSnapshot((snapshot) =>{
                const newData:object[] = snapshot.docs.map((doc:firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setServiseri(newData)
                setLoading(false)
            })
        },[])
        useEffect(()=>{
            if(getUser()){
                setUser(getUser())
            }
            else{
                setUser('')
            }
        },[loading])
    useEffect(()=>{    
    setLoading(true)
       const db = firebase.firestore()
       return db.collection('delovi').onSnapshot((snapshot) =>{
            const newData:object[] = snapshot.docs.map((doc:Doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setAllData(newData.sort((a:any,b:any) => b.datum.localeCompare(a.datum)))
            setLoading(false)
            }
        )
    },[])
    useEffect(()=>{
        const newData:Array<object> =  allData.filter((data:any)=>{
           if (data.datumItem===datumItem)
            return data
            else
            return null
        })
        setDailyD(newData)
    },[allData])
    handleSubmit = (e) => {
        e.preventDefault()
       if(validateCheck(item)===true){
        const res:string=datumItem.slice(3)
        setErrorMsg('')
        setSuccessMsg('')
        setLoading(true)
        firebase.firestore().collection('delovi').add({
            ...item,
            datumItem:datumItem,
            datumBrisanje:res,
            status:'Zadužen',
            datum:new Date().toISOString(),
            korisnik:user
        }).then((data:Data) =>{
            setErrorMsg('')
            setSuccessMsg('Podaci su uspešno sacuvani')
            setShowImage(true)
            setItem({
                serviser:'',
                sifra:'',
                naziv:'',
                kolicina:null,
                nalog:null,
                garancija:false,
                komentar:'',
                status:''
            })
            setLoading(false)
        }).catch(err =>{
            setShowErrorImage(true)
            setErrorMsg('Podaci nisu sacuvani u bazi')
            })
       }
       else{
           setErrorMsg(errorM)
       }
    } 
    useEffect(()=>{
        if(item.serviser!==''){
            setShowImage(false)
        }
    },[item.serviser])
  
    if(!logg() ) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    else {
    return (
        <div className='container-fluid'>
            <Helmet>
                <title>GServis-IVAN | Unos naloga</title>
            </Helmet>
            <div className='row mt-4'>
                <div className='col-sm-4'>  
                  {allData.length>0?  <h5>Ukupan broj naloga{} <span className="badge badge-danger">{allData.length}</span></h5>:<h5>Trenutno nema sačuvanih naloga</h5>} 
                  {dailyD.length>0 && <h6>Broj naloga na dan {datumItem} <span className="badge badge-success">{dailyD.length}</span></h6>}
                </div>
                <div className='col-sm-4 shadow-sm borderColor'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label style={{fontSize:'0.9em'}}>Serviser:</label> 
                        <select className="form-control form-control-sm"id='serviser' onChange={(e) => setItem({...item,serviser:e.currentTarget.value})}>
                        <option value=''>-</option>
                        {serviseri && serviseri.map( (data:any) => (
                        <option key={data.id} value={data.serviser}>{data.serviser}</option>
                        ))
                        }  
                        </select>
                        <label htmlFor="usr" className='label-font-size' >Šifra:</label>
                        <input type="text" className="form-control form-control-sm" id='sifra'  placeholder='Šifra'  onChange={(e) => setItem({...item,sifra:e.currentTarget.value})}/>
                        <label htmlFor="pwd"className='label-font-size'>Naziv:</label>
                        <input type="text" className="form-control form-control-sm" placeholder='Naziv' id='naziv' onChange={(e) => setItem({...item,naziv:e.currentTarget.value})}/>
                        <label htmlFor="pwd" className='label-font-size'>Količina:</label>
                        <input type="number" className="form-control form-control-sm" placeholder='Količina' id='kolicina' onChange={(e) => setItem({...item,kolicina:parseInt(e.currentTarget.value)})}/>
                        <label htmlFor="pwd" className='label-font-size'>Nalog</label>
                        <input type="number" className="form-control form-control-sm" placeholder='Nalog' id='nalog' onChange={(e) => setItem({...item,nalog:parseInt(e.currentTarget.value)})} />
                        <label htmlFor="pwd" className='label-font-size'>Komentar:</label>
                        <textarea   className="form-control form-control-sm" placeholder='Komentar (opciono)' id='komentar' onChange={(e) => setItem({...item,komentar:e.currentTarget.value})}></textarea>
                        <label className="form-check-label ml-3 mr-4">
                            <input type="radio" className="form-check-input" id="garancija1" name="garancija" value="U garanciji" onChange={(e) => setItem({...item,garancija:e.target.value})}/>U garanciji
                        </label>
                        <label className="form-check-label ml-3 mr-4">
                            <input type="radio" className="form-check-input" id="garancija2" name="garancija" value="Van garancije" onChange={(e) =>  setItem({...item,garancija:e.target.value})}/>Van garancije
                        </label>
                        <button type='submit' className='btn btn-success btn-block mt-2' disabled={item.serviser==='' || item.sifra===null || item.naziv===''  || item.kolicina===null || item.nalog===null || item.garancija===false || item.garancija===''? true:false} >Potvrdi</button>
                    </form>
                </div>
                <div className='col-sm-4'>
                    {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                    {showImage && (<> <p className='text-success'>{successMsg}</p> <img className='imgStyle'  src={imageSucces} alt='doneImage' /></>)}
                    {showErrorImage && <img className='imgStyle' src={imageError} alt='errorImage'/>}
                </div>
            </div>
        </div>
        )
    }
}

export default AddItem
