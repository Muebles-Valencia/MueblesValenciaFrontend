// import React, { useEffect, useState } from 'react'
// import { Carousel } from 'primereact/carousel';
// import { Button } from 'primereact/button';
// import { GetCards } from './GetCards';
// import { Modal } from './Modal';

import React,{useState,useEffect}from 'react'
import { Carousel } from 'primereact/carousel';
import {Button}from 'primereact/button'
import './styleCarouselPrime.css'
import { Modal } from './Modal';

export const CarouselPrime = () => {
    const [product, setProduct] = useState([])
    const getProducts = () => {
        const url = 'https://muebleriaback.herokuapp.com/proximos/listaProximos';
          fetch(url,{method: 'GET',
                headers: {
                "Content-type": "application/json",
                'Access-Control-Allow-Origin': '*'
          }})
            .then(response => response.json())
            .then(data =>{
                console.log("carol")
                data.forEach(element => {
                productTemplate(element)
                    
                });
                
             setProduct(data)
           
            } )
      }
    
      useEffect(() => {
          getProducts()
      }, [])
    
    

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    const productTemplate = (produ) => {
        return (
            <div className="product-item-c-prime">
                <div className="product-item-content2">
                    <div className="content-card-m">
                        <img src={produ.imagen_producto} className="img-cardGif"/>
                    </div>
                    <div>
                        <h2 className="mb-1">{produ.nombre_producto}</h2>
                        <h2 className="mt-0 m">${produ.precioProducto}</h2>
                        {/* <span className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span> */}
                        <div className="car-buttons mt-5">
                            {/* <Button icon="pi pi-search" className="p-button p-button-rounded mr-2" />
                            <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded mr-2" />
                            <Button icon="pi pi-cog" className="p-button-help p-button-rounded" /> */}
                            {/* <Modal url={produ.foto_producto}></Modal> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{width:'90%'}}> 
            <Carousel className='carouselP' autoplayInterval={3000}  value={product} header={<h1>Proximamente</h1>}   itemTemplate={productTemplate} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions}></Carousel>
        </div>
    )
}
