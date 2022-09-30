
// import { set } from 'date-fns';
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState, useEffect } from 'react'
import { ServicieRegisterInventario } from './ServicieRegisterInvetario';
import { GiArchiveRegister } from 'react-icons/gi'
import './css/styleComing.css'
export const ServicieArriveProduct = ({ cod }) => {


    const [productSearch, setProducts] = useState(null);
    const [visible, setVisible] = useState(false);
    const [esta, setEsta] = useState(false);

    // const [image, setImageProduct] = useState("");
    // const [loading, setLoading] = useState(true);
    // const [name_supplier_product, setNameSupplierProduct] = useState("")
    // const [code , setCodeProduct] = useState(0)
    // const [idCategory , setIdCategory] = useState(0)
    // const [nameCategory , setNameCategory] = useState("")
    // const [product, setProductos] = useState("")

    function searchProduct() {
        const urlRegister = 'https://muebleriaback.herokuapp.com/proximos/buscar/' + cod;
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(product => {
                if (product != null) {
                    setProducts(product)
                    setEsta(true)
                }

                console.log(product)
            })
        // setLoading(false)
    }

    const seew = () => {

        if (visible == false) {
            searchProduct()
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    return (
        <div>
            <Button className={'button-book'} onClick={() => seew(seew)}><div className='div-enter-button-table'><GiArchiveRegister className='Book'  />Registrar</div></Button>
            <Dialog visible={visible} modal onHide={seew} style={{ width: '30em', bordeRadius: '100%' }} className='dialogoRegisterProduct' >
                {esta == true ?
                    <div className='dialog-ArriveProduct'>
                        <br></br>
                        <h2>Dale click en el botón de abajo para enviar el producto al inventario</h2>
                        <br></br>
                        <h2>Producto Seleccionado: </h2>
                        <br></br>
                        <div style={{ display: 'flex'}} >
                            <div style={{width:'57%' }}>
                                <div style={{ display: 'flex', gap: '22px' }}>
                                    <h4>codigo: </h4>
                                    <h4>{cod}</h4>
                                </div>
                                <div style={{ display: 'flex', gap: '22px' }}>
                                    <h4>Nombre: </h4>
                                    <h4>{productSearch.nombre_producto}</h4>
                                </div>
                                <div style={{ display: 'flex', gap: '22px', width: '90%' }}>
                                    <h4>descripcion: </h4>
                                    <h4>{productSearch.descripcion}</h4>
                                </div>
                            </div>
                            {productSearch.imagen_producto!=null ?
                            <div className='img-productSearch'>
                                 <img src={productSearch.imagen_producto} style={{width:'100%',height:'100%'}}></img>
                            </div>
                            :
                            <div className='img-productSearch2'>
                                
                            </div>
                            }
                        
                        </div>


                        {productSearch.nombre_producto != null ? <p></p> : <p>Noy hay datos</p>}
                        <ServicieRegisterInventario code={productSearch.codigo} nameP={productSearch.nombre_producto} descriptionP={productSearch.descripcion} imgP={productSearch.imagen_producto} price={productSearch.precioProducto} category={productSearch.id_categoria}></ServicieRegisterInventario>
                    </div>
                    :
                    <div>

                    </div>
                }
            </Dialog>
        </div>
    )
}
