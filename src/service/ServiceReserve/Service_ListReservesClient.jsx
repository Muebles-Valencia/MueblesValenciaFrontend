import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button'
import { Service_RegisterProvider } from '../ServiceProvider/Service_RegisterProvider';
import{Image} from 'primereact/image'
import '../../Component/Layout/DataTableTemplatingDemo/DataTableDemo.css'
import { Service_EditReserve } from './Service_EditReserve';
import { Modal } from '../../Component/Layout/ContentPageMain/Modal'
import { PageReservesExpired } from '../../Component/Page/PageReservesExpired/PageReservesExpired';
import { HeaderHome } from '../../Component/Layout/HeaderHome/HeaderHome';
import './ServiceReserve.css'
import { FooterMain } from '../../Component/Ui/FooterMain/FooterMain';

export const Service_ListReservesClient = () => {
    
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [reserves , setReserves] = useState([])
    let [selectedReserve, setReserveSelected] = useState(null);
    
    useEffect(() => {
        getReserves()
      }, [])

    const getReserves = () => {
        let tokenUser = localStorage.getItem("user")
        const user = sessionStorage.getItem("usuario")
        const user2 = JSON.parse(user.toString());
        console.log("CEDULA " +user2.idU);
        const url = 'https://muebleriaback.herokuapp.com/reserva/reservasPendientesCliente/' + user2.idU;
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization" : "Bearer " + tokenUser
            }
        })
            .then(response => response.json())
            .then(provider => {
                setReserves(provider)
                console.log(provider);
            })
            console.log("RESERVAS " + reserves);
    }

    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'codigo_reserva': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'cedula_cliente_reserva': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'fecha_creacion_reserva': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'fecha_recoger_reserva': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'nombre_cliente_reserva': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }, 
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {

        if (selectedReserve == null) {
            console.log(selectedReserve);
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                        <Service_RegisterProvider style='' />
                        <Button className='' ><i className='pi pi-trash icons-registerProduct'></i></Button>

                        <Service_EditReserve codeReserve={0} />
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre cliente reservado" />
                        </span>
                    
                    </div>
                </div>
            )
        } else {
            console.log(selectedReserve[0].codigo_reserva);
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                        
                        <Service_RegisterProvider style='' />
                        <Button className='' ><i className='pi pi-trash icons-registerProduct'></i></Button>
                        <Service_EditReserve codeReserve={selectedReserve[0].codigo_reserva} />
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre proveedor" />
                        </span>
                        

                    </div>
                </div>
            )
        }
    }
    const codeBodyTemplate = (reserve) => {
        return (
            <React.Fragment>
                <span className="text">{reserve.codigo_reserva}</span>
            </React.Fragment>
        );
    }

    useEffect(() => {
      getReserves()
    }, [])
    
    const header = renderHeader()
        return (
            <>
            <HeaderHome/>

            <div className='containerTitle'>
                <h1 className='titleReseves'>RESERVAS PENDIENTES</h1>
            </div>
            <div className='conter_car reserve-card container-reserve' id='conter_car'>
            
            {   
                
                reserves.map((item, index,) => (
            
                    <div >
            
                        <div className='car-product' style={{ position: 'relative' }}>

                            <div style={{ position: 'relative' }} className='content-card-m'>
                                <img className='img-cardGif' src={item.foto_producto_reserva} alt="" />
                                <div >
                                    <Modal classN='observar-m' url={item.foto_producto_reserva} name={item.fecha_creacion_reserva} description={item.fecha_recoger_reserva} press={item.estado_reserva} />
                                </div>
                            </div>
    
                            <div>
                                <h2 className='card-name-img'>{item.nombre_producto_reserva}</h2>
                            </div>
    
                            <div className='content-press'>
                                <h2 className='press'>{item.estado_reserva}</h2>
                             </div>
    
                        </div>
                        <div style={{width:'100%'}}>
                        </div>
    
                    </div>
    
                    // </div>
    
                ))
            }
        </div>
            <PageReservesExpired text="Ir a reservas expiradas" direction="/reservesExpired"/>
        </>    
        )
}
