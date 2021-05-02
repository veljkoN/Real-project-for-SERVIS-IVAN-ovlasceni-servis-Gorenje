import React, { useState, useEffect } from 'react'
import {datumItem, showDateDepo} from '../utils/SetDate'
import firebase from '../db/config'
import {  Doc, SnSh } from '../Type_Interfaces/types'

const ResPage:React.FC<any> = ({data}) => {
    const [ numb, setNumb ] = useState<any>(1)
    useEffect(()=>{
        const db = firebase.firestore()
        return db.collection('resNumb').onSnapshot((snapshot:SnSh) =>{
            const newData:any = snapshot.docs.map((doc:Doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setNumb(newData)
            } 
        )
      },[])
    return (
        <div className='mt-5'>
            {data.showTemplate && <div id='depo-box'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div id='depo-header'>
                            <p>Naziv servisa: <b>S.T.Z.R. "IVAN"</b></p>
                            <p>Adresa: <b>Bulevar Kralja Aleksandra 460, 11050 Beograd</b></p>
                            <p>Telefon: <b>011/28 60 976, 011/343 66 11</b></p>
                        </div>
                        <p className='text-right'>Datum prijema: {showDateDepo(data.data.datum)}</p>
                        <h5>PRIJEMNICA APARATA U SERVIS BROJ {numb.length>0? numb[0].numb:''}/{datumItem.slice(8,10)}</h5>
                        <div>
                            <p style={{textDecoration:'underline'}}>Podaci o stranci:</p>
                            <p>Ime i prezime: <b>{data.data.stranka.ime}</b> </p>
                            <p>Adresa: <b>{data.data.stranka.adresa}</b> </p>
                            <p>Telefon: <b>{data.data.stranka.telefon}</b></p>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <p style={{textDecoration:'underline'}}>Podaci o primljenom aparatu/ima na popravku:</p>
                        <table className='table' id='tabela-depo'>
                            <thead>
                                <tr>
                                    <th>Redni br.</th>
                                    <th>Naziv aparata</th>
                                    <th>Model</th>
                                    <th>Art.Br.</th>
                                    <th>Serijski broj</th>
                                </tr>
                            </thead>
                            {data.data.aparat && data.data.aparat.map((item:any,index:number)=>(
                                <tbody  key={item.br*8}>
                                    <tr>
                                        <td>{item.br}</td>
                                        <td>{item.naziv}</td>
                                        <td>{item.model}</td>
                                        <td>{item.artBr}</td>
                                        <td>{item.serijskiBr}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Opis kvara:</b></td>
                                        <td className='text-left'  colSpan={4}>{item.opisKvara}</td>
                                    </tr>
                                </tbody>
                                ))
                                }
                        </table>
                    </div>
                    <div className='mt-3'>
                        <b>Preuzimanje aparata sa popravke vršite sa ovom prijemnicom</b>
                        <p className='mt-3'>1. Aparat će biti popravljen najkasnije do:</p>
                        <p>2. Popravljeni aparat trebate preuzeti najkasnije osam dana od dana navedenog za preuzimanje (tačka 1).</p>
                        <p>3. Ako popravljeni aparat ne preuzmete u roku od 45 dana od dana navedenog u tački 1, smatraćemo da ste od proizvoda odustali (ne želite ga nazad) i nemamo obavezu dalje ga čuvati.</p>
                        <p>4. Ako ne preuzmete aparat u roku od 45 dana od dana predviđenog za preuzimanje aparata sa popravke, aparat će biti predat na rešavanje sa ostalim izgrađenim delovima i aparatima na recikliranje i za njega nemate pravo bilo kakve novčane ili druge naknade.</p>
                        <p className='mt-3'>Stranka potpisom potvrđuje da je upoznata i da se slaže sa uslovima predaje aparata na popravku.</p>
                    </div>
                    <div className='mt-5' style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                        <div className='col-lg-5'>
                            <div >
                                <p>Aparat(e) primio:</p>
                                <span>{data.data.radnik}</span>
                                <div className='name-depo-box'>
                                    <p>(Ime i prezime) <span className='ml-3'>Potpis {    }1 Pečat</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-5'>
                            <div>
                                <p>Aparat(e) predao (stranka):</p>
                                <span>{data.data.stranka.ime}</span>
                                <div className='name-depo-box'>
                                    <p>(Ime i prezime) <span className='ml-3'>Potpis</span></p>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
            </div>}
        </div>
    )
}

export default ResPage
 