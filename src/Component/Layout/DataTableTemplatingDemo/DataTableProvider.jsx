import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Service_UpdateProvider } from '../../../service/ServiceProvider/Service_UpdateProvider'
import { Service_RegisterProvider } from '../../../service/ServiceProvider/Service_RegisterProvider'
import { Button } from 'primereact/button'
import './DataTableDemo.css';
import { AiFillDelete } from 'react-icons/ai'
import { Service_DeleteProvider } from '../../../service/ServiceProvider/Service_DeleteProvider';

export const DataTableProvider = () => {

    const [value, setValue] = useState(false);
    let [selectedProvider, setSelectedProvider] = useState(null);
    const [provider, setProvider] = useState([]);
    const [emailUser, setEmailUser] = useState("");
    const [username, setUsername] = useState("");
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nombre_proveedor': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'cedula_proveedor': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'telefono_proveedor': { value: null, matchMode: FilterMatchMode.IN },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    let i = provider.length;
    useEffect(() => {
        listSuppliers()
        // const admin = sessionStorage.getItem("administrador")
        // const admin2 = JSON.parse(admin.toString());
        // document.getElementById("nameAccount").textContent = admin2.nameU

    }, [selectedProvider])

    function listSuppliers() {

        console.log("LISTANDO PROVEEDORES")
        const urlRegister = 'https://muebleriaback.herokuapp.com/proveedores/listaProveedores';
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(provider => setProvider(provider))
        setLoading(false)
    }

    function sendEmail() {
        console.log("ENTRO AL ENVIAR CORREO");
        console.log(emailUser);
        console.log(username);
        const URLEmail = "https://muebleriaback.herokuapp.com/producto/reservarProducto/" + emailUser + "/" + username
        fetch(URLEmail, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                codigo_producto: 1224,
                nombre_producto: "Prod",
                cantidad_producto: 1212,
                descripcion_producto: "sdsda",
                precio_producto: 1221.0,
                nombre_proveedor_producto: "Jhon",
                id_categoria: {
                    id_categoria: 19,
                    nombre_categoria: ""
                },
                foto_producto: "https://res.cloudinary.com/estivencloud/image/upload/v1660270263/images/mt4qrmfmfnwdgnu0dmb7.png"
            })
        })
            .then(response => response)
            .then(json => json.ok)
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    const inputSarch = () => {
        console.log("hola")
        setValue(true)
    }

    const renderHeader = () => {

        if (selectedProvider == null) {
            console.log("dfghjkjknhk.")
            console.log(selectedProvider + "fffffffffffffffff");
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>

                        <div className='button-header-tabla-demo'>
                            <Service_RegisterProvider style='' />
                            <Service_UpdateProvider codeProviderUpdate={0} />
                            <Button className='button-book' onClick={inputSarch}><AiFillDelete className='BooK' /></Button>

                        </div>

                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre proveedor" />
                        </span>

                    </div>
                </div>
            )
        } else {
            console.log(selectedProvider[0].cedula_proveedor + "oooooooooooooooooooo");
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                        
                        <div className='button-header-tabla-demo'>
                            <Service_RegisterProvider style='' />
                            <Service_UpdateProvider codeProviderUpdate={selectedProvider[0].cedula_proveedor} />
                            <Button className='button-book' onClick={inputSarch}><AiFillDelete className='BooK' /></Button>
                        </div>

                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre proveedor" />
                        </span>


                    </div>
                </div>
            )
        }
        /*
        return (
            <div className="flex justify-content-between align-items-center">
                <main>
                    <h5 className="m-0">Proveedores</h5>
                    <div className='botones'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Documento" />
                    </span>
                        <Service_RegisterProvider style='' />
                        <Service_Update codeProviderUpdate={0}  />
                        <Button className=''><i className='pi pi-trash icons-registerProvider '></i></Button>
                        <div></div>
                    </div>
                </main>
            </div>
        )
        */
    }

    const codeBodyTemplate = (provider) => {
        return (
            <React.Fragment>
                <span className="text">{provider.cedula_proveedor}</span>
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (provider) => {
        return provider.nombre_proveedor;
    }

    const amountBodyTemplate = (element) => {
        return element.telefono_proveedor;
    }

    const buttonDeleteTemplate = (provider) => {
        return (
            <Service_DeleteProvider id={provider.cedula_proveedor}/>
        );
    }

    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <div className="contentTheTable">
                {/* <div className="card">
            <div>
                <label htmlFor="">Correo</label>
                <input type="text" onChange={e => setEmailUser(e.target.value)}/>
                <br />
                <label htmlFor="">Nombre</label>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
                <button onClick={sendEmail}>Enviar</button>
            </div> */}
                <main>
                    <DataTable value={provider} paginator className="p-datatable-customers" header={header} rows={5} scrollHeight='400px'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id" rowHover onSelectionChange={e => setSelectedProvider(e.value)}
                        filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                        globalFilterFields={['nombre_proveedor', 'cedula_proveedor', 'telefono_proveedor']} emptyMessage="No se encontraron proveedores."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                        <Column field="cedula_proveedor" header="Documento" sortable filterField="cedula_proveedor" body={codeBodyTemplate} filter filterPlaceholder="Search by code" />
                        <Column field="nombre_proveedor" header="Nombre" sortable filter filterPlaceholder="Search by name" body={nameBodyTemplate} />
                        <Column field="telefono_proveedor" header="Telefono" sortable filter filterPlaceholder="Search by amount" body={amountBodyTemplate} />
                        <Column field="telefono_proveedor" header="Eliminar" sortable filter filterPlaceholder="Search by amount" body={buttonDeleteTemplate} />
                    </DataTable>
                </main>
            </div>
            {/* </div> */}
        </div>
    );
}
