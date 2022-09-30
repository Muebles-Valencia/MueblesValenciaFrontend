import React,{useState} from 'react'
import { Dialog } from 'primereact/dialog';
import { Button,} from 'primereact/button';
import './css/registerProvider.css'
import { FromSaveProvider } from '../../Component/Layout/FromSaveProvider/FromSaveProvider';
import {IoIosSave} from 'react-icons/io'
export const Service_RegisterProvider = ({style}) => {
  const [visible, setVisible] = useState(false)
  const [id, setIdProvider] = useState("")
  const [phone , setPhoneProvider] = useState(0)
  const [name , setaNameProvider] = useState("")

    /*const uploadimage=async(e)=>{
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
    }*/

    const catchIdProvider = (even) => {
        setIdProvider(even.target.value)
    }

    const catchNameProvider = (even) => {
        setaNameProvider(even.target.value)
    }

    const catchphoneProvider = (even) => {
        setPhoneProvider(even.target.value)
    }


    function registerProvider() {
        console.log("estoy registrando un proveedor")
        const urlRegister = 'https://muebleriaback.herokuapp.com/proveedores/registrarProveedor';
        console.log(urlRegister)
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
                    cedula_proveedor : id,
                    nombre_proveedor: name,
                    telefono_proveedor: phone
                    /*nombre_proveedor_producto : name_supplier_product*/
                })
            })
            .then(response => response)
            .then(json => check(json.ok))
            console.log();
        }
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
           Registrar Proveedor
       </div>
    )
  return (
    <div className={style}>
        <Button className='button-book' onClick={() => onHide(onHide)} ><IoIosSave className='Book'/></Button>
        <Dialog header={header}   className='dialogoRegisterProduct' visible={visible} style={{ width: '30em',bordeRadius:'100%'}} modal onHide={onHide}>
        
        <div className='content-image'>
            <FromSaveProvider onChange1={catchIdProvider} onChange2={catchNameProvider} onChange5={catchphoneProvider} onchange4={registerProvider} onchange3={() => onHide(onHide)}/>
        </div>
        </Dialog>
    </div>
  )
}
