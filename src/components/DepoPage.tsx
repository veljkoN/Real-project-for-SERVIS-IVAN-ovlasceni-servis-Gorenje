import React, { useEffect } from 'react'
import numberWithCommas from '../utils/setNumber'
import {datumItem, showDateDepo} from '../utils/SetDate'

const DepoPage:React.FC<any> = ({data}) => {
    useEffect(()=>{
        if(!localStorage.getItem('numb')){
            localStorage.setItem('numb','1')
        }
      },[])
    return (
        <div className='mt-5'>
            {data.showTemplate && <div id='depo-box'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div id='depo-header'>
                            <p>Naziv servisa: <b>S.T.Z.R. "IVAN"</b></p>
                            <p>Adresa: <b>Bulevar Kralja Aleksandra 460, 11050 Beograd</b></p>
                            <p>Telefon: <b>011/28 60 976</b></p>
                        </div>
                        <p className='text-right'>Datum: {showDateDepo(data.data.datum)}</p>
                        <h5>OTPREMNICA BROJ:  {data.data.brojOtpremnice===undefined || data.data.brojOtpremnice===null ?  (`1/${datumItem.slice(8,10)}`):(`${data.data.brojOtpremnice}/${datumItem.slice(8,10)}`)}</h5>
                        <div>
                            <p style={{textDecoration:'underline'}}>Podaci o stranci:</p>
                            <p>Ime i prezime: <b>{data.data.stranka.ime}</b> </p>
                            <p>Telefon: <b>{data.data.stranka.telefon}</b></p>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <p style={{textDecoration:'underline'}}>Podaci o aparatu:</p>
                        <table className='table bordered' id='tabela-depo'>
                            <thead>
                                <tr>
                                    <th>Redni br.</th>
                                    <th>Naziv aparata</th>
                                    <th>Model</th>
                                    <th>Art.Br.</th>
                                    <th>Deo za poručivanje</th>
                                </tr>
                                {
                                    data.data.aparat && data.data.aparat.map((item:any)=>(
                                <tr key={item.br}>
                                    <td>{item.br}</td>
                                    <td>{item.naziv}</td>
                                    <td>{item.model}</td>
                                    <td>{item.artBr}</td>
                                    <td>{item.deo}</td>
                                </tr>
                                    ))
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><b>Depozit:</b></td>
                                    <td><b>{numberWithCommas(data.data.depozit)} dinara</b></td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                        <div className='col-lg-5'>
                            <div>
                                <p>Depozit primio:</p>
                                <span>{data.data.radnik}</span>
                                <div className='name-depo-box'>
                                    <p>(Ime i prezime) <span className='ml-3'>Potpis {    }1 Pečat</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-5'>
                            <div>
                                <p>Depozit predao (stranka):</p>
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

export default DepoPage
