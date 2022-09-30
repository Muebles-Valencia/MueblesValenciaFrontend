import React from 'react'
import './ServiceInvoice.css'

export const ListInvoicesPerClient = ({codeInvoice}) => {
    let URLDownloadPDF = "https://muebleriaback.herokuapp.com/facturas/consultarFactura/" + codeInvoice;
    return (
        <button className='btnDownloadPDF'><a href={URLDownloadPDF}><i className='pi pi-file-pdf pdfDownload'></i></a></button>
    )
}
