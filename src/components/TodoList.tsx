import React, { useState, useEffect } from 'react'
import AddTodo from './AddTodo'
import firebase from '../db/config'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import getUser from '../utils/GetUser'
import loadingImg from '../img/loading.gif'
import {  DB, deleteT, Doc, handleCheck, SnSh, TDStyle } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
let handleChange:handleCheck
let deleteItem:deleteT

const TodoList:React.FC = () => {
    const [ todoList, setTodoList ] = useState<object[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ msg, setMsg ] = useState<string>('')
    const [ errorMsg, setErrorMsg ] = useState <string> ('')
    const [user, setUser ] = useState<string>('')
    const todoC:TDStyle ={
        textDecoration:'line-through',
        opacity:'0.8'
    }
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
            const db:DB = firebase.firestore()
            return db.collection('todo').onSnapshot(((snapshot:SnSh) =>{
                const newData:any = snapshot.docs.map((doc:Doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                const tempData = newData.sort((a:any,b:any):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
                setTodoList(tempData)
                setLoading(false)
            })
        )
    },[])
    handleChange = ( e, id ) => {
        const { checked } = e.currentTarget
        firebase.firestore().collection('todo').doc(id).update({
            completed:checked
        }).then(()=>{ 
            setMsg('Status je promenjen')
        })
    }
    deleteItem = id =>{
        firebase.firestore().collection("todo").doc(id).delete().then(function() {
           setMsg("Zahtev je izbrisan sa liste");
        }).catch(function(error) {
            setErrorMsg("Greška!!!Proveri da li je zahtev izbrisan sa liste ");
        })
    }
    if(!logg()) return <Redirect to='/prijava'/>
    else if(localStorage.getItem('user')==='wWrtOckr0gaLsrSNbIZqemJqRCh1') return <Redirect to='/sviPodaci'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Podsetnik - stranke</title>
            </Helmet>
            <div className='row mt-2'>
                <div className='col-lg-4'>
                    <h5>Dodaj novi zahtev</h5>
                    <AddTodo setErrorMsg={setErrorMsg} setMsg={setMsg} user={user} />
                    {msg}
                    {errorMsg}
                </div>
                <div className='col-lg-6 offset-1'>
                    <h5>Lista zahteva</h5>
                    <ul className="list-group">
                        {todoList && todoList.map((todo:any) =>(
                        <li className="list-group-item list-group-item-warning  list-group-item-action mb-2"  key={todo.id}>
                            <div className=''>
                                <div className="clearfix">
                                    <span className="float-left">
                                    <div className="checkbox">
                                        <input type='checkbox'   defaultChecked={todo.completed} onChange={(e):void=>handleChange(e,todo.id)}/>
                                        <label className='ml-2'>{todo.completed?('Završeno'):('Nezavršeno')}</label>   
                                    </div>
                                    </span>
                                    <span className="float-right">
                                        <i className="material-icons delTodo" onClick={()=>{if (window.confirm('Da li ste sigruni da želite da obrišete potsetnik sa liste?')) deleteItem(todo.id)}} >&#xe872;</i>
                                    </span>
                                </div>
                                <h5 className='text-body text-break' style={todo.completed? todoC:{}}>{todo.name}</h5>
                                <h5 className='text-body text-break' style={todo.completed? todoC:{}}>{todo.phone}</h5>
                                <div>
                                    <p className='text-body text-break' style={todo.completed? todoC:{}}>{todo.title}</p>
                                </div>
                                <hr/>
                                <div className="clearfix">
                                    <span className='float-right text-dark' style={todo.completed? todoC:{}}>Kreirano: {todo.datumItem}</span>
                                    {localStorage.getItem('user')==='WiVVMq2MUwWw18ZvnNNvSYl7vOG3'? <><br/><span className='float-right text-dark'>Korisnik: {todo.korisnik}</span></>:null}
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList
