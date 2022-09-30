import React from 'react'
import { Button } from 'rsuite';
import {AiFillDelete} from 'react-icons/ai'
import './css/styleComing.css'
import toast from 'react-hot-toast';

export const ServiceDeleteComingSoon = ({cod}) => {
     
    function deleteComingSoon () {
        const urlRegister = 'https://muebleriaback.herokuapp.com/proximos/eliminarProximos/' + cod;
        fetch(urlRegister, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response =>{
                if(response.ok=='ok'){
                    toast("Eliminado corretamente",{className:'send-toast',position:'bottom-left',duration:'300'})
                }else{
                    toast("Seleccione un producto",{className:'send-toast',position:'bottom-left',duration:'300'})
                }
               
            })
            
     }
  return (
   <Button className='button-book'  cod onClick={deleteComingSoon}><div className='div-enter-button-table'><AiFillDelete className='Book' />Eliminar</div></Button>
  )
}
