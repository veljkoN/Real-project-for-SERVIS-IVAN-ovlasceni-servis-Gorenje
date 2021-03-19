import React, {  useEffect, useState } from 'react'
import firebase from '../db/config'
import { DB } from '../Type_Interfaces/types'

const UserInfo:React.FC = () => {
    const [ userInfo, setUserInfo ] = useState<string>('')
    const [loading, setLoading ] = useState<boolean>(false)
    let localData: string | null = localStorage.getItem('user')
    useEffect(()=>{
        setLoading(true)
        const localD:string | null = localStorage.getItem('user')
        if(localD){
            let controller = new AbortController();
            const db:DB = firebase.firestore()
            db.collection('users').doc(String(localData)).get().then((doc:any)=>{
            setUserInfo(doc.data().firstName+' '+doc.data().lastName)
            setLoading(false)
            }).catch(err=>console.log(err))
            return () => {
                controller.abort();
            };
        }
    },[localData])
    if( !localStorage.getItem('user')){
        return <div className="clearfix">
             <span className="float-right user-info">
                <code className='mt-0'>Korisnik nije ulogovan</code>
            </span>
        </div>
    }
    else if(loading){
        return <div className="clearfix">
            <span className="float-right user-info">
                <code className='mt-0'>-</code>
            </span>
        </div>
    }
    else {
        return (
            <div className="clearfix">
                <span className="float-right user-info">
                    <code className='mt-0'>{userInfo}</code>
                </span>
            </div>
        )
    }
}

export default UserInfo
