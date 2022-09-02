import React, { useState, useEffect } from 'react';
import '../../Component/Layout/DataTableTemplatingDemo/DataTableDemo.css'
import { Modal } from '../../Component/Layout/ContentPageMain/Modal'
import { Service_ListReservesClient } from './Service_ListReservesClient';

import { PageReservesExpired } from '../../Component/Page/PageReservesExpired/PageReservesExpired';
import { Link } from 'react-router-dom';

export const Service_ReserveExpired = () => {
    
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [reserves , setReserves] = useState([])
    let [selectedReserve, setReserveSelected] = useState(null);
    
    useEffect(() => {
        getReserves()
      }, [])

    const getReserves = () => {
        let tokenUser = localStorage.getItem("user")
        const user = sessionStorage.getItem("usuario")
        const user2 = JSON.parse(user.toString());
        console.log("CEDULA " +user2.idU);
        const url = 'http://localhost:8080/reserva/reservasExpiradasCliente/' + user2.idU;
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization" : "Bearer " + tokenUser
            }
        })
            .then(response => response.json())
            .then(provider => setReserves(provider))
            console.log("RESERVAS " + reserves);
    }

    useEffect(() => {
      getReserves()
    }, [])
    
    return (
        <>
         <HeaderHome/>
        <div className='conter_car' id='conter_car'>
        {
            reserves.map((item, index,) => (

                <div >


                    <div className='car-product' style={{ position: 'relative' }}>

                        <div style={{ position: 'relative' }} className='content-card-m'>
                            <img className='img-cardGif' src={item.foto_producto_reserva} alt="" />
                            <div >
                                <Modal classN='observar-m' url={item.foto_producto_reserva} name={item.fecha_creacion_reserva} description={item.fecha_recoger_reserva} press={item.estado_reserva} />
                            </div>
                        </div>

                        <div>
                            <h2 className='card-name-img'>{item.nombre_cliente_reserva}</h2>
                        </div>

                        <div className='content-press'>
                            <h2 className='press'>{item.estado_reserva}</h2>
                         </div>
                    </div>
                    <div style={{width:'100%'}}>
                    <PageReservesExpired text="Ir a reservas pendientes" direction="/listReservesClient"/>
                    </div>
            
                </div>

                // </div>

            ))
        }
    </div>
    </>
    )
}
