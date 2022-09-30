import React from 'react'
import toast from 'react-hot-toast'
import './ServiceReserve.css'
export const Service_ChangeStateReserve = ({code , text}) => {
    
    const changeState = () => {
        let tokenAdmin = localStorage.getItem("admin")
        const url = 'http://localhost:8080/reserva/cambiarEstadoReserva/' + code;
        fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
                "Authorization" : "Bearer " + tokenAdmin
            }
        })
            .then(response => {
                if(response.ok){
                    toast("Estado cambiado exitosamente",{className:'send-toast',duration:'200',position:'bottom-left'})
                }
            })
            // .then(reserve => console.log(reserve))
    }

    return (
        <button onClick={changeState} className='btnChangeState'>{text}</button>
    )
}
