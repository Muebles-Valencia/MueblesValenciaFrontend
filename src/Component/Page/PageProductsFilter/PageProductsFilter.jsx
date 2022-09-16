import React,{useState , useEffect} from 'react'
import { RegistrarCarrito } from '../../../service/ServiceCarrito/RegistrarCarrito'
import { Service_ListProductFilter } from '../../../service/ServiceProduct/Service_ListProductFilter'
import { ServicioRegistrar_Favoritos } from '../../../service/ServicioFavoritos/ServicioRegistrar_Favoritos'
import { Modal } from '../../Layout/ContentPageMain/Modal'
import { HeaderHome } from '../../Layout/HeaderHome/HeaderHome'
import'./style.css'
import {GiPriceTag} from 'react-icons/gi'
export const    PageProductsFilter = () => {

  const [products, setProducts] = useState([])

  const filterPrice = () => {
    const urlFilter = "http://localhost:8080/producto/filtrar/" + localStorage.getItem("minimo") + "/" + localStorage.getItem("maximo")
    fetch(urlFilter, {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      },
    })
      .then(response => response.json())
      .then(prods => {
        console.log(prods);
        try {
          setProducts(prods)
        } catch (error) {
          console.log("entra al catch " + error);
          // document.getElementById("containerProd").classList.remove("hide")
          // document.getElementById("containerFilter").classList.add("hide")  
        }
      })
  }

  useEffect(() => {
    console.log("MINIMO " + localStorage.getItem("minimo"));
    filterPrice()
  }, [])
  
  return (
    <div>
      <div>
        <HeaderHome/>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <div className='conter_car' id='prodContainer'>  
        {
          products.map((item, index,) => (

            <div key={index} >
              {/* <div className='sud-content' > */}
              <div className='car2' style={{ position: 'relative' }}>
                <ServicioRegistrar_Favoritos codigoP={item.codigo_producto} nameP={item.nombre_producto} descripcionP={item.descripcion_producto} precioP={item.precio_producto} imagenP={item.foto_producto} classN="iconHeart" />
                <GiPriceTag className='etiqueta2'/>
                <div >

                  <img className='img-cardGif' src={item.foto_producto} alt="" />

                </div>

                <div>
                  <h2>{item.nombre_producto}</h2>
            
                </div>
                <hr />
                <div className='content-press'>
                  <h2 className='press'>${item.precio_producto}</h2>


                  <RegistrarCarrito codigoP={item.codigo_producto} nameP={item.nombre_producto} descripcionP={item.descripcion_producto} imagenP={item.foto_producto} precioP={item.precio_producto} />
                  
                </div>
                <div>
                  <Modal classN='botonFilter' url={item.foto_producto} name={item.nombre_producto} description={item.descripcion_producto} press={item.precio_producto} />
                </div>

              </div>

            </div>

            // </div>

          ))
        }
      </div>
    </div>
  )
}
