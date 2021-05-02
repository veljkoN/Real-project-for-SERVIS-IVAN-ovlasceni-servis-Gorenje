import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import {  handleS } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
import { v4 as uuidv4 } from 'uuid'

let handleSubmit:handleS
const AddWorkerBulevar = () => {
    const [ workers, setWorkers ] = useState<any>([])
    const [ worker, setWorker ] = useState<string>('')
    const [ numbOtp, setNumbOtp ] = useState<number | string>('')
    const [ msg, setMsg ] = useState('')
    useEffect(()=>{
        const workersParser:any = localStorage.getItem('workers')
        setWorkers(JSON.parse(workersParser))
        if(!JSON.parse(workersParser)){
            setMsg('Lista je prazna')
        }
    },[worker])
    handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMsg('')
        const workersParser:any = localStorage.getItem('workers')
        if(JSON.parse(workersParser)){
            const newArrWorkers = [...JSON.parse(workersParser),{id:uuidv4(),worker:worker}]
            localStorage.setItem('workers',JSON.stringify(newArrWorkers))
        }
        else{
            const newArrWorkers = [{id:uuidv4(),worker}]
            localStorage.setItem('workers',JSON.stringify(newArrWorkers))
        }
        setWorker('')
       
    }
    const DeleteWorkerB = (id:string) => {
        const filteredWorkers = workers.filter((data:any)=>{
            return data.id!==id
        })
        localStorage.setItem('workers',JSON.stringify(filteredWorkers))
        setWorkers(filteredWorkers)
    }
    const resetNumber = () => {
        localStorage.setItem('numb',numbOtp.toString())
        setNumbOtp('')
    }
    if(!logg()) return <Redirect to='/prijava'/>
    return (
        <div className='container '>
            <Helmet>
                <title>GServis-IVAN | Podešavanje - depozit</title>
            </Helmet>
            <div className='row mt-2'>
                <div className='col-lg-3 mt-4'>
                    <input type='number'  className="form-control" value={numbOtp} placeholder='Unesite broj otpremnice' onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNumbOtp(Number(e.target.value))} />
                    <button className='btn btn-danger form-control mt-2' onClick={()=>resetNumber()}>Promeni broj otpremince</button>
                </div>
                <div className='col-lg-5'>
                    <h5>Dodaj novog radnika u listu</h5>
                    <div className="alert alert-secondary">
                         Unesite ime i prezime radnika
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            <div className="input-group mb-3">
                                <input type='text' className="form-control" placeholder='Ime i prezime' value={worker} id='serviser' onChange={(e)=>setWorker(e.currentTarget.value)} />
                                <div className="input-group-append">
                                    <button type='submit' className='btn btn-success'>Potvrdi</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <h5>Lista aktivnih radnika</h5>
                    <ul className="list-group">
                        {workers && workers.map((data:any)=>(
                        <li className="list-group-item list-group-item-secondary mb-1 text-center" key={data.id}>
                            <div className="clearfix">
                                <span className="float-left ml-5">{data.worker}</span>
                                <span className="float-right" onClick={()=>DeleteWorkerB(data.id)}><i className="material-icons delTodoRest">&#xe872;</i> </span>
                            </div>    
                        </li>
                        ))
                    }
                    </ul>
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    )
}

export default AddWorkerBulevar
