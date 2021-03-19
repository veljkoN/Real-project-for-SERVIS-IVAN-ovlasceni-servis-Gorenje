import React, { useState } from 'react'
import firebase from '../db/config'
import { datumItem } from '../utils/SetDate'
import {  PropsAT } from '../Type_Interfaces/Interfaces'
import { Data, handleS, Todo } from '../Type_Interfaces/types'
let handleSubmit:handleS

const AddTodo:React.FC<PropsAT> = ({setErrorMsg,user, setMsg}) => {
    const [todo, setTodo ] = useState<Todo>({
        name:'',
        title:'',
        phone:'',
        completed:false
    })
    handleSubmit = e => {
        e.preventDefault()
        setErrorMsg('')
        firebase.firestore().collection('todo').add({
            ...todo,
            completed:false,
            datumItem:datumItem,
            datum:new Date().toISOString(),
            korisnik:user
        }).then((data:Data) =>{
            setMsg('Zahtev je dodat na listu')
            setTodo({
                name:'',
                title:'',
                phone:'',
                completed:false
            })
            const name = document.querySelector('#name') as HTMLInputElement
            const title = document.querySelector('#title') as HTMLInputElement
            const phone = document.querySelector('#phone') as HTMLInputElement
            name.value=''
            title.value=''
            phone.value=''
        }).catch(err=>{
            setErrorMsg('Greška!!!Proveri da li je zahtev dodat na listu '+err)
        })
    }  
    return (
        <div className="alert alert-secondary shadow-sm">
            <form onSubmit={(e) => handleSubmit(e)}> 
                <label>Ime i prezime</label>
                <input type='text' className='form-control form-control-sm' placeholder='Ime i prezime' id='name' onChange={(e)=>setTodo({...todo,name:e.currentTarget.value})} />
                <label>Telefon</label>
                <input type='text' className='form-control form-control-sm' placeholder='Telefon' id='phone' onChange={(e)=>setTodo({...todo,phone:e.currentTarget.value})} />
                <label>Naslov</label>
                <textarea  className='form-control form-control-xl' placeholder='Naslov' id='title' onChange={(e)=>setTodo({...todo,title:e.currentTarget.value})} ></textarea>
                <div className="clearfix">
                    <span className="float-right">
                        <button type='submit' className='btn btn-warning mt-2' disabled={todo.name==='' || todo.title===''? true:false}>Sacuvaj</button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default AddTodo
