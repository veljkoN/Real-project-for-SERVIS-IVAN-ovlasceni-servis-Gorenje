import React, { useEffect, useState } from 'react'
import { obj } from '../Type_Interfaces/types'
import {  showDate } from '../utils/SetDate'

const ModalCheck:React.FC<any> = ({data}) => {
    const [ checkedData, setCheckedData ] = useState<obj[]>([])
    useEffect(()=>{
        const newData = data.filter((item:any)=>{
            return item.poruceno===true
        })
        setCheckedData(newData)
    },[data])
    return (
        <div className="modal fade" id="myModal">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Svi podaci sa statusom <b>Poručeno</b></h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                    <table className='table table-bordered table-responsive table-hover tableFixHead mt-1' id='table-to-excel'>
                        <thead>
                            <tr>
                                <th>Šifra</th>
                                <th>Naziv</th>
                                <th>Količina</th>
                                <th>Broj interne narudžbe</th>
                                <th>Broj SAG narudžbe</th>
                                <th>Datum</th>
                            </tr>
                        </thead>
                        <tbody>
                        {checkedData && checkedData.map((item:any)=>(
                            <tr key={item.id}>
                                <td data-toggle="modal" data-target="#myModal">
                                <b> {item.sifra} </b>
                                </td>
                                <td data-toggle="modal" data-target="#myModal">
                                    {item.naziv}
                                </td> 
                                <td  data-toggle="modal" data-target="#myModal">
                                    {item.kolicina}
                                </td>
                                <td data-toggle="modal" data-target="#myModal">
                                    {item.brojInterneNarudzbe}
                                </td>
                                <td data-toggle="modal" data-target="#myModal">
                                {item.sag}
                                </td>
                                <td>
                                    {showDate(item.datum)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCheck