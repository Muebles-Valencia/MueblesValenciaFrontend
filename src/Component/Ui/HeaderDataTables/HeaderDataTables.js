import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Emblema } from '../Logo/Emblema'

import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { Sidebar } from 'primereact/sidebar'

import { MdInventory2 } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa"
import { MdCategory } from "react-icons/md"
import { BsCloudUploadFill } from "react-icons/bs"
import { GrUserSettings } from "react-icons/gr"
import { VscBook } from "react-icons/vsc"
import { BsFolderSymlink } from "react-icons/bs"
import { GiExitDoor } from 'react-icons/gi'
import { AiOutlineHome } from 'react-icons/ai'
import './styleHeaderDataTables.css'

export const HeaderDataTables = ({ text }) => {

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    // const [carrito, setCarrito] = useState([])
    // const [nameAdmin, setNameAdmin] = useState("")
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

    const onHide2 = () => {
        if (visible == false) {

            setVisible2(true)
        } else {

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

    const logout = () => {
        localStorage.setItem('admin', "")
        adminActivo = null;
        // sessionStorage.clear();
        sessionStorage.removeItem('admin');
        sessionStorage.removeItem('token');
        document.getElementById("nameAccount").textContent = "Mi Cuenta"
        return (
            toast("Sesion cerrada con exito")
                (setTimeout(() => {
                    (navigate("/"))
                }, 200))
        )
    }

    return (


        <div className='navegationAdmin'>
            <Emblema classN="title-admin" />
            <div>
                {text}
            </div>
            <nav className='icons'>
                <Link className='icons-link-button-biwrench' to="/PageAdminMain">
                    <div className='button-biwrench'><AiOutlineHome style={{ fontSize: '27px' }} />Home</div>
                </Link>

                <button className='iconAdmin' onClick={onHide2} >
                    <div className='button-biwrench'><BsFolderSymlink style={{ fontSize: '27px' }} />Inventarios</div>
                </button>
                <Sidebar visible={visible2} onHide={() => setVisible2(false)} position='right' style={{ display: 'flex', alignItems: 'flex-start' }} className='sidebar-page-tablas-demo'>
                    <main className='main-link-headerDataTables'>
                        <div>
                            <h2>Inventario</h2>
                        </div>
                        <br></br>
                        <div className='main-link-headerDataTables'>
                            <Link className='card-section2' to="/tableAdmins"><GrUserSettings className='link-headerDataTables' style={{ color: 'red' }} />Gestion administradores </Link>

                            <Link className='card-section2' to='/registerProduct' ><MdInventory2 className='link-headerDataTables' />Inventario Producto</Link>

                            <Link className='card-section2' to='/registerProvider' ><FaPeopleCarry className='link-headerDataTables' />Inventario Proveedores</Link>

                            <Link className='card-section2' to='/registerCategories' ><MdCategory className='link-headerDataTables' />Iventario Categorias</Link>

                            <Link className='card-section2' to='/listReserves' ><VscBook className='link-headerDataTables' />Gestion Reservas</Link>

                            <Link className='card-section2' to='/registerProximo'><BsCloudUploadFill className='link-headerDataTables' />Próximos Lanzamientos</Link>
                        </div>
                    </main>
                   <br/> 

                    <div>
                        <h4>Nota: </h4>
                        <p style={{fontSize:'20px'}}>Cada vez que realices una acción, toca dentro de la tabla para actualizar la infomación</p>
                    </div>

                </Sidebar>
                {/* <button className='iconAdmin' onClick={logout}>
                    <div className='button-biwrench'><GiExitDoor style={{ fontSize: '30px' }} />Cerrar sesion</div>
                </button> */}

            </nav>

          

            <Toaster reverseOrder={true} toastOptions={{
                className: 'k',
                duration: '70'
            }} />
        </div>







    )
}
