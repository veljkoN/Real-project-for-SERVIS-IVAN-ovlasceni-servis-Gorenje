import React, { useState, useEffect } from 'react'
import AddTodoRest from './AddTodoRest'
import firebase from '../db/config'
import { Redirect } from 'react-router'
import logg from '../AuthComponent/LoggedIn'
import getUser from '../utils/GetUser'
import loadingImg from '../img/loading.gif'
import {  DB, deleteT, Doc, handleCheck, handleEditTR, SnSh, TDRstyleM, TDStyle, TodoRest } from '../Type_Interfaces/types'
import { Helmet } from 'react-helmet'
let handleChange:handleCheck
let deleteItem:deleteT
let handleEdit:handleEditTR

const TodoListRest:React.FC = () => {
    const [ todoList, setTodoList ] = useState<object[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ msg, setMsg ] = useState<string>('')
    const [ errorMsg, setErrorMsg ] = useState <string> ('')
    const [user, setUser ] = useState<string>('')
    const [todoEdit, setTodoEdit ] = useState<any>({})
    const todoC:TDStyle ={
        textDecoration:'line-through',
        opacity:'0.8'
    }
    const TodoMarked:TDRstyleM = {
        border:'2px solid #FA4A31',
        borderRadius:'4px'
        
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
            return db.collection('todoRest').onSnapshot(((snapshot:SnSh) =>{
                const newData:any = snapshot.docs.map((doc:Doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                const tempData = newData.sort((a:TodoRest,b:TodoRest):any => (a.datum < b.datum ? 1 : ((b.datum < a.datum) ? -1 : 0)))
                setTodoList(tempData)
                setLoading(false)
            })
        )
    },[])
    handleChange = ( e, id ) => {
        const { checked } = e.currentTarget
        firebase.firestore().collection('todoRest').doc(id).update({
            completed:checked
        }).then(()=>{ 
            setMsg('Status je promenjen')
        })
    }
    deleteItem = id =>{
        firebase.firestore().collection("todoRest").doc(id).delete().then(function() {
           setMsg("Zahtev je izbrisan sa liste");
        }).catch(function(error) {
            setErrorMsg("Greška!!!Proveri da li je zahtev izbrisan sa liste ");
        })
    }
    handleEdit = id => {
        const db:DB = firebase.firestore()
        const oneData = db.collection('todoRest').doc(id)
        oneData.get().then((doc:any) => {
            if (doc.exists) {
                setTodoEdit({id: doc.id,
                    ...doc.data()})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
    }
    const handleMarked = (e:React.MouseEvent<HTMLElement, MouseEvent>,id:string)=>{
        const db:DB = firebase.firestore()
        const oneData:any = db.collection('todoRest').doc(id)
        
        oneData.get().then((doc:Doc) => {
            if (doc.exists) {
                firebase.firestore().collection('todoRest').doc(id).update({
                    marked:!doc.data().marked
                }).then(()=>{ 
                    setMsg('Status je promenjen')
                })
            } else {
                console.log("No such document!");
            }
        }).catch((error:any) => {
            console.log("Error getting document: ", error);
        });
    }
    if(!logg()) return <Redirect to='/prijava'/>
    else if(localStorage.getItem('user')==='wWrtOckr0gaLsrSNbIZqemJqRCh1') return <Redirect to='/sviPodaci'/>
    else if(localStorage.getItem('user')==='16rjUoG94iVmPsUP0nlqnyfIbzs2') return <Redirect to='/kalkulacijaCena'/>
    if(loading){
        return (<div className='fp-container'><img alt='img-item' className='fp-loader center'  src={loadingImg}/></div>)
    }
    return (
        <div className='container'>
            <Helmet>
                <title>GServis-IVAN | Podsetnik - ostalo</title>
            </Helmet>
            <div className='row mt-2'>
                <div className='col-lg-4'>
                    <h5>Dodaj novi zahtev</h5>
                    <AddTodoRest setErrorMsg={setErrorMsg} setMsg={setMsg} user={user} todoEdit={todoEdit} setTodoEdit={setTodoEdit} />
                    {msg}
                    {errorMsg}
                </div>
                <div className='col-lg-6 offset-1'>
                    <h5>Lista zahteva</h5>
                    <ul className="list-group">
                        {todoList && todoList.map((todo:any) =>(
                        <li className="list-group-item list-group-item-light list-group-item-action mb-2 list-rest" style={todo.marked ? TodoMarked:{}}  key={todo.id}>
                            <div className=''>
                                
                                <div className="clearfix">
                                    <span className="float-left">
                                    <div className="checkbox">
                                        <input type='checkbox'   defaultChecked={todo.completed} onChange={(e):void=>handleChange(e,todo.id)}/>
                                        <label className='ml-2'>{todo.completed?('Završeno'):('Nezavršeno')}</label>   
                                    </div>
                                    </span>
                                    <span className="float-right">
                                        <i className="material-icons delTodoRest" onClick={()=>{if (window.confirm('Da li ste sigruni da želite da obrišete potsetnik sa liste?')) deleteItem(todo.id)}} >&#xe872;</i>
                                    </span>
                                </div>
                                <h5 className='text-body text-break' style={todo.completed? todoC:{}}>{todo.name}</h5>
                                <h5 className='text-body text-break' style={todo.completed? todoC:{}}>{todo.phone}</h5>
                                <div>
                                    <p className='text-body text-break' style={todo.completed? todoC:{}}>{todo.title}</p>
                                </div>
                                <hr/>
                                <div className="clearfix">
                                    <i className='fas fa-flag float-right' style={todo.marked? ({color:'red'}):({color:'gray'})} id='todoFlag' onClick={(e)=>handleMarked(e,todo.id)}></i>
                                    <span className='float-right text-dark' style={todo.completed? todoC:{}}>Kreirano: {todo.datumItem}</span>
                                    
                                    <button onClick={()=>handleEdit(todo.id)} className='btn btn-outline-dark btn-sm'>Izmeni</button>
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

export default TodoListRest


