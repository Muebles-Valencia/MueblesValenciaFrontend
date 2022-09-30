import React, { useState } from 'react'
import { FormSaveProduct } from '../../Component/Layout/FormSaveProduct/FormSaveProduct';
import { Dialog } from 'primereact/dialog';
import { Button, } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router'
import {IoIosSend} from 'react-icons/io'
import './css/styleComing.css'
import { set } from 'date-fns';
// import './css/registerProduct.css'
export const ServicieRegisterInventario = ({ style, code, nameP, descriptionP,imgP,price,category,nameC}) => {

    // let navigate = useNavigate()
    // const [visible, setVisible] = useState(false)
    // const [image, setImageProduct] = useState("");
    // const [loading, setLoading] = useState(true);
    // const [name_product, setNameProduct] = useState("")
    // const [name_supplier_product, setNameSupplierProduct] = useState("")
    // const [description, setDescriptionProduct] = useState("")
    // const [price, setPriceProduct] = useState(0)
    // const [code , setCodeProduct] = useState(0)
    // const [amount , setAmountProduct] = useState(0)
    // const [idCategory , setIdCategory] = useState(0)
    // const [nameCategory , setNameCategory] = useState("")





    // const catchNameProduct = (even) => {
    //     setNameProduct(even.target.value)
    // }

    // const catchNameSupplierProduct = (even) => {
    //     setNameSupplierProduct(even)
    // }

    // const catchDescriptionProduct = (even) => {
    //     setDescriptionProduct(even.target.value)
    // }

    // const catchCodeProduct = (even) => {
    //     setCodeProduct(even.target.value)
    // }

    // const catchPriceProduct = (even) => {
    //     setPriceProduct(even.value)
    // }

    // const catchAmountProduct = (even) => {
    //     setAmountProduct(even.value)
    // }


    function registerProduct() {
        if(nameP!=null){
           
            // console.log(price)
            // console.log(amount)
            const urlRegister = 'https://muebleriaback.herokuapp.com/producto';
            let tokenAdmin = localStorage.getItem('admin')
            if (tokenAdmin == "" || tokenAdmin == null) {
                alert("Por favor registrese")
            } else {
                fetch(urlRegister, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + tokenAdmin
                    },
                    body: JSON.stringify({
                        codigo_producto: null,
                        nombre_producto: nameP,
                        descripcion_producto: descriptionP,
                        precio_producto: price,
                        foto_producto: imgP,
                       
                    })
                })
                    .then(response =>{
                        if(response.status==201){
                            toast("Enviado con éxito",{className:'send-toast',duration:'300',position:'bottom-left'})
                            deleteProximo(code)
                            nameP=null
                            code=null
                            descriptionP=null
                            imgP=null
                        }
                    })
                
            }

        }else{
            toast("Seleccione un producto",{className:'send-toast',duration:'300',position:'bottom-left'})
        }

    }
   

    function deleteProximo(cod) {
        const urlRegister = 'https://muebleriaback.herokuapp.com/proximos/eliminarProximos/' + cod;
        fetch(urlRegister, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
        // .then(product => {
        //     // guardarProduc(product)
        //     console.log(product)
        // })
        // setLoading(false)
    }

    function check(element) {
        if (element == true) {
            // <Toaster reverseOrder={true} toastOptions={{

            // }} />
            // navigate("/registerProduct")
            alert("Registro exitoso")
        } else {
            alert("hubo un error al momento de registrar")
        }
    }



    const header = (
        <div className='div-login'>
            Registrar Producto
        </div>
    )

    return (

        <Button className='send' onClick={registerProduct} code nameP descriptionP imgP price category nameC>Ingresar al Inventario</Button>


    )
}