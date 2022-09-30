import React, { useEffect, useState } from 'react'
import { Modal } from '../../Component/Layout/ContentPageMain/Modal'
import { GetFavoritos } from '../../Component/Layout/Favorites/GetFavoritos'
import { RegistrarCarrito } from '../ServiceCarrito/RegistrarCarrito'
import { ServiceEmail } from '../ServiceEmail/ServiceEmail'
import { ServicieDelete_Favorite } from './ServicieDelete_Favorite'
import { GiPriceTag } from 'react-icons/gi'
import { FooterMain } from '../../Component/Ui/FooterMain/FooterMain'

export const ServicioList_Favorites = ({ accion }) => {


    const [favorites, setFavorites] = useState([])
    const [fa, setFa] = useState(false)

    const getFavorites = () => {

        const url = 'https://muebleriaback.herokuapp.com/favoritos/listfavoritos';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("guardado")
                console.log(data)
                setFavorites(data)
                //  m.lista.push(data)
            })

    }

    useEffect(() => {
        getFavorites()

        console.log(accion)
    }, [fa])


    return (
        <>
        {/* //    <GetFavoritos listFavorites={favorites} /> */}
            <div className='conter_car-favorite' >
                {
                    favorites.map((item, index) => (

                        <div>

                            <div id={item.codigo} className='car-product-favorite' style={{ position: 'relative' }}>


                                <ServicieDelete_Favorite className='delete-favoritos' codigo={item.codigo} />
                                <div style={{ position: 'relative' }} className='content-card-m-favorite'>
                                    <GiPriceTag className='etiqueta' />
                                    <img className='img-cardGif' src={item.imagenProducto} alt="" />
                                    <div id='propiedad' >
                                        <Modal classN='observar-m-favorite' url={item.imagenProducto} name={item.nombreProducto} description={item.descripcionProducto} press={item.precioProducto} />
                                    </div>

                                </div>




                                <div>
                                    <h2 className='card-name-img'>{item.nombreProducto}</h2>
                                </div>

                                <div className='content-press'>
                                    <h2 className='press'>${item.precioProducto}</h2>
                                    <RegistrarCarrito codigoP={item.codigo} nameP={item.nombreProducto} descripcionP={item.descripcionProducto} imagenP={item.imagenProducto} precioP={item.precioProducto} />
                                </div>


                                <div style={{ width: '100%' }}>
                                <ServiceEmail classN='reservar' nameProduct={item.nombreProducto} descriptionProduct={item.descripcionProducto} photoProduct={item.imagenProducto} priceProduct={item.precioProducto} />
                            </div>
                            </div>
                          


                        </div>
                    ))
                }


            </div>
                <br/><br/><br/><br/><br/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FooterMain></FooterMain>
            </div>
        </>
    )
}

