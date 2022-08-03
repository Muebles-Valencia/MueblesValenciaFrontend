import React,{useState} from 'react'
import { FormSaveProduct } from '../../Component/Layout/FormSaveProduct/FormSaveProduct';
import { Dialog } from 'primereact/dialog';
import { Button,} from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './css/registerProduct.css'
export const Service_ProductRegis = ({style}) => {

    const [visible, setVisible] = useState(false)
    const [image, setImageProduct] = useState("");
    const [loading, setLoading] = useState(true);
    const [name_product, setNameProduct] = useState("")
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

    const catchDescriptionProduct = (even) => {
        setDescriptionProduct(even.target.value)
    }

    const catchCodeProduct = (even) => {
        setCodeProduct(even.target.value)
    }

    const catchPriceProduct = (even) => {
        setPriceProduct(even.target.value)
    }

    const catchAmountProduct = (even) => {
        setAmountProduct(even.target.value)
    }


    function registerProduct() {
        console.log(idCategory);
        if(idCategory == 1){
            setNameCategory("Muebles")
            console.log(idCategory);
        }else if(idCategory == 2){
            setNameCategory("Silla")
        }
        console.log("estoy registrando un producto")
        const urlRegister = 'http://localhost:8080/producto';
        fetch(urlRegister, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
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
                }
            })
        })
            .then(response => response)
            .then(json => check(json.ok))
    }

    function check(element) {
        if (element == true) {
            alert("Registro exitoso")
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
           Registrar Product
       </div>
    )

    return (
        <div className={style}>
            <Button className='' onClick={() => onHide(onHide)} ><i className='pi pi-save'></i></Button>
            <Dialog header={header}   className='dialogoRegisterProduct' visible={visible} style={{ width: '30em',bordeRadius:'100%'}} modal onHide={onHide}>
            
            <div className='content-image'>
                
                <FormSaveProduct onChange1={catchNameProduct} onChange2={catchDescriptionProduct} onChange5={catchPriceProduct} onChange6={catchAmountProduct} onchange4={registerProduct} onChange7={setIdCategory} onchange3={() => onHide(onHide)}/>
                
                <div className='content-Input-file'>
                {loading ? (<h3>cargando imagen</h3>):(<img className='image-product' src={image} />)}
                    <InputText className='input-register'  id='catch' type='file' name='file' placeholder='subirImg' onChange={uploadimage}  />
                </div>
            </div>
            </Dialog>
            
        </div>
    )
}