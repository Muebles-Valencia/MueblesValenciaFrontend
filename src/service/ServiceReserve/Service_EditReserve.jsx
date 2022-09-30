import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioGroup } from 'rsuite';
import { InputNumber } from 'primereact/inputnumber';
import { FaUserEdit } from 'react-icons/fa'
import '../ServiceProduct/css/registerProduct.css'
import toast from 'react-hot-toast';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export const Service_EditReserve = ({ codeReserve }) => {

    const [visible, setVisible] = useState(false);
    const [image, setImageProduct] = useState("");
    const [loading, setLoading] = useState(true);
    const [name_supplier_product, setNameSupplierProduct] = useState("")
    const [codeR, setCodeReserve] = useState(0)
    const [reserve, setReserve] = useState("")
    const [dateReserve, setDateReserve] = useState("")

    function searchReserve() {
        const urlRegister = 'https://muebleriaback.herokuapp.com/reserva/buscarReservaIndividual/' + codeReserve;
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(reserveReturn => saveReserve(reserveReturn))
        setLoading(false)
    }

    const saveReserve = (reserv) => {
        setReserve(reserv)
        setCodeReserve(reserv.codigo_reserva)
        setDateReserve(reserv.fecha_creacion_reserva)
        setImageProduct(reserv.foto_producto_reserva)
    }

    const seew = () => {

        if (visible == false) {
            searchReserve()
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    function editReserve() {
        console.log("estoy editando una reserva")
        const idClientReserve = document.getElementById("inputId").value
        const nameClientReserve = document.getElementById("inputName").value
        const datePickupReserve = document.getElementById("inputPickup").value
        console.log(nameClientReserve);
        const urlRegister = 'https://muebleriaback.herokuapp.com/reserva/editarReserva/' + codeReserve;
        fetch(urlRegister, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                codigo_reserva: codeR,
                cedula_cliente_reserva: idClientReserve,
                fecha_creacion_reserva: dateReserve,
                fecha_recoger_reserva: datePickupReserve,
                foto_producto_reserva: image,
                nombre_cliente_reserva: nameClientReserve,
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.ok) {
                    toast("Actualizacion Exitosa", { className: 'send-toast' })
                } else {
                    toast("Actualizacion Exitosa", { className: 'send-toast' })
                }
            })
    }

    const header = (
        <div className='div-update'>
            Editar Reserva
        </div>
    )
    /*<div id='dataProductsContainer' className='dataProductsContainer'></div>
    <div className='barra-desplegable'>
    */
    return (
        <>
            <Button className='button-book' onClick={() => seew(seew)}><FaUserEdit className='Book' /></Button>
            <Dialog header={header} visible={visible} modal onHide={seew} style={{ width: '30em', bordeRadius: '100%' }} className='dialogoRegisterProduct' >
                <div className='content-image'>

                    <div className='cont-Register-product-2'>

                        <div className='form2'>
                            <InputText id='inputName' type='text' className='input-update' placeholder={reserve.nombre_cliente_reserva} />
                            <InputText id='inputId' type='' placeholder={reserve.cedula_cliente_reserva} />
                            <InputText id='inputPickup' type='date' className='input-update' />

                            <div className='save-edit'>
                                <Button onClick={editReserve} >Guardar</Button>
                            </div>
                        </div>


                    </div>

                    <div className='content-img-download-input'>
                    <div className='content-imag-2'>
                        {loading ? <AiOutlineLoading3Quarters className='loadig' /> : (<img className='img-product-download' src={image} />)}
                    </div>
                    </div>

                    
                </div>

            </Dialog>
        </>
    )
}
