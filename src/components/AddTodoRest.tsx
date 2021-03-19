import React, { useState,useEffect } from 'react'
import firebase from '../db/config'
import { datumItem } from '../utils/SetDate'
import {  PropsATR } from '../Type_Interfaces/Interfaces'
import { Data, handleS, handleEditTR, TodoRest } from '../Type_Interfaces/types'
let handleSubmit:handleS
let handleEditChange:handleEditTR
const AddTodoRest:React.FC<PropsATR> = ({setErrorMsg,user, setMsg, todoEdit, setTodoEdit}) => {
    const [todo, setTodo ] = useState<TodoRest>({
        title:'',
        completed: false,
        marked:false,
        datum: '',
        datumItem: '',
        korisnik: ''
    })
    useEffect(()=>{
        if(todoEdit.title){
            setTodo(todoEdit)
        }
    },[todoEdit])
    handleSubmit = e => {
        e.preventDefault() 
        setErrorMsg('')
        firebase.firestore().collection('todoRest').add({
            ...todo,
            completed:false,
            marked:false,
            datumItem:datumItem,
            datum:new Date().toISOString(),
            korisnik:user 
        }).then((data:Data) =>{
            setMsg('Zahtev je dodat na listu')
            setTodo({
                title:'',
                completed: false,
                marked:false,
                datum: '',
                datumItem: '',
                korisnik: ''
            })
            const title = document.querySelector('#title') as HTMLInputElement
            title.value=''
        }).catch(err=>{
            setErrorMsg('Greška!!!Proveri da li je zahtev dodat na listu '+err)
        })
    }  
    handleEditChange = (id) => {
        firebase.firestore().collection('todoRest').doc(id).update({
            title: todo.title}).then(()=>{ 
                setTodoEdit({
                    title:'',
                    completed: false,
                    marked:false,
                    datum: '',
                    datumItem: '',
                    korisnik: ''
                })
                setTodo({
                    title:'',
                    completed: false,
                    marked:false,
                    datum: '',
                    datumItem: '',
                    korisnik: ''
                })
                setMsg('Naslov je promenjen')
            })
    }
    return (
        <div className="alert alert-secondary shadow-sm">
            <form onSubmit={(e) => handleSubmit(e)}> 
                <label>Naslov</label>
                <textarea  className='form-control form-control-xl' rows={5} value={todo.title} placeholder='Naslov' id='title' onChange={(e)=>setTodo({...todo,title:e.currentTarget.value})} ></textarea>
                <div className="clearfix">
                    <span className="float-right">
                        {
                            todoEdit.title ?
                            (<button type='button'  className='btn btn-danger mt-2' disabled={todo.title===''? true:false} onClick={()=>handleEditChange(todo.id)} >Sačuvaj promene</button>):
                            (<button type='submit' className='btn btn-warning mt-2' disabled={todo.title===''? true:false}>Sacuvaj</button>)
                        }
                    </span>
                </div>
            </form>
        </div>
    )
}

export default AddTodoRest
