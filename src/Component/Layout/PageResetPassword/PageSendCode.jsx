import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import '../PageResetPassword/PageResetPassword.css'
import { Home } from '../../Page/Home/Home';

export const PageSendCode = () => {
    
    const [email , setEmail] = useState("");
    const [visible, setVisible] = useState(true)
    
    let navigate = useNavigate();

    const catchEmail = (event) => {
        setEmail(event.target.value)
    }

    function sendCode() {
        const URL = 'https://muebleriaback.herokuapp.com/clientes/recuperarContraseña/' + email;
        fetch(URL, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(categories => categories)
            navigate("/pageInsertCode")
    }

    const header = (
        <div className='div-login'>
            <h2>Reestablecer Contraseña</h2>
        </div>
    )
    const onHide = () => {
        if (visible == true) {
            setVisible(false)
            navigate("/")
        } else {
            setVisible(true)
        }
    }

    return (
        <>
            <Home/>
            <Dialog header={header} className='-login' visible={visible} modal onHide={onHide} style={{ width: '30%', height: '30%' }}>
                <div className='recover-password'>
                        <label htmlFor="">Ingrese el Correo </label>
                        <InputText className='inputs' type="email" onChange={catchEmail} id='emailInput' style={{ width: '20em' }} placeholder='Correo' />
                    
                </div>
                <div className='divLink'>
                    <div><Button value="Enviar" onClick={sendCode}>Enviar</Button></div>
                </div>
            </Dialog>
        </>
    )
}

{/* <div className='recover-password'>
<label htmlFor="">Ingrese el correo para reestablecer la contraseña</label>
<InputText  onChange={catchEmail} type="text" placeholder='Correo' id='emailInput'/>
<Button value="Enviar" onClick={sendCode}>Enviar</Button>
</div> */}
