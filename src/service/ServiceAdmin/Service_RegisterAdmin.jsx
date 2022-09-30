import React,{useState} from 'react'
import { FormSaveProduct } from '../../Component/Layout/FormSaveProduct/FormSaveProduct';
import { Dialog } from 'primereact/dialog';
import { Button,} from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router'
import "../ServiceProduct/css/registerProduct.css"
import { FormSaveAdmin } from '../../Component/Layout/FormSaveAdmin/FormSaveAdmin';
import { NavigationAdmin } from '../../Component/Layout/NavigationAdmin/NavigationAdmin';
import { IoIosSave } from 'react-icons/io';

export const Service_RegisterAdmin = ({style}) => {

    // let navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(true);
    const [name_admin, setNameAdmin] = useState("")
    const [email_admin, setEmailAdmin] = useState("")
    const [password_admin, setPasswordAdmin] = useState("")
    
    const catchNameAdmin = (even) => {
        setNameAdmin(even.target.value)
    }
    
    const catchEmailAdmin = (even) => {
        setEmailAdmin(even.target.value)
    }

    const catchPasswordAdmin = (even) => {
        setPasswordAdmin(even.target.value)
    }

    function registerAdmin() {
        console.log("registrando un admin")
        const urlRegister = 'https://muebleriaback.herokuapp.com/administradores/registrarAdministrador';
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
                    codigo_administrador : 0,
                    nombre_administrador: name_admin,
                    correo_administrador : email_admin,
                    contraseña_administrador: password_admin,
                })
            })
                .then(response => response)
                .then(json => check(json.ok))
        }
    }
    // if(response.status==201){
    //     toast("Save ")
    // }
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
           Registrar Administrador
       </div>
    )

    return (
        <div className={style}>
            <div>
                <Button className='button-book' onClick={() => onHide(onHide)} ><IoIosSave className='Book'/></Button>
                <Dialog header={header}   className='dialogoRegisterAdmin' visible={visible} style={{ width: '30em',bordeRadius:'100%'}} modal onHide={onHide}>
                
                <div className='content-image'>
                    
                    <FormSaveAdmin onChange1={catchNameAdmin} onChange2={catchEmailAdmin} onchange3={catchPasswordAdmin} onchange4={registerAdmin}/>
                    
                </div>
                </Dialog>
            </div>
        </div>
    )
}
