
import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import { Helmet } from 'react-helmet'
import { deleteT, handleChangeCP, HandleDCP, itemOBJ, itemsOBJ, ObjectLS, devidTenCP,calculateCP, handleSubmitCP } from '../Type_Interfaces/types'
import loadingImg from '../img/loading.gif'
import numberWithCommas from '../utils/setNumber'
let  downHandler:HandleDCP
let handleChange:handleChangeCP
let handleDelete:deleteT
let dividerTen :devidTenCP
let calculate:calculateCP 
let handleSubmit:handleSubmitCP 



const CalculatePrice:React.FC= () => {
    const [ allPrices, setAllPrices ] = useState<ObjectLS[]>([])
    const [ errMsg, setErrMsg ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ errInList, setErrInList ] = useState('')
    const [ item, setItem ] = useState<itemOBJ>({
        sifra:'',
        kolicina:1
    })
    const [ items, setItems ] = useState<itemsOBJ[]>([])
    const [ suma, setSuma ] = useState(0)
    const inputSifra:any = document.querySelector('#inputSifra')
    const inputRef:any= useRef();

    useEffect(() => {
        if( inputRef.current)
        inputRef.current.focus();
    })
    useEffect(()=>{
        let tempSuma = 0
        items.forEach((price:any)=>{
            tempSuma += price.MCena * price.kolicina
        })
        setSuma(tempSuma)
    },[items])
    useEffect(()=>{
        const pricesLS:any = localStorage.getItem('cene')
        setAllPrices(JSON.parse(pricesLS))
        setTimeout(()=>{
            setLoading(false)
        },1000)
    },[])
    useEffect(()=>{
        setItems([])
    },[])
    handleSubmit = (e) => {
        e.preventDefault()
        setErrInList('')
        setErrMsg(false)
        if(items.findIndex((data:any)=> data.Materijal===item.sifra)>-1){
           setErrInList('nasao!')
        }
        allPrices.find((price:any)=>{
            return price.Materijal===item.sifra? (setItems([...items,{...price,kolicina:item.kolicina,MCena:calculate(price.Cena)}])):null
        })  
       if(allPrices.findIndex((data:ObjectLS)=> data.Materijal===item.sifra)===-1){
           setErrMsg(true)
       }
       else{
            setErrMsg(false)
            const filterData = allPrices.filter((price:ObjectLS)=> price.Materijal!==item.sifra)
            setAllPrices(filterData) 
        }
        setItem({
            sifra:'',
            kolicina:1
        })
        inputSifra.focus()
    }
    calculate = (price) => {
        const para = price * 1.2
        if(price>0 && price<400){
           return Math.ceil(para*1.30) + 10 - dividerTen(price,Math.ceil(para*1.30)%10)
        }
        else if(price>401 && price<800){
            return Math.ceil(para*1.25) + 10 - dividerTen(price,Math.ceil(para*1.25)%10)
        }
        else if(price>801 && price<4000){
            return Math.ceil(para*1.20) + 10 - dividerTen(price,Math.ceil(para*1.20)%10)
        }
        else if(price>4001 && price<8000){
            return Math.ceil(para*1.15) + 10 - dividerTen(price,Math.ceil(para*1.15)%10)
        }
        else if(price>8001){
            return Math.ceil(para*1.10) + 10 - dividerTen(price,Math.ceil(para*1.10)%10)
        }
    }
    dividerTen = (price,rest) => {
        if(rest%10===0){
            return 10
        }
        return rest
    }
    handleDelete = (id) => {
        const restore:any = items.find((item:itemsOBJ)=>item.id===id)
        const newItems = items.filter((item:itemsOBJ)=>{
            return item.id!==id
        })
        setItems(newItems)
        setAllPrices([...allPrices,restore])
        inputSifra.focus()
    }
    handleChange = (e) => {
        if(!e.target.value.includes('+') && !e.target.value.includes('-'))
        setItem({...item, sifra:e.target.value})
        
    }
    //adding event on key
    downHandler = (e) =>  {
      if (e.key === '+') {
        setItem({...item, kolicina:Number(item.kolicina)+1})
       }
      else if  (e.key === '-' && item.kolicina >1) {
        setItem({...item, kolicina:Number(item.kolicina)-1})
      }
       if (e.key==='Escape'){
        resetall()
      }   
    }
    useEffect(() => {
      window.addEventListener('keydown', downHandler)
      return () => {
        window.removeEventListener('keydown', downHandler)
      }
    });  
    const resetall = () => {
        setItems([])
        const pricesLS:any = localStorage.getItem('cene')
        setAllPrices(JSON.parse(pricesLS))
        
    }
    if(!logg()) return <Redirect to='/prijava'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
      }
    return (
        <div className='container-fluid '>
            <Helmet>
                <title>GServis-IVAN | Proračun cena</title>
            </Helmet>
            <div className='row mt-2'>
                <div className='col-md-12'>
                    {allPrices===null? <h4 className='text-right'>Baza je prazna <i className="fa fa-database" id="dataBaseEmpty"></i></h4>:<h4 className='text-right'>Baza je puna <i className="fa fa-database" id="dataBaseFull"></i></h4>}
                </div>
                <div className='col-md-3 ml-5'>
                    <h5>Unesite podatke</h5>
                   
                    <div className="alert alert-secondary">
                       <form onSubmit={(e)=>handleSubmit(e)}>
                           <label>Šifra:</label>
                           <input type='text' className='form-control form-control-sm mb-2' id='inputSifra' ref={inputRef} value={item.sifra} onChange={(e)=>{handleChange(e)}} placeholder="Unesite šifru rezervnog dela" />
                           <label>Količina: <span id='spanNumber'>{item.kolicina}  kom.</span></label><br/>
                           <i className="far fa-minus-square btnMinus"  onClick={(e)=> item.kolicina >1 && setItem({...item, kolicina:Number(item.kolicina)-1})}></i>
                           <i className="far fa-plus-square btnPlus" style={{fontSize:"20px",color:"blue"}} onClick={(e)=> setItem({...item, kolicina:Number(item.kolicina)+1})}></i><br/> 
                           <div className="btn-group  mt-2">
                                <button type="submit" disabled={item.sifra.trim().length===0 && true} className='btn btn-warning btn-block btnSubmitPrice'>Izračunaj cenu</button>
                                <button type="button" className="btn btn-danger ml-2 btnResetPrice" onClick={()=>resetall()}>C</button>
                           </div><br/>
                            {errMsg && errInList.length===0 && <span className='mt-3' id='itemError'>{`* Za unetu šifru ne postoje podaci`}</span>}
                            {errMsg && errInList.length>0 && <span className='mt-3' id='itemError'>{`* Artikal je već izabran`}</span>}
                       </form>
                    </div>
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-7'>
                    <div className='table-responsive'>
                {items.length>0 ? (<table className='table mt-3' >
                        <thead>
                            <tr>
                                <th>Šifra</th>
                                <th>Naziv</th>
                                <th>VP Cena/komad bez PDV</th>
                                <th>MP Cena/komad</th>
                                <th>Količina</th>
                                <th>MP Cena/ukupno</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody tabIndex={0}>
                        {items && items.map((item:any)=>(
                             <tr key={item.id} >
                             <td>
                                 <b>{item.Materijal}</b>
                             </td>
                             <td>
                                 {item.Naziv}
                             </td>
                             <td>
                             {`${numberWithCommas(item.Cena)} rsd`} 
                             </td>
                             <td className="table-success">
                                 {`${numberWithCommas(item.MCena)} rsd`}
                             </td>
                             <td>
                                 <b>{item.kolicina}</b>
                             </td>
                             <td className="table-warning">
                                 {`${numberWithCommas(item.MCena * item.kolicina)} rsd`}
                             </td>
                             <td>
                                 <i className="material-icons" onClick={()=>handleDelete(item.id)} id='removeItemL'>remove_circle_outline</i>
                             </td>
                         </tr>
                        ))}
                        </tbody> 
                    </table>):(<h3>Lista izabranih artikala je prazna</h3>)}</div>
                    {items.length>1 && <h4 className='text-right'>Ukupno: {numberWithCommas(suma)} rsd</h4>
                    }
                </div>
            </div>
        </div>
    )
}

export default CalculatePrice
