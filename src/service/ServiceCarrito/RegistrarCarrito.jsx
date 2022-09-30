// import { act } from '@testing-library/react'
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { ContentShoppingCart } from '../../Component/Layout/ShoppingCart/ContentShoppingCart'

export const RegistrarCarrito = ({ codigoP ,nameP = '', descripcionP = '', precioP = 0, imagenP ,text=<i className='pi pi-shopping-cart cart-shopping' cantidad></i>,classN='button-cart-register'} ) => {//le damos como propiedades al componente Para capturar su valor y registar 
                                                                                                        //en la Carpeta(GetCart)
    const [visible2, setVisible2] = useState(false)
    const [visible, setVisible] = useState(false)
    const product1 = {
        codigo_producto : codigoP,
        nombre__producto : nameP,
        descripcion_producto : descripcionP,
        precio_producto : precioP,
        imagen_producto : imagenP
    }
    const productsList = []
    localStorage.setItem("listaProduct" , productsList)
    function saveCart() {
        console.log("hholaflfafafafafa")
        let cantidad=1
        const url = 'https://muebleriaback.herokuapp.com/carritoCompras'
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                codigo_Carrito: codigoP,
                nombre__producto: nameP,
                descripcion_producto: descripcionP,
                imagen_producto: imagenP,
                cantidad_cart:cantidad,
                precio_producto:precioP,
                precio_total:precioP*cantidad,
                
            })
        })
            .then(response =>{
                if(response.status==201){
                    setVisible2(true)
                    productsList.push(product1)
                }

            })
    }

    //esta funcion le llega por parametro el tiempo de espera
    function timeout(ms) { 
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    
    //esta funcion nos permite actualizar el carrito 
    const re=async()=>{
        setVisible2(false)
        await timeout(400)//se le envia por parametro los el tiempo que se requier

        if(visible==false){
            setVisible2(true)
        }
    }

    
    return (
        <>
            <Button onClick={(e)=>saveCart()}codigoP namePb descripcionP precioP imagenP  press className={classN}>{text}</Button>
            <ContentShoppingCart visible2={visible2} onHide={() => { setVisible2(false) }}   onClick={re}/>
        </>

    )
}
