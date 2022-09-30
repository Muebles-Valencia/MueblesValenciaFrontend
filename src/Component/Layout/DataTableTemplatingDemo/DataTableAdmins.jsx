import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import './DataTableDemo.css';
import { Service_RegisterAdmin } from '../../../service/ServiceAdmin/Service_RegisterAdmin';
import { NavigationAdmin } from '../NavigationAdmin/NavigationAdmin';
import { Service_UpdateAdmin } from '../../../service/ServiceAdmin/Service_UpdateAdmin';
import { Service_DeleteAdmin } from '../../../service/ServiceAdmin/Service_DeleteAdmin';
import { HeaderDataTables } from '../../Ui/HeaderDataTables/HeaderDataTables'
import { FooterMain } from '../../Ui/FooterMain/FooterMain';

export const DataTableAdmins = () => {

    const [value, setValue] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [admins, setAdmins] = useState([]);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'codigo_administrador': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'nombre_administrador': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'correo_administrador': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listAdmins()
        //=================no me funciona con esto======================================
        // const admin = sessionStorage.getItem("administrador")
        // const admin2 = JSON.parse(admin.toString());
        // document.getElementById("nameAccount").textContent = admin2.nameU

    }, [selectedAdmin])

    function listAdmins() {

        console.log("LISTANDO ADMINS")
        const urlRegister = 'https://muebleriaback.herokuapp.com/administradores/consultarTodosLosAdministradores';
        let tokenAdmin = localStorage.getItem('admin')
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + tokenAdmin
            }
        })
            .then(response => response.json())
            .then(adm => setAdmins(adm))
        console.log(admins);
        setLoading(false)
    }


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        console.log(selectedAdmin);
        setFilters(_filters);
        setGlobalFilterValue(value);
    }


    const renderHeader = () => {
        if (selectedAdmin == null) {
            console.log("eee" + selectedAdmin)
            return (

                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>

                        <div className='button-header-tabla-demo'>
                            <Service_RegisterAdmin className='button-header-tabla-demo' />
                            <Service_UpdateAdmin codeAdminUpdate={0} />
                        </div>

                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre Admin" />
                        </span>

                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>

                        <div className='button-header-tabla-demo'>
                            <Service_RegisterAdmin style='' />
                            <Service_UpdateAdmin codeAdminUpdate={selectedAdmin[0].codigo_administrador} />
                        </div>

                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre Admin" />
                        </span>


                    </div>
                </div>
            )
        }
    }

    const codeBodyTemplate = (admns) => {
        return (
            <React.Fragment>
                <span className="text">{admns.codigo_administrador}</span>
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (admns) => {
        return admns.nombre_administrador;
    }

    const emailBodyTemplate = (admns) => {
        return admns.correo_administrador;
    }

    const btnDeleteBodyTemplate = (admns) => {
        console.log("BTN DELETE " + admns.codigo_administrador);
        return (
            <Service_DeleteAdmin codeAdmin={admns.codigo_administrador} />
        )
    }

    const header = renderHeader();

    return (
        <div>
            <HeaderDataTables text={<h1>Gestión Administrativa</h1>} />
            <div className="datatable-doc-demo">
                <div className="contentTheTable">
                    <DataTable value={admins} paginator className="p-datatable-customers" header={header} rows={5} scrollHeight='400px'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id" rowHover onSelectionChange={e => setSelectedAdmin(e.value)}
                        filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                        globalFilterFields={['codigo_administrador', 'nombre_administrador', 'correo_administrador']} emptyMessage="No se encontraron categorias."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                        <Column field="codigo_administrador" header="Codigo Administrador" sortable filterField="id_categoria" body={codeBodyTemplate} filterPlaceholder="Search by code" />
                        <Column field="nombre_administrador" header="Nombre Administrador" sortable filterPlaceholder="Search by name" body={nameBodyTemplate} />
                        <Column field="correo_administrador" header="Correo Administrador" sortable filterPlaceholder="Search by name" body={emailBodyTemplate} />
                        <Column field='eliminar' header='Eliminar Administrador' body={btnDeleteBodyTemplate} />
                    </DataTable>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'red' }}>
                <FooterMain></FooterMain>
            </div>
        </div>
    );
}
