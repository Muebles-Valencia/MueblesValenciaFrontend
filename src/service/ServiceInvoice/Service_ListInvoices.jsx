import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import '../../Component/Layout/DataTableTemplatingDemo/DataTableDemo.css';
import { Button } from 'primereact/button'
import{Image} from 'primereact/image'
import { ListInvoicesPerClient } from './ListInvoicesPerClient';
import { NavHome } from '../../Component/Layout/NavHome/NavHome';
import { NavBar } from '../../Component/Layout/SubHeader/NavBar';
import { Logo } from '../../Component/Ui/Logo/Logo';
import { FooterMain } from '../../Component/Ui/FooterMain/FooterMain';
import { HeaderHome } from '../../Component/Layout/HeaderHome/HeaderHome';


export const Service_ListInvoices = () => {

    const [value, setValue] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'codigo_factura': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'cantidad_producto': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'direccion_cliente': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'fecha_factura': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'nombre_cliente': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'nombre_producto': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'telefono_cliente': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'total_a_pagar': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'cedula_cliente': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listInvoices()
    }, [selectedInvoice])

    function listInvoices() {
        console.log("LISTANDO CATEGORIAS")
        const user = sessionStorage.getItem("usuario")
        const user2 = JSON.parse(user.toString());
        console.log("CEDULA " +user2.idU);
        const urlRegister = 'https://muebleriaback.herokuapp.com/facturas/facturasCliente/' + user2.idU;
        let tokenAdmin = localStorage.getItem('user')
        if (tokenAdmin == "" || tokenAdmin == null) {
            alert("Por favor registrese")
        }else{ 
          fetch(urlRegister, {
              method: 'GET',
              headers: {
                  "Content-type": "application/json"
              }
          })
              .then(response => response.json())
              .then(invoice => setInvoices(invoice))
          console.log(invoices);
          setLoading(false)
        }
    }


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        console.log(selectedInvoice);
        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    /*
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }*/
    const renderHeader = () => {
            if (selectedInvoice == null) {
                console.log("eee "+ selectedInvoice)
                return (
                    
                    <div className="flex justify-content-between align-items-center">
                        <div className='buttons'>
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre cliente en factura" />
                            </span>
                        
                        </div>
                    </div>
                )
            } else {
                console.log("aaa "+selectedInvoice[0].codigo_factura)
                return (
                    <div className="flex justify-content-between align-items-center">
                        <div className='buttons'>
                            
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre cliente en factura" />
                            </span>
          
                        </div>
                    </div>
                )
            }
    }

    const codeBodyTemplate = (invoicesT) => {
        return (
            <React.Fragment>
                <span className="text">{invoicesT.codigo_factura}</span>
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (invoicesT) => {
        return invoicesT.nombre_cliente;
    }

    const amountBodyTemplate = (invoicesT) => {
      return invoicesT.cantidad_producto;
    }
    
    const addressBodyTemplate = (invoicesT) => {
      return invoicesT.direccion_cliente;
    }
    
    const downloadBodyTemplate = (invoicesT) => {
      return (
       <ListInvoicesPerClient codeInvoice={invoicesT.codigo_factura}/> 
      )
    }

    const dateBodyTemplate = (invoicesT) => {
      return invoicesT.fecha_factura;
    }
    
    const nameProductoBodyTemplate = (invoicesT) => {
      return invoicesT.nombre_producto;
    }
    
    const cellphoneNumberBodyTemplate = (invoicesT) => {
      return invoicesT.telefono_cliente;
    }
    
    const totalPriceBodyTemplate = (invoicesT) => {
      return invoicesT.total_a_pagar;
    }
    
    const idBodyTemplate = (invoicesT) => {
      return invoicesT.cedula_cliente;
    }
    
    const header = renderHeader();
/*<div style={{width:'184px',}}>
                      <Logo classN="title-main" />
                    </div>
                <NavHome />*/
    return (
        <div>
            <HeaderHome/>
            <br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br />
            <div className="datatable-doc-demo">
                    <DataTable value={invoices} paginator className="p-datatable-customers" header={header} rows={5}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id" rowHover onSelectionChange={e => setSelectedInvoice(e.value)}
                        filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                        globalFilterFields={['codigo_factura', 'cantidad_producto', 'direccion_cliente' , 'fecha_factura' , 'nombre_cliente' , 'nombre_producto' , 'telefono_cliente' , 'total_a_pagar' , 'cedula_cliente']} emptyMessage="No se encontraron categorias."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column selectionMode="multiple" headerStyle={{ width: '1em' }}></Column>
                        <Column field="codigo_factura" header="Codigo" sortable filterField="id_categoria" body={codeBodyTemplate} filterPlaceholder="Search by code" />
                        <Column field="nombre_cliente" header="Nombre Cliente" sortable  filterPlaceholder="Search by name" body={nameBodyTemplate}/>
                        <Column field="cedula_cliente" header="Cedula Cliente" sortable  filterPlaceholder="Search by name" body={idBodyTemplate}/>
                        <Column field="direccion_cliente" header="Direccion Cliente" sortable filterPlaceholder="Search by name" body={addressBodyTemplate}/>
                        <Column field="telefono_cliente" header="Telefono Cliente" sortable  filterPlaceholder="Search by name" body={cellphoneNumberBodyTemplate}/>
                        <Column field="nombre_producto" header="Nombre Producto" sortable  filterPlaceholder="Search by name" body={nameProductoBodyTemplate}/>
                        <Column field="cantidad_producto" header="Cantidad Producto" sortable  filterPlaceholder="Search by name" body={amountBodyTemplate}/>
                        <Column field="fecha_factura" header="Fecha creacion de factura" sortable  filterPlaceholder="Search by name" body={dateBodyTemplate}/>
                        <Column field="total_a_pagar" header="Total a pagar" sortable filterPlaceholder="Search by name" body={totalPriceBodyTemplate}/>
                        <Column field="descarga" header="Descargar factura" sortable filterPlaceholder="Search by name" body={downloadBodyTemplate}/>
                    </DataTable>
            </div>
        </div>
    );
}
