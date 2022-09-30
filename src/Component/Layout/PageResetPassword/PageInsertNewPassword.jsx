import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FooterMain } from '../../Ui/FooterMain/FooterMain';
import { HeaderHome } from '../HeaderHome/HeaderHome';
import '../PageResetPassword/PageResetPassword.css'

export const PageInsertNewPassword = () => {
    
    const [newPassword , setNewPassword] = useState("");
    const [verifyNewPassword , setVerifyNewPassword] = useState("");
    let navigate = useNavigate()
    function insertNewPassword() {
        if(newPassword == verifyNewPassword){
            const URL = 'https://muebleriaback.herokuapp.com/clientes/actualizarContraseña/' + newPassword;
            fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(res => checkRes(res))
        }else{
            alert("LAS CONTRASEÑAS NO COINCIDEN")
        }
    }

    const checkRes = (result) => {
        console.log(result);
        if(result.cedula_cliente != "" || result.cedula_cliente != null){
            alert("Se ha modificado la contraseña con exito, Inicie sesion")
            navigate("/")
        }else{
            alert("Ha ocurrido un error")
        }
    }

    return (
        <>
        <HeaderHome/>
            <div className='changepassword'>
                <div className='change-password'>
                    <h4>Cambia tu contraseña</h4>
                    <label htmlFor="">Ingresa la nueva contraseña</label>
                    <InputText type="password" onChange={e => setNewPassword(e.target.value)}/>
                    <label htmlFor="">Confirma la contraseña</label>
                    <InputText type="password" onChange={e => setVerifyNewPassword(e.target.value)}/>

                    <Button onClick={insertNewPassword}>Guardar</Button>
                </div>
            </div>
            <FooterMain/>
        </>
    )
}
