import React from 'react'

const ComandDescription = () => {
    return (
        <React.Fragment>
            <div className='col-md-3 ml-5 mt-2 sifre-pr'>
                <div className="alert alert-info">
                    Primeri šifara: 477575, 685556, 390002, 999482, 232118
                </div>
            </div>
            <div className='col-md-12'></div>
            <div className='col-md-3 ml-5 list-desc'>
                <div className="alert alert-info">
                    <span className='text-u'>Komande (Keyboard Events)</span><br/>
                    <strong>Enter</strong>  dodavanje novog artikla<br/>
                    <strong>Esc</strong> brisanje svih izabranih artikala <br/>
                    <strong>+</strong>  povećava količinu za jedan <br/>
                    <strong>-</strong>  smanuje količinu za jedan <br/>
                    <span className='text-u'>Oznaka artikla</span><br/>
                    <i className="fa fa-dot-circle-o markItem"  style={{color:'coral',fontSize:'12px'}}></i> <span className='des-span-btn1'>Izabrani artikal je na stanju</span><br/>
                    <i className="fa fa-remove markItem text-dark"></i> <span className='des-span-btn'>Izabrani artikal nije na stanju</span><br/>
                    <span className='text-u'>Modal za odabrane artikle</span><br/>
                    <i className="material-icons comand-desc" >email</i> <span style={{position:'relative',bottom:'4px'}}> Tekst - Na stanju/Nije na stanju</span><br/>
                    <i className="far fa-plus-square comand-desc text-success"></i>
                    <i className="far fa-plus-square ml-1 comand-desc text-success" ></i> <span className='des-span-btn'>Svi izabrani artikli su na stanju </span><br/>
                    <i className="far fa-plus-square comand-desc text-success"></i>
                    <i className="far fa-minus-square ml-1 comand-desc text-danger" ></i> <span className='des-span-btn'>Bar jedan artikal nije na stanju </span> <br/>
                    <i className="far fa-minus-square comand-desc text-danger"></i>
                    <i className="far fa-minus-square ml-1 comand-desc text-danger"></i> <span className='des-span-btn'>Nijedan artikal nije na stanju </span><br/>
                    <span className='text-u'>Copy to clipboard </span> <br/>
                    <i className='far fa-thumbs-up comand-desc'></i> <span className='des-span-btn1'>OK (dogoverena porudžbina)</span><br/>
                    <i className='fas fa-minus-square comand-desc'></i>  <span className='des-span-btn'>Deo se više ne proizvodi</span><br/>
                    <i className='fas fa-money-check-alt' style={{fontSize:'15px'}}></i> <span className='des-span-btn1'>Uspešna trasnakcija</span><br/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ComandDescription
