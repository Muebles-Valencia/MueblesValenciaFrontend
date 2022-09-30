import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar/';
import { Button } from 'primereact/button';
import './style.css'
// import { ListsCart } from '../../../service/ServiceCarrito/ListsCart';
import { ContentShoppingCart } from '../ShoppingCart/ContentShoppingCart';
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Toaster, toast } from 'react-hot-toast';
import { PageReservesClient } from '../../Page/PageReservesClient/PageReservesClient';
// import { useNavigate } from 'react-router-dom'
import { SplitButton } from 'primereact/splitbutton';
import { Service_ListInvoices } from '../../../service/ServiceInvoice/Service_ListInvoices';
import { MdOutlineInventory } from "react-icons/md";
import '../HeaderHome/MQuery360X740.css'

export const NavHome = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    let [accessToken , setAccessToken] = useState("")
    let [user , setUser] = useState(null)
    const [nameUser , setNameUser] = useState("")
    const [stateUser , setStateUser] = useState(0)
    const [surnameUser , setSurnameUser] = useState("")
    const [emailUser , setEmailUser] = useState("")
    const [idUser , setIdUser] = useState("")
    const [cellphoneNumberUser , setcellphoneNumberUser] = useState("")
    const [nameAdmin , setNameAdmin] = useState("")
    const [stateAdmin , setStateAdmin] = useState(0)
    const [emailAdmin , setEmailAdmin] = useState("")
    const [idAdmin , setIdAdmin] = useState("")
    
    let navigate = useNavigate();

    const onHide = () => {
        if (visible == false) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    let usuarioActivo = {
        nameU: nameUser,
        stateU: stateUser,
        surnameU: surnameUser,
        emailU: emailUser,
        idU: idUser,
        cellphoneNumberU: cellphoneNumberUser
    }

    let adminActivo = {
        nameA : nameAdmin,
        stateA : stateAdmin,
        emailU : emailAdmin,
        idU : idAdmin,
    }

    const catchEmail = (event) => {
        setEmail(event.target.value)
    }

    const obtenerDatosToken = (accessToken = "") => {

        if (accessToken != null && accessToken.length > 0) {
            return JSON.parse(atob(accessToken.split(".")[1]));
        }
        return null;
    }

    const guardarUsuario = (accessToken = "") => {

        let payload = obtenerDatosToken(accessToken);
        usuarioActivo.nameU = payload.nombre;
        usuarioActivo.emailU = payload.email;
        usuarioActivo.surnameU = payload.apellido;
        usuarioActivo.stateU = payload.Estado;
        usuarioActivo.idU = payload.cedula;
        usuarioActivo.cellphoneNumberU = payload.telefono;
        sessionStorage.setItem("usuario", JSON.stringify(usuarioActivo))

    }

    const guardarAdmin = (accessToken = "") => {

        let payload = obtenerDatosToken(accessToken);
        adminActivo.nameA = payload.nombre;
        adminActivo.emailU = payload.email;
        adminActivo.stateA = payload.Estado;
        adminActivo.idU = payload.cedula;
        sessionStorage.setItem("administrador", JSON.stringify(adminActivo))

    }

    const catchToken = (token) => {
        console.log("TOKEN " + token);
        if (token.nombre == "" || token.nombre == null) {
            return (
                toast("Correo o contraseña incorrecto, Por favor verifique o registrese")
                    (setTimeout(() => {
                        (navigate("/registerUser"))
                    }, 1000))

            )
        } else {
            document.getElementById("logout").classList.remove("logoutHide")
            setAccessToken(token.access_token)
            if(token.Estado == 1){
                localStorage.setItem('user' , token.access_token)
                sessionStorage.setItem("token", token.access_token);
                document.getElementById("nameAccount").textContent = token.nombre
                guardarUsuario(token.access_token)
                const user = sessionStorage.getItem("usuario")
                const user2 = JSON.parse(user.toString());
                toast("Bienvenido " + user2.nameU,{className:'send-toast',duration:'300',position:'bottom-left'})
                setVisible(false)
            }else {
                localStorage.setItem('admin' , token.access_token)
                let tokenAdmin = localStorage.getItem('admin')
                guardarAdmin(token.access_token)

                setVisible(false)   
                guardarUsuario(token.access_token)         

                const admin = sessionStorage.getItem("administrador")
                const admin2 = JSON.parse(admin.toString());
                document.getElementById("nameAccount").textContent = admin2.nameU
                toast("Bienvenido " + admin2.nameU,{className:'send-toast',duration:'300',position:'bottom-left'})
                document.getElementById("inventoryIcon").classList.remove("invt")
            }
        }
    }


useEffect(() => {

    const user = sessionStorage.getItem("usuario")
    if (user == null || user == ""){
        document.getElementById("logout").classList.add("logoutHide")
    }else {
        document.getElementById("logout").classList.remove("logoutHide")
        const user2 = JSON.parse(user.toString());
        document.getElementById("nameAccount").textContent = user2.nameU
    }
}, [])

    function login() {
        const urlEndpoint = 'https://muebleriaback.herokuapp.com/oauth/token';
        const credenciales = btoa('reactapp' + ':' + '12345');
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        params.append('grant_type', 'password');
        fetch(urlEndpoint, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Basic ' + credenciales,
            }, body: params.toString()
        })
            .then(response => response.json())
            .then(data => catchToken(data))
    }

    const logout = () => {
        accessToken = null;
        usuarioActivo = null;
        localStorage.setItem("user", null)
        localStorage.setItem("admin", null)
        // sessionStorage.clear();
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('administrador');
        sessionStorage.removeItem('token');
        document.getElementById("logout").classList.add("logoutHide")
        toast("Has cerrado sesion",{className:'send-toast',duration:'300',position:'bottom-left'})
        document.getElementById("nameAccount").textContent = "Mi Cuenta"
        document.getElementById("inventoryIcon").classList.add("invt")
    }

    const header = (
        <div className='div-login'>
            <h2>Iniciar Sesion</h2>
        </div>

    )

    //========================estas funciones estan explicadas en el servicio registrar producto

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const re = async () => {
        setVisible2(false)
        await timeout(1000)

        if (visible == false) {

            setVisible2(true)
        }
    }
    //==================================================================

    useEffect(() => {
    }, [visible2])

    let navigat = useNavigate()

    const redirect = () => {
        navigat("/listReservesClient")
    }

    const redirectInvoices = () => {
        navigat("/listInvoices")
    }

    const EditProfile = () => {
        navigat("/pageEditProfile")
    }

    const resetPassword = () => {
        navigat("/pageSendCode")
    }

    const items = [

        {
            
            label: 'Reservas',
            icon: 'pi pi-folder-open',
            command: () => {
                redirect()
            }
        },
        {
            label: 'Facturas',
            icon: 'pi pi-wallet',
            command: () => {
                redirectInvoices()
            }
        },
        {
            label: 'Editar Perfil',
            icon: 'pi pi-user-edit',
            command: () => {
                EditProfile()
            }
        },
        {
            label: 'Cerrar Sesion',
            icon: 'pi pi-sign-out ico',
            command: (e) => {
                logout()
            }
        }
    ]

    return (
        <nav className='icons'>

            <Link className='icon' to="/"><i className="pi pi-home ico" ><p className='name-icon'> Inicio </p></i></Link>
            <ContentShoppingCart onHide={() => setVisible2(false)} visible2={visible2} onClick={re} />

            <div className="cart-conten">
                <p className='cantidad-product' id='cantidad'></p> {/*Aqui va la cantidad de productos que llevamos en el carrito*/}
                <button className='icon' onClick={(e) => setVisible2(true)} ><i className="pi pi-shopping-cart ico"><p className='name-icon'>Mi Carrito</p></i></button>
            </div>


            <div className='favoritos'>
                <p className='cantidad-producto' id='favorites'></p>
                <button className='icon' onClick={() => onHide(onHide)} ><i className="pi pi-user ico"><p className='name-icon' id='nameAccount'>Mi Cuenta</p></i></button>
            </div>

            <Dialog header={header} className='-login' visible={visible} modal onHide={onHide} style={{ width: '30%', height: '50%' }}>

                <div className='content-login'>
                    <div>
                        <InputText className='inputs' type="email" onChange={e => catchEmail(e)} id='email' style={{ width: '20em' }} placeholder='Correo' />
                    </div>
                    <div>
                        <InputText className='inputs' type="password" id='password' onChange={e => setPassword(e.target.value)} placeholder='Contraseña' style={{ width: '20em' }} />
                    </div>
                </div>
                <div className='divLink'>
                    <Link to="/pageSendCode">¿Olvidaste tu contraseña?</Link>
                    <Link to="/registerUser">¿No tienes una cuenta? Registrar</Link>
                    <div><Button className='button-login' onClick={login}>Iniciar Sesión</Button></div>
                </div>
            </Dialog>

            <div className='favoritos'>
                <Link to="/pageFavorito" className='icon'><i className='pi pi-heart heart-icon ico'> <p className='name-icon'>Favoritos</p></i></Link>
            </div>

            <div className='logoutHide' id='logout' style={{ position: 'relative' }}>
                <SplitButton  label={<i className='pi pi-list'></i>} model={items} className="SplitButton-reservas"></SplitButton>
                <p className='opciones' >opciones</p>
            </div>

            <div className='favoritos invt' id='inventoryIcon'>
                <Link to="/PageAdminMain" className='icon'><i className='pi pi-book ico'> <p className='name-icon'>Inventario</p></i></Link>
            </div>

            <Toaster reverseOrder={true} toastOptions={{
                className: 'k',
                duration: '150'
            }} />
        </nav>

    )
}
