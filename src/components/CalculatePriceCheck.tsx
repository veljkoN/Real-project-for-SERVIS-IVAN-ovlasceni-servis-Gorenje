import React, { useEffect, useState } from 'react'
import XLSX from 'xlsx';
import jQuery from 'jquery'
import { handleFS, HC, ObjectLS } from '../Type_Interfaces/types';
import logg from '../AuthComponent/LoggedIn';
import { v4 as uuidv4 } from 'uuid'
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import loadingImg from '../img/loading.gif'
 
let handleFileSelect:handleFS
let ExcelToJSON:any
let uploadData:HC
let deleteAllData:HC
let seeData:HC

const cutString = (materijal:string) => {
  if(materijal[0]==='0'){
    return materijal.slice(materijal.length-6, materijal.length)
  }
  else if(materijal[0]==='H'){
    return materijal
  }
}



const CalculatePriceCheck:React.FC = () => {
  const [ Edata, setEdata ] = useState<ObjectLS[]>([])
  const [ dataInDB, setDataInDB ] = useState<any>([])
  const [ loading, setLoading ] = useState(true)
  //data from database
  const [ allPrices, setAllPrices ] = useState<any>([])
    useEffect(()=>{
      const pricesLS:any = localStorage.getItem('cene')
      setAllPrices(JSON.parse(pricesLS))
      setTimeout(()=>{
        setLoading(false)
      },1000)
    },[])
  seeData = () => {
    return localStorage.getItem('cene')
  }
  
  useEffect(()=>{
    ExcelToJSON = function(this:any) {
      let dataArray=[]
      this.parseExcel = function(file:any) {
        const reader = new FileReader()
        reader.onload = function(e) {
          let {result}:any=e.currentTarget
          const data:any =result;
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          workbook.SheetNames.forEach(function(sheetName) {
            // object
            let {sheet_to_row_object_array}:any = XLSX.utils
            var XL_row_object = sheet_to_row_object_array(workbook.Sheets[sheetName])
            var json_object = JSON.stringify(XL_row_object)
            setEdata((prev:any) :any=>{
                return [...prev,...JSON.parse(json_object)]
                })
            dataArray.push(JSON.parse(json_object))
            jQuery( '#xlx_json' ).val( json_object )
          })
        }
      reader.onerror = function(ex) {
        console.log(ex);   
      }
      reader.readAsBinaryString(file)
      }
    }
  })
  handleFileSelect = evt => {   
    let files:any = evt.target.files; // FileList object
    let xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);      
  }
  uploadData = () => {
    const tempUpdate = Edata.map((data:any)=>{
     let newMat = cutString(data.Materijal)
     return {...data,Materijal: newMat,id:uuidv4()}
    })
    localStorage.setItem('cene',JSON.stringify(tempUpdate))
    setTimeout(()=>{
      setDataInDB(seeData())
      const pricesLS:any = localStorage.getItem('cene')
      setAllPrices(JSON.parse(pricesLS))
    },2000)
  }
  deleteAllData = () => {
    localStorage.removeItem('cene')
    setAllPrices(null)
    setEdata([])
  }
  if(!logg()) return <Redirect to='/prijava'/>
  if(loading){
    return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
  }
    return(
      <div className='container'>
        <Helmet>
          <title>GServis-IVAN | Učitavanje cenovnika</title>
        </Helmet>
        <div className='row mt-2'>
          <div className='col-lg-2'></div>
          <div className='col-lg-7'>
            <h2 className='text'>Učitavanje cenovnika</h2>
            <div className='alert alert-info mt-5'>
              {Edata.length===0 && allPrices===null && 
              <form className='mt-1' encType="multipart/form-data"> 
              <p>U bazi trenutno nema podataka</p>
                <h4>Izaberi tabelu</h4>
                <input id="upload" type='file' className='success'  name="files[]" onChange={(e)=>{handleFileSelect(e)}}/>
              </form>} 
              {Edata.length>0 && !localStorage.getItem('cene') && 
              <div>
                <h4>Učitaj podatke u bazu</h4>
              <button className='btn btn-success' onClick={()=>uploadData()}>Učitaj</button>
              </div>}
              {dataInDB.length>0 && 
              <h2>Podaci su uspešno sačuvani u bazi</h2>}
              {allPrices!==null && 
              <h2>Baza je napunjena podacima</h2>}
            </div>
          </div>
          <div className='col-lg-3'>
          {allPrices!==null && <button className='btn btn-danger' onClick={()=>{if (window.confirm('Da li ste sigruni da želite da obrišete sve podatke iz baze?')) deleteAllData()}} >Izbriši podatke iz baze</button>}
          </div>
        </div>
      </div>
    )
}

export default CalculatePriceCheck



