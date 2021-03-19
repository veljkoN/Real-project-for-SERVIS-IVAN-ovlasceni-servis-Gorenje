import React from 'react'
import ReactToExcel from 'react-html-table-to-excel'

const AllDataToExcel = (props) => {
    let { datum } = props
    return(
        <div>
            <ReactToExcel 
                type='button'
                className='btn btn-success'
                table='table-to-excel'
                filename={datum}
                sheet='document 1'
                buttonText='Izvezi sve podatke'
            />
        </div>
    )
}

export default AllDataToExcel