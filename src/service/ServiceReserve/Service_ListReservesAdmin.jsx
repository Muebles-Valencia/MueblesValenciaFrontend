import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import '../../Component/Layout/DataTableTemplatingDemo/DataTableDemo.css'
import { Servicie_DeleteReserve } from './Service_DeleteReserve';
import { Service_EditReserve } from './Service_EditReserve';
import { PageReservesExpired } from '../../Component/Page/PageReservesExpired/PageReservesExpired';
import { Service_ChangeStateReserve } from './Service_ChangeStateReserve';
import { HeaderDataTables } from '../../Component/Ui/HeaderDataTables/HeaderDataTables';
import { FooterMain } from '../../Component/Ui/FooterMain/FooterMain';

export const Service_ListReservesAdmin = () => {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [reserves, setReserves] = useState([])
    let [selectedReserve, setReserveSelected] = useState(null);
    const getReserves = () => {
        let tokenAdmin = localStorage.getItem("admin")
        const url = 'https://muebleriaback.herokuapp.com/reserva/listarReservasPendientes';
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + tokenAdmin
            }
        })
            .then(response => response.json())
            .then(provider => setReserves(provider))
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

    const renderFooter = () => {
        return (
            <PageReservesExpired text="Ir a expiradas" direction="/reservesExpiredAdmin" />
        )
    }

    const renderHeader = () => {

        if (selectedReserve == null) {
            console.log(selectedReserve);
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                        <div className='button-header-tabla-demo'>
                            <Servicie_DeleteReserve codigo={0} className='button-book' />
                            <Service_EditReserve codeReserve={0} />
                        </div>

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
                        <div className='button-header-tabla-demo'>
                            <Service_EditReserve codeReserve={selectedReserve[0].codigo_reserva} className='button-book' />
                            <Servicie_DeleteReserve codigo={selectedReserve[0].codigo_reserva} />
                        </div>

                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre cliente reservado" />
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

    const imageBodyTemplate = (reserve) => {
        return (
            <React.Fragment>
                <Image template={<i className='pi pi-eye eye'></i>} preview={true} alt="ImagenMuebleria" src={reserve.foto_producto_reserva} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width='100%' height='100%' style={{ verticalAlign: 'middle' }} className='product-image' />
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (reserve) => {
        return reserve.nombre_cliente_reserva;
    }

    const changeStateBodyTemplate = (reserve) => {
        return (
            <Service_ChangeStateReserve code={reserve.codigo_reserva} text="Cambiar a expirada" />
        );
    }

    const dateCreateReserve = (reserve) => {
        return reserve.fecha_creacion_reserva;
    }

    const dateFinalReserve = (reserve) => {
        return reserve.fecha_recoger_reserva;
    }

    const identificationClientTemplate = (reserve) => {
        return reserve.cedula_cliente_reserva;
    }

    const stateReserveTemplate = (reserve) => {
        return reserve.estado_reserva;
    }

    const reservesExpiredTemplate = (reserve) => {
        return <PageReservesExpired />;
    }

    useEffect(() => {
        getReserves()
        // const admin = sessionStorage.getItem("administrador")
        // const admin2 = JSON.parse(admin.toString());
        // document.getElementById("nameAccount").textContent = admin2.nameU
    }, [selectedReserve])

    const header = renderHeader()
    const footer = renderFooter()

    if (reserves == null) {
        return (
            <div>
                <h1>NO SE ENCONTRARON RESERVES</h1>
            </div>
        )
    } else {
        return (
            <>
                <HeaderDataTables text={<h1>Reservas Pendientes</h1>} />
                <div className="datatable-doc-demo">
                    <div className="contentTheTable">
                        <main>
                            <DataTable value={reserves} paginator className="p-datatable-customers" footer={footer} header={header} rows={5}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10, 25, 50]}
                                dataKey="id" rowHover onSelectionChange={e => setReserveSelected(e.value)}
                                filters={filters} filterDisplay="menu" responsiveLayout="scroll"
                                globalFilterFields={['codigo_reserva', 'cedula_cliente_reserva', 'fecha_creacion_reserva', 'fecha_recoger_reserva', 'nombre_cliente_reserva']} emptyMessage="No se encontraron reservas."
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                                <Column field="codigo_reserva" header="Codigo Reserva" sortable filterField="codigo_reserva" body={codeBodyTemplate} filterPlaceholder="Search by code" />
                                <Column field="nombre_cliente_reserva" header="Nombre Cliente Reserva" sortable filterPlaceholder="Search by name" body={nameBodyTemplate} />
                                <Column field="cedula_cliente_reserva" header="Cedula Cliente Reserva" sortable filterPlaceholder="Search by name" body={identificationClientTemplate} />
                                <Column field="fecha_creacion_reserva" header="Fecha creacion de la reserva" sortable filterPlaceholder="Search by amount" body={dateCreateReserve} />
                                <Column field="fecha_recoger_reserva" header="Fecha recoge reserva" sortable filterPlaceholder="Search by amount" body={dateFinalReserve} />
                                <Column field="foto_producto_reserva" header="Producto reservado" sortable filterPlaceholder="Search by amount" body={imageBodyTemplate} />
                                <Column field="estado_reserva" header="Estado reserva" sortable filterPlaceholder="Search by amount" body={stateReserveTemplate} />
                                <Column field="cambiarEstado" header="Cambiar estado" sortable filterPlaceholder="Search by amount" body={changeStateBodyTemplate} />
                            </DataTable>
                        </main>
                    </div>
                    {/* </div> */}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', background: 'red' }}>
                    <FooterMain></FooterMain>
                </div>
            </>
        )
    }

}
