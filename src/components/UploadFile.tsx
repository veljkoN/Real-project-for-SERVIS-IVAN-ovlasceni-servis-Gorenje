import React, { useEffect, useState } from 'react'
import firebase from '../db/config'
import XLSX from 'xlsx';
import jQuery from 'jquery'
import { v4 as uuidv4 } from 'uuid'
import CounterData from './CounterData';
import { showDate } from '../utils/SetDate';
import { addDataTDB, DB, handleFS, HC } from '../Type_Interfaces/types';
import logg from '../AuthComponent/LoggedIn';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet'
let handleFileSelect:handleFS
let addDataToDB:addDataTDB
let handleClick:HC
let clearData:HC

const UploadFile:React.FC = () => {
  const [ Edata, setEdata ] = useState([])
  const [ intBr, setIntBr ] = useState('')
  const [ sagBr, setSagBr ] = useState('')
  const [ infoMsg, setInfoMsg ] = useState('')
  const [ step, setStep ] = useState('')
  const [ test, setTest ] = useState([])
  const [ testBulevar, setTestBulevar ] = useState([])
  const [ counter, setCounter ] = useState(0)
  let ExcelToJSON:any
  useState(()=>{
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
    useEffect(()=>{
    if(Edata.length>0 && test.length===0){
      setStep('25%')
    }
    else if(Edata.length>0 && test.length>0 && sagBr===''&& intBr===''){
      setStep('50%')
    }
    else if(Edata.length>0 && test.length>0 && sagBr!==''&& intBr!=='' && counter===0){
      setStep('75%')
    }
    else if(Edata.length>0 && test.length>0 && sagBr!==''&& intBr!=='' && counter === 1){
      setStep('100%')
    }
    else{
      setStep('')
    }
    },[Edata,test,intBr,sagBr,counter])
    handleFileSelect = evt => {   
      let files:any = evt.target.files; // FileList object
      let xl2json = new ExcelToJSON();
      xl2json.parseExcel(files[0]);      
  }
  addDataToDB = e => {
    e.preventDefault()
    let db:DB=firebase.firestore()
      test.map((item:any)=>{
        const Db =  db.collection("uplodedData").doc(String(uuidv4())).set(
              { ime:item.Komentar,
                sifra:item.Materijal,
                naziv:item.Naziv,
                kolicina:item.Količina,
                brojInterneNarudzbe:intBr,
                sag:sagBr,
                datum:item.Datum,
                datumCompare:new Date().toISOString(),
                komentar:'',
                status:'Poručeno'
            }
          )
          return Db
        }
      )
      //ovde novi kod
      testBulevar.map((item:any)=>{
        const Db =  db.collection("bulevar").doc(String(uuidv4())).set(
              { ime:item.Komentar,
                sifra:item.Materijal,
                naziv:item.Naziv,
                kolicina:item.Količina,
                brojInterneNarudzbe:intBr,
                sag:sagBr,
                datum:item.Datum,
                datumCompare:new Date().toISOString(),
                komentar:'',
                status:'Poručeno'
            }
          )
          return Db
        }
      )
  }
   handleClick = () => {
    const intBrD = document.querySelector('#int-br') as HTMLInputElement
    const sagBrD = document.querySelector('#sag-br') as HTMLInputElement
    if(intBrD.value==='' || sagBrD.value===''){
      setInfoMsg('Oba polja moraju biti popunjena')
      intBrD.style.border='1px solid red'
      sagBrD.style.border='1px solid red'
    }
    else{
    intBrD.style.border='1px solid lightgray'
    sagBrD.style.border='1px solid lightgray'
    setIntBr(intBrD.value.trim())
    setSagBr(sagBrD.value.trim())
    intBrD.value=''
    sagBrD.value=''
    }
  }
  clearData = () => {
    const newData: any = Edata.filter((item:any)=>{
      if(item.Komentar==='BULEVAR' || item.Komentar==='Mirijevo' || item.Komentar==='' || item.Komentar===undefined){
        return null
      }
      else{
        return item
      }
    })  
    const tempDataPr = newData.sort((a:any,b:any):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
    const tempData = tempDataPr.sort((a:any,b:any):any => (a.Komentar > b.Komentar) ? 1 : ((b.Komentar > a.Komentar) ? -1 : 0))
    setTest(tempData)
    //----ovde pocinje kod za Bulevar

    const newDataBulevar: any = Edata.filter((item:any)=>{
      if(item.Komentar==='BULEVAR'){
        return item
      }
      else{
        return null
      }
    })  
    const tempDataBulevar = newDataBulevar.sort((a:any,b:any):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
    const tempBulevar = tempDataBulevar.sort((a:any,b:any):any => (a.Komentar > b.Komentar) ? 1 : ((b.Komentar > a.Komentar) ? -1 : 0))
    setTestBulevar(tempBulevar)



    //

    return 
  }
  console.log(testBulevar)
  if(!logg()) return <Redirect to='/prijava'/>
  else if(localStorage.getItem('user')==='wWrtOckr0gaLsrSNbIZqemJqRCh1') return <Redirect to='/sviPodaci'/>
    return (
    <div className='container'>
        <Helmet>
          <title>GServis-IVAN | Učitavanje podataka</title>
        </Helmet>
      <div className="clearfix mt-5">
        <span className="float-left">
          { step!=='100%'? (<><h5 className='text-info'>Korak broj: <span className="badge badge-info" style={{borderRadius:'50%'}}>{
            step===''?(1):(step==='25%'?(2):(step==='50%'?(3):(step==='75%'?(4):('nesto'))))
            }
          </span> </h5></>):(null)}  
        </span>
        <span className="float-right">
            {<CounterData/>} 
        </span>
      </div>
      <div className='row mt-5'>
        <div className='col-sm-3'></div>
        <div className='col-sm-6'>
          {step!=='100%'?( <div className="progress"><div className="progress-bar progress-bar-striped progress-bar-animated" style={{width:step}}>{step}</div> </div>):(<><h5 className='text-info'>Podaci su uspešno ucitani u bazu!</h5><p>Sačuvano je {} <span className="badge badge-info">{test.length}</span>{' '}<span className="badge badge-success">{testBulevar.length}</span>{} novih naloga</p></>)}
        </div>
        <div className='col-sm-3'></div>
      </div>
      <div className='mt-5'>
        {step!=='100%'? (<> <span className='text-dark mb-3'>{ step===''?('Izaberi tabelu'):(step==='25%'?(''):(step==='50%'?('Unesi interni i sag broj narudžbe'):(step==='75%'?('Sačuvaj podatke u bazi'):(null))))}</span></>):(<> </>)}
        {Edata.length===0?
        (<form className='mt-1' encType="multipart/form-data"> 
          <input id="upload" type='file' className='success'  name="files[]" onChange={(e)=>{handleFileSelect(e)}}/>
        </form>):(test.length>0 && step==='50%'? (<div className='row'>
        <div className='col-sm-4'>
          <input type='number' className="form-control form-control-sm mb-2" id='int-br' placeholder='Broj interne narudzbe'/>
          <input type='number' className="form-control form-control-sm mb-2" id='sag-br' placeholder='Sap broj narudzbe'/>
          <button className='btn btn-sm btn-info' onClick={()=>handleClick()}>Učitaj Sap i IN broj</button>
          <p className='text-danger mt-1'>{infoMsg}</p>
        </div>
      </div>): (step==='25%'?(<><br/><button className='btn btn-sm btn-info mt-1' onClick={()=>clearData()}>Učitaj tabelu</button></>):(null)))
      }
    </div>
    <div className='table-responsive mt-2'>
      {test.length>0 && intBr.length>0 && sagBr.length>0 && step!=='100%' && <h5>Broj naloga učitanih iz excel tabele{} <span className="badge badge-info">{test.length}</span></h5>}
      {Edata.length>0 && test.length>0 && intBr!==''&& sagBr!==''&& step!=='100%' &&
      <><table className='table table-bordered'>
        <thead>
          <tr>
            <th>Ime I prezime</th>
            <th>Sifra</th>
            <th>Naziv</th>
            <th>Kolicina</th>
            <th>Broj interne narudzbe</th>
            <th>broj SAG narudzbe</th>
            <th>datum</th>
            <th>Status</th>
            <th>Komentar</th>
          </tr>
        </thead>
        <tbody>
          {test && test.map((item:any)=>(
          <tr key={uuidv4()}>
            <td>{item.Komentar}</td>
            <td>{item.Materijal}</td>
            <td>{item.Naziv}</td>
            <td>{item.Količina}</td>
            <td>{intBr}</td>
            <td>{sagBr}</td>
            <td>{showDate(item.Datum)}</td>
            <td>Poručeno</td>
            <td></td>
          </tr>
            ))}
        </tbody>
      </table>
      <h5>Broj naloga u magacinu Bulevar{}  <span className="badge badge-success">{testBulevar.length}</span> </h5>
      <table className='table table-bordered'>
      <thead>
        <tr className="table-bulevar">
          <th>Ime I prezime</th>
          <th>Sifra</th>
          <th>Naziv</th>
          <th>Kolicina</th>
          <th>Broj interne narudzbe</th>
          <th>broj SAG narudzbe</th>
          <th>datum</th>
          <th>Status</th>
          <th>Komentar</th>
        </tr>
      </thead>
      <tbody>
        {testBulevar && testBulevar.map((item:any)=>(
        <tr key={uuidv4()}>
          <td>{item.Komentar}</td>
          <td>{item.Materijal}</td>
          <td>{item.Naziv}</td>
          <td>{item.Količina}</td>
          <td>{intBr}</td>
          <td>{sagBr}</td>
          <td>{showDate(item.Datum)}</td>
          <td>Poručeno</td>
          <td></td>
        </tr>
          ))}
      </tbody>
    </table></>}
    </div>
    <div className='mb-3 mt-2'>
      {Edata.length>0 && test.length>0 && intBr!==''&& sagBr!==''&& step!=='100%' && <><button className='btn btn-sm btn-success ml-2' onClick={(e)=>{addDataToDB(e);setCounter(1)}}>Sačuvaj podatke u bazi</button> <button className='btn btn-sm btn-warning' onClick={()=>window.location.reload(false)}>Učitaj novu tabelu</button></>}
    </div>
  </div>
    )
}

export default UploadFile
