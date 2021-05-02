import React from 'react'
import useClipboard from "react-use-clipboard"

const EmailButtons = () => {
    const [ , setOk] = useClipboard   ('Dogovoreno, u subotu će biti poručeno za Vas, kontaktiraćemo Vas kada ga isporuče. Srdačan pozdrav,')
    const [ , setMoneyOk ] = useClipboard('Poštovani, Evidentirana je uplata na naš račun. Delovi će za Vas biti poručeni u subotu i obavestićemo Vas čim ih isporuče. Srdačan pozdrav,')
    const [ , setEmpty ] = useClipboard('Poštovani,nažalost deo koji tražite više nismo u mogućnosti da obezbedimo jer se ne proizvodi. Nemože se poručiti iz Velenja.Gorenje ne nudi adekvatnu alternativnu zamenu.Molimo da potražite u nekom od drugih Gorenje servisa ukoliko je ostalo na starim zalihama.Srdačan pozdrav,')
    return (
        <>
            <button type="button" onClick={setOk} id='emailOk' className="btn btn-danger"><i className='far fa-thumbs-up' style={{color:'whitesmoke',fontSize:'20px'}}></i></button>
            <button type="button" onClick={setEmpty} id='emailNo' className="btn btn-dark"><i className='fas fa-minus-square' style={{color:'whitesmoke',fontSize:'18px'}}></i></button>
            <button type="button" onClick={setMoneyOk} className="btn btn-success"><i className='fas fa-money-check-alt' style={{color:'whitesmoke',fontSize:'20px'}}></i></button>
        </>
    )
}

export default EmailButtons
