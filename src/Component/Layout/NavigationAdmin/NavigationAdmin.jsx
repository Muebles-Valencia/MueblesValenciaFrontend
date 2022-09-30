import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavHome } from '../NavHome/NavHome'
import { Sidebar } from 'primereact/sidebar/';
import { Emblema } from '../../Ui/Logo/Emblema'
import './NavigationAdmin.css'
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import {SiHomeassistantcommunitystore} from 'react-icons/si'

export const NavigationAdmin = () => {

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [carrito, setCarrito] = useState([])
    const [nameAdmin, setNameAdmin] = useState("")
    let [tokenAccess, setAccessToken] = useState("")
    let navigate = useNavigate()
    const onHide = () => {
        if (visible == false) {
            buscarAdminRegistrado()
            setVisible(true)
        } else {
            buscarAdminRegistrado()
            setVisible(false)
        }
    }

    const header = (
        <div className='div-login'>
            <h2>login</h2>
        </div>

    )

    let adminActivo = {
        nameA: "",
        stateA: 0,
        surnameA: "",
        emailA: ""
    }

    const obtenerDatosToken = (accessToken = "") => {

        if (accessToken != null && accessToken.length > 0) {
            return JSON.parse(atob(accessToken.split(".")[1]));
        }
        return null;
    }

    const buscarAdminRegistrado = () => {
        let tokenAdmin = localStorage.getItem('admin')
        setAccessToken(tokenAdmin)
        console.log("Buscar admin " + tokenAccess);
        let payload = obtenerDatosToken(tokenAccess);
        adminActivo.nameA = payload.nombre;
        adminActivo.emailA = payload.email;
        adminActivo.surnameA = payload.apellido;
        adminActivo.stateA = payload.Estado;
        sessionStorage.setItem("admin", JSON.stringify(adminActivo))
        sessionStorage.setItem("token", tokenAccess);
        console.log("Admin en el sesion storage " + sessionStorage.getItem("admin"));
        console.log(adminActivo);
    }

    // const logout = () => {
    //     localStorage.setItem('admin' , "")
    //     adminActivo = null;
    //     // sessionStorage.clear();
    //     sessionStorage.removeItem('administrador');
    //     sessionStorage.removeItem('token');
    //     document.getElementById("nameAccount").textContent = "Mi Cuenta"
    //     return (
    //         toast("Sesion cerrada con exito")
    //         (setTimeout(() => {
    //             (navigate("/"))
    //           }, 200))
    //     )  
    //   }


    // const logout = () => {
    //     // accessToken = null;
    //     // usuarioActivo = null;
    //     localStorage.setItem("user", null)
    //     localStorage.setItem("admin", null)
    //     // sessionStorage.clear();
    //     sessionStorage.removeItem('usuario');
    //     sessionStorage.removeItem('administrador');
    //     sessionStorage.removeItem('token');
    //     document.getElementById("logout").classList.add("logoutHide")
    //     toast("Has cerrado sesion",{className:'send-toast',duration:'300',position:'bottom-left'})
    //     document.getElementById("nameAccount").textContent = "Mi Cuenta"
    //     document.getElementById("inventoryIcon").classList.add("invt")
    // }

    const logout = () => {
        localStorage.setItem("user", null)
        localStorage.setItem("admin", null)
        // sessionStorage.clear();
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('administrador');
        sessionStorage.removeItem('token');
        // document.getElementById("logout").classList.add("logoutHide")
        toast("Has cerrado sesion", { className: 'send-toast', duration: '300', position: 'bottom-left' })
        document.getElementById("nameAccount").textContent = "Mi Cuenta"
        // document.getElementById("inventoryIcon").classList.add("invt")
        localStorage.setItem('admin', "")
        adminActivo = null;
        // sessionStorage.clear();
        sessionStorage.removeItem('administrador');
        sessionStorage.removeItem('token');

        return (
            toast("Sesion cerrada con exito")
                (setTimeout(() => {
                    (navigate("/"))
                }, 200))
        )
    }

    return (
        <div className='header-admin'>
            <header className='header-navegation'>
                <div className='navegationAdmin'>
                    <Emblema classN="title-admin" />
                    <nav className='icons'>
                        <Link className='iconAdmin' to="/"><SiHomeassistantcommunitystore style={{fontSize:'25px'}}/><p className='tienda'>Tienda</p></Link>
                        <button className='iconAdmin' onClick={() => onHide(onHide)} ><i className="pi pi-user ico"></i><p id='nameAccount'>{adminActivo.nameA}</p></button>
                        <button className='iconAdmin' onClick={logout}><i className='pi pi-sign-out ico'><p>Cerrar sesion</p></i></button>
                    </nav>
                </div>
                <div className='paredAdmin'></div>
            </header>

            <Toaster reverseOrder={true} toastOptions={{
                className: 'k',
                duration: '70'
            }} />
        </div>
    )
}
