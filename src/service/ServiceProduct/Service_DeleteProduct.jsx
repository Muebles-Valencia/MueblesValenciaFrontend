import React,{useState} from 'react'
import { FormSaveProduct } from '../../Component/Layout/FormSaveProduct/FormSaveProduct';
import { Dialog } from 'primereact/dialog';
import { Button,} from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './css/registerProduct.css'
import { Toaster } from 'react-hot-toast';
import {AiFillDelete} from 'react-icons/ai'
export const Service_DeleteProduct = ({style}) => {
  
    const [visible, setVisible] = useState(false)
    const [image, setImageProduct] = useState("");
    const [loading, setLoading] = useState(true);
    const [name_product, setNameProduct] = useState("")
    const [name_supplier_product, setNameSupplierProduct] = useState("")
    const [description, setDescriptionProduct] = useState("")
    const [price, setPriceProduct] = useState(0)
    const [code , setCodeProduct] = useState(0)
    const [amount , setAmountProduct] = useState(0)
    const [idCategory , setIdCategory] = useState(0)
    const [nameCategory , setNameCategory] = useState("")


    const uploadimage=async(e)=>{
        console.log("entro")
        const files=e.target.files;
        const data=new FormData()
        data.append("file",files[0])
        data.append("upload_preset","images");
        setLoading(true)
        const res=await fetch("https://api.cloudinary.com/v1_1/estivencloud/image/upload",
        {
        method:"POST",
        body:data
        }
        )
        const file=await res.json();
        console.log(res)
        console.log(idCategory);
        setImageProduct(file.secure_url)
        setLoading(false)
        return (
            <img src={file.secure_url} alt="imagen"></img>
        )
    }

    const catchNameProduct = (even) => {
        setNameProduct(even.target.value)
    }
    
    const catchNameSupplierProduct = (even) => {
        setNameSupplierProduct(even)
    }

    const catchDescriptionProduct = (even) => {
        setDescriptionProduct(even.target.value)
    }

    const catchCodeProduct = (even) => {
        setCodeProduct(even.target.value)
    }

    const catchPriceProduct = (even) => {
        setPriceProduct(even.value)
    }

    const catchAmountProduct = (even) => {
        setAmountProduct(even.value)
    }


    function registerProduct() {
        console.log("estoy registrando un producto")
        console.log(price)
        console.log(amount)
        const urlRegister = 'https://muebleriaback.herokuapp.com/producto';
        let tokenAdmin = localStorage.getItem('admin')
        if(tokenAdmin == "" || tokenAdmin == null){
            alert("Por favor registrese")
        }else{             
            fetch(urlRegister, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization" : "Bearer " + tokenAdmin
                },
                body: JSON.stringify({
                    codigo_producto : code,
                    nombre_producto: name_product,
                    descripcion_producto: description,
                    precio_producto: price,
                    cantidad_producto : amount,
                    foto_producto:image,
                    id_categoria : {
                        id_categoria : idCategory,
                        nombre_categoria : nameCategory
                    },
                    nombre_proveedor_producto : name_supplier_product
                })
            })
                .then(response => response)
                .then(json => check(json.ok))
                console.log(name_supplier_product);
        }
    }
    
    function check(element) {
        if (element == true) {
            <Toaster reverseOrder={true} toastOptions={{
            
            }} />
            
            
            //alert("Registro exitoso")
        } else {
            alert("hubo un error al momento de registrar")
        }
    }

    const onHide = () => {
        if (visible == false) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const header=(
        <div className='div-login'>
           Registrar Producto
       </div>
    )

    return (
        <div className={style}>
            <Button className='button-book' onClick={() => onHide(onHide)}><AiFillDelete className='Book'/></Button>
            <Dialog header={header}   className='dialogoRegisterProduct' visible={visible} style={{ width: '30em',bordeRadius:'100%'}} modal onHide={onHide}>
            
            <div className='content-image'>
                
                <FormSaveProduct onChange1={catchNameProduct} onChange2={catchDescriptionProduct} onChange5={catchPriceProduct} onChange6={catchAmountProduct} onchange4={registerProduct} onChange7={setIdCategory} onChange8={setNameSupplierProduct} onChange9={setNameCategory} onchange3={() => onHide(onHide)}/>
                
                <div className='content-Input-file'>
                {loading ? (<h3>cargando imagen</h3>):(<img className='image-product' src={image} />)}
                    <InputText className='input-register'  id='catch' type='file' name='file' placeholder='subirImg' onChange={uploadimage}  />
                </div>
            </div>
            </Dialog>
        </div>
    )
}
