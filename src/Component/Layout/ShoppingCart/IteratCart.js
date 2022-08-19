import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'
import { count } from 'rsuite/esm/utils/ReactChildren';
import { ServicieDeleteCart } from '../../../service/ServiceCarrito/ServicieDeleteCart'
import './style.css'
export const IteratCart = ({ listsCart = [], conut }) => {

   
    let guardar=[]
    let t = 0;
   
    useEffect(() => {
        document.getElementById('cantidad').innerHTML = conut
    }, [conut])
   
    const operation=(event,press)=>{
        console.log(event.target.value)
        
        document.getElementById("oper").innerHTML=press*event.target.value
       
    }
    return (
        <div className='sectionCart'  >
            <div>


                {
                    listsCart.length > 0 ?
                        listsCart.map((item) => (
                            <div key={item.codigo_Carrito} id={item.codigo_Carrito} >
                                <div className='card-cart' >
                                    <img src={item.imagen_producto} alt="" className='img-cart' id='h2' />
                                    <div className='content-cart-nameProduct' id='h3'>
                                        <h2 id='padre'>{item.nombre__producto}</h2>
                                        <h4 id='precio'>${item.precio_total}</h4>
                                        {/* <h2 id={item.}></h2> */}
                                        <select onChange={e=>operation(e,item.precio_total)}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option>4</option>
                                        </select>
                                    </div>
                                    <div className='content-delete-cart' id='h6'>
                                        <ServicieDeleteCart codigo={item.codigo_Carrito} press={item.precio_total}/>
                                        {

                                            guardar.push(item.precio_total)
                                        }
                                    </div>
                                </div>
                                <hr />

                            </div>
                        ))
                        :
                        <div className='Cart-empty'><i className='ca pi pi-shopping-cart' style={{ fontSize: '100px' }}></i><h5>SU CARRITO ESTA VACIO</h5></div>
                }

                {
                    guardar.forEach(total => {
                        console.log("total de compra" + `${t += total}`)
                    })}
            </div>
            {

                t > 0 ?
                    <div className='Total-press'>
                        <div className='section-operation' >
                            <p >TOTAL DE COMPRA</p>
                            <p className='item-total' id='press'>{t}</p>
                        </div>

                        <Button>FINALIZAR COMPRA</Button>

                    </div>
                    :
                    <div> </div>
            }

        </div>
    )
}