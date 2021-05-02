import React, { useEffect, useState } from 'react'
import numberWithCommas from '../utils/setNumber'

const ModalEmail:React.FC<any> = ({items}) => {
    const [ filDataTrue, setFilDataTrue ] = useState<any>([])
    const [ filDataFalse, setFilDataFalse ] = useState<any>([])
    useEffect(()=>{
        let tempTrue:any = []
        let tempFalse:any = []
        items.forEach((data:any)=>{
            if(data.naStanju===true){
                tempTrue.push(data)
            }
            else{
                tempFalse.push(data)
            }
        })
        setFilDataTrue(tempTrue)
        setFilDataFalse(tempFalse)
    },[items])
    return (
        <div className="container">
            <div className="modal fade" id="ModalEmail">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <>
                                {items.length>0 && filDataFalse.length===0 && <div className="card">
                                    <div className="card-header">
                                        <i className="far fa-plus-square" style={{fontSize:"36px",color:"green"}}></i>
                                        <i className="far fa-plus-square ml-3" style={{fontSize:"36px",color:"green"}}></i>
                                    </div>
                                    <div >
                                        <div className="card-body">
                                            <p> Poštovani, {items.length>1?'delove':'deo'}  koji tražite imamo u prodaji. Možete {items.length>1?'ih':'ga'} kupiti u Bulevaru kralja Aleksandra 460 radim danom od 08-17h i subotom od 08-15h, ili se može poslati kurirskom službom.</p>
                                        {items.length>0 && <table className='table mt-3' >
                                            <thead>
                                                <tr>
                                                    <th>Šifra</th>
                                                    <th>Naziv</th>
                                                    <th>Cena</th>
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
                                                
                                                <td className="table-success">
                                                    {`${numberWithCommas(item.MCena)} dinara`}
                                                </td>
                                            </tr>
                                            ))}
                                            </tbody> 
                                        </table>}
                                        <p>Srdačan pozdrav</p>
                                        </div>
                                    </div>
                                </div>}
                                {filDataTrue.length>0 && filDataFalse.length>0 && <div className="card">
                                    <div className="card-header">
                                        <i className="far fa-plus-square" style={{fontSize:"36px",color:"green"}}></i>
                                        <i className="far fa-minus-square ml-3" style={{fontSize:"36px",color:"red"}}></i>
                                    </div>
                                    <div>
                                        <div className="card-body">
                                        <b>Na stanju</b>
                                        <p>Poštovani, {filDataTrue.length>1? 'delove':'deo'} koji tražite imamo u prodaji. 
                                         Možete {filDataTrue.length>1?'ih':'ga'} kupiti u Bulevaru kralja Aleksandra 460 radim danom od 08-17h i subotom od 08-15h,
                                         ili se može poslati kurirskom službom.</p>
                                                {filDataTrue.length>0 && <table className='table mt-3' >
                                            <thead>
                                                <tr>
                                                    <th>Šifra</th>
                                                    <th>Naziv</th>
                                                    <th>Cena</th>
                                                </tr>
                                            </thead>
                                            <tbody tabIndex={0}>
                                            {filDataTrue && filDataTrue.map((item:any)=>(
                                                <tr key={item.id} >
                                                <td>
                                                    <b>{item.Materijal}</b>
                                                </td>
                                                <td>
                                                    {item.Naziv}
                                                </td>
                                                <td className="table-success">
                                                    {`${numberWithCommas(item.MCena)} dinara`}
                                                </td>
                                            </tr>
                                            ))}
                                            </tbody> 
                                        </table>}
                                        <hr/>
                                        <b>Trenutno nije na stanju</b>
                                        <p>
                                            Nažalost, {filDataFalse.length>1? 'delove':'deo'} koji tražite nemamo u prodaji, pa bi se {filDataFalse.length>1? 'morali':'morao'} poručiti iz Velenja. 
                                            Svake se subote poručuje roba a rok za isporuku je okvirno 2-3 sedmice od datuma poručivanja. Možete nam se do subote javiti ukoliko budete želeli da deo poručimo za Vas. 
                                        </p>
                                        {filDataFalse.length>0 && <table className='table mt-3' >
                                            <thead>
                                                <tr>
                                                    <th>Šifra</th>
                                                    <th>Naziv</th>
                                                    <th>Cena</th>
                                                </tr>
                                            </thead>
                                            <tbody tabIndex={0}>
                                            {filDataFalse && filDataFalse.map((item:any)=>(
                                                <tr key={item.id} >
                                                <td>
                                                    <b>{item.Materijal}</b>
                                                </td>
                                                <td>
                                                    {item.Naziv}
                                                </td>
                                                <td className="table-danger">
                                                    {`${numberWithCommas(item.MCena)} dinara`}
                                                </td>
                                            </tr>
                                            ))}
                                            </tbody> 
                                        </table>}
                                        <p> Srdačan pozdrav</p>
                                        </div>
                                    </div>
                                </div>}
                                {filDataTrue.length===0 && filDataFalse.length>0 && <div className="card">
                                    <div className="card-header">
                                        <i className="far fa-minus-square" style={{fontSize:"36px",color:"red"}}></i>
                                        <i className="far fa-minus-square ml-3" style={{fontSize:"36px",color:"red"}}></i>
                                    </div>
                                    <div >
                                        <div className="card-body">
                                            <p>Poštovani,
                                                Nažalost {filDataFalse.length>1? 'delove':'deo'} koji tražite nemamo u prodaji, pa bi se {filDataFalse.length>1? 'morali':'morao'} poručiti iz Velenja. 
                                                Svake se subote poručuje roba a rok za isporuku je okvirno 2-3 sedmice od datuma poručivanja. Možete nam se do subote javiti ukoliko budete želeli da deo poručimo za Vas. 
                                            </p>
                                        {filDataFalse.length>0 && <table className='table mt-3' >
                                            <thead>
                                                <tr>
                                                    <th>Šifra</th>
                                                    <th>Naziv</th>
                                                    <th>Cena</th>
                                                </tr>
                                            </thead>
                                            <tbody tabIndex={0}>
                                            {filDataFalse && filDataFalse.map((item:any)=>(
                                                <tr key={item.id} >
                                                <td>
                                                    <b>{item.Materijal}</b>
                                                </td>
                                                <td>
                                                    {item.Naziv}
                                                </td>
                                                
                                                <td className="table-danger">
                                                    {`${numberWithCommas(item.MCena)} dinara`}
                                                </td>
                                            </tr>
                                            ))}
                                            </tbody> 
                                        </table>}
                                        <p>Srdačan pozdrav</p>
                                        </div>
                                    </div>
                                </div>}
                                </>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEmail

