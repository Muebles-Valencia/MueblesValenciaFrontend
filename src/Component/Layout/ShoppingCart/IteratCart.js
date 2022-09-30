import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'
import { count } from 'rsuite/esm/utils/ReactChildren';
import { ServicieDeleteCart } from '../../../service/ServiceCarrito/ServicieDeleteCart'
import { ContentShoppingCart } from './ContentShoppingCart';
// import { Toast } from 'primereact/toast';
import { Toaster, toast } from 'react-hot-toast';


import './style.css'
// import { classNames } from 'primereact/utils';


export const IteratCart = ({ listsCart = [], conut }) => {//resive como parametro una lista y una cantidad(de productos que llevan en el carriro de compras)

    let carrito = []
    const peticion = () => {
    const url = 'https://muebleriaback.herokuapp.com/carritoCompras/listarcarrito';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        carrito = data
        console.log("ENTRA A LISTAR TODO EL CARRITO " + carrito);
      //  m.lista.push(data)
      })
  }

    // const [visible, setvible] = useState(false);

    const [visible2, setVisible2] = useState(false)
    const [visible, setVisible] = useState(false)
    const [pretotal, setPretotal] = useState("")
    let guardar = [];
    let prods = []
    let t = 0;
    let prodsUpdate = []
    const [amountProd , setAmountProd] = useState(1)

    const simulateBuy = () => {
        // console.log(listsCart.toString());
        const user = sessionStorage.getItem("usuario")
        if(user == null){
            toast("Por favor inicie sesion",{className:'send-toast',duration:'200',position:'bottom-left'})
        }else{
            const user2 = JSON.parse(user.toString());
            const nameUser = user2.nameU
            let idUser = user2.idU
            console.log("ID USER " + idUser);
            const cellphoneNumberUser = user2.cellphoneNumberU
            const priceTotal = t
            const urlRegisterInvoice = "https://muebleriaback.herokuapp.com/facturas/registrarFactura"
            let tokenAdmin = localStorage.getItem('user')
            console.log("TOKEN ADMIN");
            if (tokenAdmin == "" || tokenAdmin == null) {
                toast("Por favor inicie sesion",{className:'send-toast',duration:'200',position:'bottom-left'})
            }else{
                carrito.forEach(element => {
                    console.log("ELEMENTO " + element.nombre__producto);
                    fetch(urlRegisterInvoice, {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json",
                            'Access-Control-Allow-Origin': '*' 
                        },
                        body: JSON.stringify({
                            cantidad_producto: amountProd,
                            nombre_cliente: nameUser,
                            cedula_cliente: idUser,
                            telefono_cliente: cellphoneNumberUser,
                            productos : element.nombre__producto,
                            nombre_producto: element.nombre__producto,
                            total_a_pagar : priceTotal
                        })
            
                    })
                        .then(response => {
                            toast("Compra exitosa",{className:'send-toast',duration:'200',position:'bottom-left'})
                        })    
            })
        }
    }
        // const lista = localStorage.getItem("listaProduct");

        // console.log("LISTA PRODS " + lista);
        
    }

    
    const saveAmount = (amount) => {
        toast('Actualice precios 👇',{
            className:'send-toast',
            position:'top-right'
        })
        setAmountProd(amount)
        console.log(amount);
    }

    useEffect(() => {
        // set2(listsCart)
        document.getElementById('cantidad').innerHTML = conut //se cambia de estado la cantidad de productos que hay en el carrito el componente se en cuentra en la (NavHome)
    }, [conut])

    let precioTotal;

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    //actualizamos el carro cuando multiplicamos precio por cantidad
    const editCart = async (e, codigo, nameP, precioP, imagenP, precio_total) => {//la (e) es el valor que captura (1234)
        let cantidad = e.target.value;
        precioTotal = precioP * cantidad
        // toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});


        const urlRegister = 'https://muebleriaback.herokuapp.com/carritoCompras/actualizarCarrito/' + codigo;//se le pasa por parametro el codigo del carrito
        fetch(urlRegister, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": '*' 
            },
            body: JSON.stringify({
                codigo_Carrito: codigo,
                nombre__producto: nameP,
                imagen_producto: imagenP,
                precio_producto: precioP,
                cantidad_cart: cantidad,
                precio_total: precioTotal

            })

        })
            .then(response => {

                if (response.ok) {
                    return (
                        <div>

                        </div>
                    )

                } else {
                }
            })



    }





    return (
        <div className='sectionCart'  >
            <div>
                {
                    listsCart.length > 0 ?
                        listsCart.map((item) => (
                            <div key={item.codigo_Carrito} id={item.codigo_Carrito} >
                                <div className='card-cart' >
                                    <div className='con-imgP'>
                                        {item.imagen_producto ? <img src={item.imagen_producto} alt="" className='img-cart' id='h2' /> : <img></img>}
                                    </div>
                                    {prods.push(item)}

                                    <div className='content-cart-nameProduct' id='h3'>
                                       
                                       
                                        <div className='content-nameP'>
                                            <p className='p'>{item.nombre__producto}</p>
                                            {localStorage.setItem("nombreProducto" , item.nombre__producto)}
                                        </div>


                                        <div className='' >
                                            <select id='selector' className='select' onChange={e => editCart(e, item.codigo_Carrito, item.nombre__producto, item.precio_producto, item.imagen_producto, item.precio_total)} onClick={e => saveAmount(e.target.value)}>
                                                <option>{item.cantidad_cart}</option>
                                                {item.cantidad_cart == 1 ? <div></div> : <option value={1} >1</option>}
                                                {item.cantidad_cart == 2 ? <div></div> : <option value={2}>2</option>}
                                                {item.cantidad_cart == 3 ? <div></div> : <option value={3}>3</option>}
                                                <option>4</option>
                                            </select>
                                        </div>

                                        <div className=''>
                                            {item.precio_total > item.precio_producto ? <h4 id='precio'>${item.precio_producto} unidad</h4> : <h4 id='precio'>${item.precio_producto}</h4>}
                                            {item.precio_total <= item.precio_producto ? <h2></h2> : <h2 id={item.nombre__producto}>{item.precio_producto * item.cantidad_cart}</h2>}
                                        </div>
                                    </div>

                                    <div className='content-delete-cart' id='h6'>
                                        <ServicieDeleteCart codigo={item.codigo_Carrito} press={item.precio_total} />
                                        {console.log(guardar.push(item.precio_total))/*guardamos en la lista todos los precio total*/}
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
                        //sumaos los precios total y los guardamos en una variable
                    })
                }
            </div>
            {

                // t > 0 ?
                <div className='Total-press'>
                    <div className='section-operation' >
                        <p >TOTAL DE COMPRA</p>
                        <p className='item-total' id='press'>{t}</p>
                    </div>

                    <Button onMouseEnter={peticion} onClick={simulateBuy}>FINALIZAR COMPRA</Button>

                </div>
                // // :
                // <div> </div>
            }

            <Toaster toastOptions={{
                duration: '200'

            }} />

        </div>

    )
}



