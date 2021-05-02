import React, { useEffect, useState } from 'react'
import { datumItem } from '../utils/SetDate'

const ResForm:React.FC<any> = ({state,handleSubmitAll}) => {
    const [ isDone, setIsDone ] = useState(false)
    const [ workers, setWorkers] = useState<any>([])
    const [ numbOt, setnumOt ] = useState('')
    const [ depo, setDepo ] = useState<any>({
        datum:datumItem,
        brojPrijemnice:'357',
        stranka:{
            ime:'',
            telefon:'',
            adresa:''
        },
        aparat:[],
        radnik:''
    })
    const [ atricle, setArticle ] = useState({br:1,naziv:'', model:'',artBr:'',serijskiBr:'',opisKvara:''})
    useEffect(()=>{
        let numbTemp:any = localStorage.getItem('numb')
        setnumOt(numbTemp)
    },[])
    useEffect(()=>{
        const workersParser:any = localStorage.getItem('workers')
        setWorkers(JSON.parse(workersParser))
    },[])
    const handleSubmitDeo = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDepo({...depo,brojOtpremnice:numbOt,aparat:[...depo.aparat,atricle]})
        setArticle({br:atricle.br+1,naziv:'', model:'',artBr:'',serijskiBr:'',opisKvara:''})
        setIsDone(false)
    }
    return(
        <>
       {!state.showTemplate && <p className='text-info text-center'>Broj sačuvanih aparata {depo.aparat.length}</p>}
       {!isDone && <h4 className='text-dark'>Prijemnica</h4>}
        {!isDone? <form className='mt-3' onSubmit={(e)=>handleSubmitDeo(e)}>
           
            <label htmlFor="nazivAparata" className='label-font-size'>Naziv aparata</label>
            <input type="text" className="form-control form-control-sm" value={atricle.naziv} id='nazivAparata'  placeholder='Naziv aparata' onChange={(e)=>setArticle({...atricle,naziv:e.target.value})} />
            
            <label htmlFor="model"className='label-font-size'>Model</label>
            <input type="text" className="form-control form-control-sm" placeholder='Model aparata' value={atricle.model} id='modelAparata' onChange={(e)=>setArticle({...atricle,model:e.target.value})} />
            
            <label htmlFor="brArtikla" className='label-font-size'>Broj artikla</label>
            <input type="text" className="form-control form-control-sm" placeholder='Broj Artikla' id='BrArtikla' value={atricle.artBr} onChange={(e)=>setArticle({...atricle,artBr:e.target.value})} />
            
            <label htmlFor="serijskiBr" className='label-font-size'>Serijski broj</label>
            <input type="text" className="form-control form-control-sm" placeholder='Serijski broj' value={atricle.serijskiBr} id='serijskiBr' onChange={(e)=>setArticle({...atricle,serijskiBr:e.target.value})} />

            <label htmlFor="opisKvara" className='label-font-size'>Opis kvara</label>
            <input type="text" className="form-control form-control-sm" placeholder='Opis kvara' value={atricle.opisKvara} id='serijskiBr' onChange={(e)=>setArticle({...atricle,opisKvara:e.target.value})} />
            
            <div className="clearfix">
                <span className="float-left">
                    <button type='submit' disabled={atricle.naziv && atricle.model && atricle.artBr && atricle.serijskiBr? false:true} className='btn btn-success mt-2'>Dodaj u listu <i className="fa fa-list-alt"></i></button>
                </span>
                <span className="float-right">
                    {depo.aparat.length>0 && <button type='button' className='btn btn-info mt-2' onClick={()=>setIsDone(true)}>Dalje <i className="fa fa-arrow-circle-right"></i></button>}
                </span>
            </div>
        </form>:
        !state.showTemplate && <form onSubmit={()=>handleSubmitAll(depo)}>
            <label htmlFor="stranka" className='label-font-size'>Stranka</label>
            <input type="text" className="form-control form-control-sm" value={depo.stranka.ime} id='stranka'  placeholder='Ime i prezime' onChange={(e)=>setDepo({...depo,stranka:{...depo.stranka,ime:e.target.value}})} />
            
            <label htmlFor="telefon"className='label-font-size'>Telefon</label>
            <input type="text" className="form-control form-control-sm" placeholder='Br. telefona' value={depo.stranka.telefon} id='telefon' onChange={(e)=>setDepo({...depo,stranka:{...depo.stranka,telefon:e.target.value}})} />
            
            <label htmlFor="adresa"className='label-font-size'>Adresa</label>
            <input type="text" className="form-control form-control-sm" placeholder='Adresa' value={depo.stranka.adresa} id='telefon' onChange={(e)=>setDepo({...depo,stranka:{...depo.stranka,adresa:e.target.value}})} />

            <label htmlFor="worker" className='label-font-size'>Aparat primio</label>
            <select id='worker' name='worker' className="form-control form-control-sm" onChange={(e)=>setDepo({...depo,radnik:e.target.value})}>
                <option value=''>-</option>
                {workers && workers.map((data:any)=>(
                    <option key={data.id} value={data.worker}>{data.worker}</option>
                    ))
                }
            </select>
            <button type='submit' className='btn btn-success mt-2' >Formiraj prijemnicu</button>
        </form>}
        </>
    )
}

export default ResForm
