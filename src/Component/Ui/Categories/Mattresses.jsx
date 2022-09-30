import React,{useState,useEffect} from 'react'
import { RegistrarCarrito } from '../../../service/ServiceCarrito/RegistrarCarrito'
import { ServicioRegistrar_Favoritos } from '../../../service/ServicioFavoritos/ServicioRegistrar_Favoritos'
import { Modal } from '../../Layout/ContentPageMain/Modal'
import { HeaderHome } from '../../Layout/HeaderHome/HeaderHome'
import "./style.css"
import { GiPriceTag } from 'react-icons/gi'
export const Mattresses = () => {
    
    const [products , setProducts] = useState([])

    const getCategory = () => {
        const urlSearch = "https://muebleriaback.herokuapp.com/categorias/buscarCategoria/" + 4
        fetch(urlSearch, {
          method: 'GET',
          headers: {
            "Content-type": "application/json"
        },
        })
        .then(response => response.json())
        .then(prods => {
          setProducts(prods)
          console.log("PROD EN GET CATEGORY " + prods);
        })
    }

    useEffect(() => {
        console.log("USE EFFECT EN CATEGORIES ");
      getCategory()
    }, [])
    
    return (
        <div className='conter_car c' id='prodContainer'>
            <HeaderHome/>
            <div className='space'>

            </div>
            {
                products.map((item, index,) => (
                    
                    <div key={index} >
                        {/* <div className='sud-content' > */}
                        <div className='car-product' style={{ position: 'relative' }}>
                           
                            <div style={{ position: 'relative' }} className='content-card-m' >
                            <ServicioRegistrar_Favoritos classN='heart' codigoP={item.codigo_producto} nameP={item.nombre_producto} descripcionP={item.descripcion_producto} precioP={item.precio_producto} imagenP={item.foto_producto} />
                            <GiPriceTag className='etiqueta' />

                                <img className='img-cardGif' src={item.foto_producto} alt="" />
                                <div >
                                    <Modal classN='observar-m' url={item.foto_producto} name={item.nombre_producto} description={item.descripcion_producto} press={item.precio_producto} />
                                </div>
                            </div>

                            <div>
                                <h2  className='card-name-img'>{item.nombre_producto}</h2>
                            </div>
                          
                            <div className='content-press'>
                                <h2 className='press'>${item.precio_producto}</h2>

                                
                                <RegistrarCarrito  codigoP={item.codigo_producto} nameP={item.nombre_producto} descripcionP={item.descripcion_producto} imagenP={item.foto_producto} precioP={item.precio_producto}/>

                            </div>
                           
                           


                        </div>

                    </div>

                    // </div>
                    
                ))
            }
       
        </div>
    )
}
