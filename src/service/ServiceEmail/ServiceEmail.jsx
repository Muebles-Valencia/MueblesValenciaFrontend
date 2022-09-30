import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'reactstrap';
import toast, { Toaster } from 'react-hot-toast';
import '../ServiceEmail/css/ServiceEmail.css'

export const ServiceEmail = ({ nameProduct ,nameProduct2 ,  descriptionProduct , priceProduct  , photoProduct,classN }) => {
    
    const [visible1, setVisible1] = useState(false)
    const [datePickup , setDatePickup] = useState("")

    function sendEmail() {
        console.log("ENTRO AL ENVIAR CORREO");
        const user = sessionStorage.getItem("usuario")
        const user2 = JSON.parse(user.toString());
        console.log(user2.nameU);
        console.log(user2.emailU);
        const URLEmail = "https://muebleriaback.herokuapp.com/producto/reservarProducto/" + user2.emailU + "/" + user2.nameU + "/" + datePickup
        let tokenUser = localStorage.getItem('user')
        console.log("TOKEN USER " + tokenUser);
        fetch(URLEmail, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Authorization" : "Bearer " + tokenUser     
            },
            body: JSON.stringify({        
                codigo_producto : 1,
                nombre_producto: nameProduct,
                descripcion_producto: descriptionProduct,
                precio_producto: priceProduct,
                cantidad_producto : 1,
                foto_producto:photoProduct,
                id_categoria : {
                    id_categoria : 1,
                    nombre_categoria : "Mueble"
                },
                nombre_proveedor_producto : "Jhon"
            })
        }) 
            .then(response => response)
            .then(json => {
                if(json.ok){
                    toast("Reserva exitosa",{className:'send-toast',position:'bottom-right',duration:'130'})
                }else{
                    toast("No se ha podido reservar el producto",{className:'send-toast',position:'bottom-right',duration:'130'})
                }
            })
    }

    const open = () => {
        if (visible1 == false) {
            setVisible1(true)
        } else {
            setVisible1(false)
        }
    }
    
    const header3 =  (
        
        <div className='div-login'>
            <h2 className='header-3'>Que dia puedas ir a ver el producto</h2>
        </div>
        
    )

    const catchDateBirthClient = (event) => {
        console.log(event.target.value);
        const fecha = new Date(event.target.value);
        const yearBirth = fecha.getFullYear();
        const monthBirth = fecha.getMonth() + 1;
        const dayBirth = fecha.getDate();
        const finalDateBirth = yearBirth + "-" + monthBirth + "-" + dayBirth
        setDatePickup(finalDateBirth)
    }
    
    return (
        <>
            <Button className={classN} onClick={() => open(open)}>Reservar</Button>
            <Dialog className='cuadro'  visible={visible1} style={{ width: '30%' , height: '30%'}}  onHide={open} header={header3}>
                <div className='reserve-date'>
                    <label>Ingrese la fecha</label>
                    <Calendar className='calendar-date' id="date" name="date" onChange={e => catchDateBirthClient(e)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                    <Button className='reserve-button' onClick={sendEmail}>Reservar</Button>
                    <Toaster toastOptions={{
                        className: 'k',
                        duration: '100'
                    }} />
                    </div>
            </Dialog>
        </>
  )
}