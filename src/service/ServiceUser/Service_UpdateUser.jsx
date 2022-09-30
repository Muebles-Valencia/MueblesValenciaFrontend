import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext';
import './css/serviceUser.css'
import { HeaderHome } from '../../Component/Layout/HeaderHome/HeaderHome';
import { FooterMain } from '../../Component/Ui/FooterMain/FooterMain';
import toast from 'react-hot-toast';
import {FaUserCircle} from 'react-icons/fa'

export const Service_UpdateUser = ({ }) => {


    const [productSearch, setProducts] = useState(null);
    const [visible, setVisible] = useState(true);
    const [documnet, setDocumentUser] = useState("");
    const [code, setCodeUser] = useState(0)
    const [cart, setCartUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("")

    useEffect(() => {
        console.log("emtro al usefect")
        searchUser()
    }, [])



    function searchUser() {
        let tokenUser = localStorage.getItem("user")
        const user = sessionStorage.getItem("usuario")
        const user2 = JSON.parse(user.toString());
        console.log("CEDULA " + user2.idU);
        const urlRegister = 'https://muebleriaback.herokuapp.com/clientes/buscarCliente/' + user2.idU;
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + tokenUser
            }
        })
            .then(response => response.json())
            .then(user => guardarProduc(user))
        setLoading(false)
    }

    const guardarProduc = (user) => {
        setUser(user)
        console.log("contra " + user);
        setCodeUser(user.codigo_cliente)
        setDocumentUser(user.cedula_cliente)
        setCartUser(user.carrito)
    }


    function editUser() {
        console.log("estoy editando un Usuario")
        const name_user = document.getElementById("inputName").value
        const lastName_user = document.getElementById("inputLastName").value
        const phone = document.getElementById("inputPhone").value
        const email = document.getElementById("inputEmail").value
        const date = document.getElementById("inputDate").value
        const password = document.getElementById("inputpassword").value
        const urlRegister = 'https://muebleriaback.herokuapp.com/clientes/' + documnet;
        let tokenUser = localStorage.getItem("user")
        if (tokenUser == "" || tokenUser == null) {
            alert("Por favor registrese")
        } else {
            fetch(urlRegister, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + tokenUser
                },
                body: JSON.stringify({
                    nombre: name_user,
                    cedula_cliente: documnet,
                    apellido_cliente: lastName_user,
                    correo: email,
                    celular_cliente: phone,
                    contraseña_cliente: password,
                    codigo_producto: code,
                    fecha_nacimin_cliente: date,
                    carrito: cart
                })
            })
                .then(response => response.json())
                .then(json => {
                    if (json.ok) {
                        toast("Error ", { className: 'send-toast', position: 'bottom-right', duration: '130' })
                    } else {
                        toast("Actualizacion Exitosa", { className: 'send-toast', position: 'bottom-right', duration: '130' })
                    }
                })
        }
    }

    const seew = () => {

        if (visible == false) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }


    return (
        <>
            <HeaderHome />
            <div className='content-updateUser'>
                <div className='content-updateUser-title'>
                    <FaUserCircle style={{fontSize:'40px',color:'rebeccapurple'}}/>
                    <h2 style={{marginTop:'7px'}}>Editar Perfil</h2>
                </div>
                 
                <div className='form-update-uset'>
                    
                    <div className='update-user-column1' style={{width:'30%'}}>
                        <label htmlFor="" className='label-update'>Nombre</label>
                        <InputText type='text' id='inputName' className='input-update' placeholder={user.nombre} />

                        <label htmlFor="" className='label-update'>Apellido</label>
                        <InputText type='' id='inputLastName' className='input-update' placeholder={user.apellido_cliente} />

                        <label htmlFor="" className='label-update'>Fecha de Nacimiento</label>
                        <InputText type='date' id='inputDate' className='input-update' />
                    </div>
        
                    <div   className='update-user-column2'style={{width:'30%'}}>
                        <label htmlFor="" className='label-update'>Numero</label>
                        <InputText type='number' id='inputPhone' className='input-update inputpress' placeholder={user.celular_cliente} />
                    
                        <label htmlFor="" className='label-update'>Correo</label>
                        <InputText type='email' id='inputEmail' className='input-update inputpress' placeholder={user.correo} />
                    
                        <label htmlFor="" className='label-update'>Contraseña</label>
                        <InputText type='password' id='inputpassword' className='input-update' />
                    </div>
                          
                </div>

            </div>
            <div className='save-edit'>
                <Button onClick={editUser} className='save-update-user' >Guardar</Button>
            </div>
            <br /><br></br>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FooterMain></FooterMain>
            </div>
        </>
    )
}
