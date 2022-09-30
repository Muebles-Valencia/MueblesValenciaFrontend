import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
// import React, { useEffect, useState } from 'react'
// import { ContentShoppingCart } from '../../Component/Layout/ShoppingCart/ContentShoppingCart'
import '../ServicioFavoritos/css/style.css'
import { ServicioList_Favorites } from './ServicioList_Favorites'
import { ConterFavorites } from '../../Component/Layout/Favorites/ConterFavorites'
import { ContentPageMain } from '../../Component/Layout/ContentPageMain/ContentPageMain'
// import { GetFavoritos } from '../../Component/Layout/Favorites/GetFavoritos'
import { Toaster, toast } from 'react-hot-toast';
import { green } from '@material-ui/core/colors'
export const ServicioRegistrar_Favoritos = ({ codigoF, nameP = '', descripcionP = '', precioP = 0, imagenP, id, classN }) => {

    const [favorites, setFavorites] = useState(false)

    function saveFavorite() {
        
        let cantidad = 1
        console.log(codigoF, nameP, descripcionP, precioP, imagenP)
        const url = 'https://muebleriaback.herokuapp.com/favoritos'
        let tokenAdmin = localStorage.getItem('user')
        if (tokenAdmin == "" || tokenAdmin == null) {
            alert("Por favor registrese")
        } else {

            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization" : "Bearer " + tokenAdmin
                },
                body: JSON.stringify({
                    codigo: codigoF,
                    nombreProducto: nameP,
                    descripcionProducto: descripcionP,
                    imagenProducto: imagenP,
                    cantidadCart: cantidad,
                    precioProducto: precioP,
                    precioTotal: precioP * cantidad,

                })
            })
                .then(response => {
                    if (response.status == 201) {
                        setFavorites(true)
                        toast('Nuevo Favorito', {
                            position:'bottom-right',
                            className: 'send-toast',
                            duration: '220'
                        })
                    }
                })
                .then(data => data)

        }}

        useEffect(() => {

        }, [favorites])

        // //esta funcion le llega por parametro el tiempo de espera
        // function timeout(ms) { 
        //     return new Promise((resolve) => setTimeout(resolve, ms));
        // }

        // //esta funcion nos permite actualizar el carrito 
        // const re=async()=>{
        //     setVisible2(false)
        //     await timeout(400)//se le envia por parametro los el tiempo que se requier

        //     if(visible==false){
        //         setVisible2(true)
        //     }
        // }


        return (
            <  >
                <button onClick={(e) => saveFavorite()} className={classN}><i id={id} className='pi pi-heart  heart-icon'></i></button>
            </>

        )
    }


