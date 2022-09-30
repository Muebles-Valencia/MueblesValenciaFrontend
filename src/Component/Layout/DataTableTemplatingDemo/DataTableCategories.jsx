import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import './DataTableDemo.css';
import { Service_Update } from '../../../service/ServiceProduct/Service_Update';
import { Service_ProductRegis } from '../../../service/ServiceProduct/Service_ProductRegis'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import { Service_RegisterCategories } from '../../../service/ServiceCategories/Service_RegisterCategories';
import { Service_UpdateCategories } from '../../../service/ServiceCategories/Service_UpdateCategories';
import {AiFillDelete} from 'react-icons/ai'

export const DataTableCategories = () => {

    const [value, setValue] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nombre_categoria': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'id_categoria': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listCategory()

        //====================nome funciona con esto================
        // const admin = sessionStorage.getItem("administrador")
        // const admin2 = JSON.parse(admin.toString());
        // document.getElementById("nameAccount").textContent = admin2.nameU

    }, [selectedCategories])

    function listCategory() {

        console.log("LISTANDO CATEGORIAS")
        const urlRegister = 'https://muebleriaback.herokuapp.com/categorias/listarCategorias';
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(categories => setCategories(categories))
        console.log(categories);
        setLoading(false)
    }


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        console.log(selectedCategories);
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
    const inputSarch = () => {
        console.log("hola")
        setValue(true)

    }

    const renderHeader = () => {
        if (selectedCategories == null) {
            console.log("eee" + selectedCategories)
            return (

                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>

                        <div className='button-header-tabla-demo'>
                            <Service_RegisterCategories style='' />
                            <Service_UpdateCategories codeCategoriUpdate={0} />
                            <Button className='button-book' onClick={inputSarch}><AiFillDelete className='Book'/></Button>
                        </div>

                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre Categoria" />
                        </span>

                    </div>
                </div>
            )
        } else {
            console.log("aaa" + selectedCategories[0].id_categoria)
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                        <div className='button-header-tabla-demo'>
                            <Service_RegisterCategories style='' />
                            <Service_UpdateCategories codeCategoriUpdate={selectedCategories[0].id_categoria} />
                            <Button className='button-book' onClick={inputSarch}><AiFillDelete className='Book'/></Button>

                        </div>
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre producto" />
                        </span>


                    </div>
                </div>
            )
        }
    }

    const codeBodyTemplate = (categories) => {
        return (
            <React.Fragment>
                <span className="text">{categories.id_categoria}</span>
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (categories) => {
        return categories.nombre_categoria;
    }


    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <div className="contentTheTable">
                <DataTable value={categories} paginator className="p-datatable-customers" header={header} rows={5} scrollHeight='400px'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10, 25, 50]}
                    dataKey="id" rowHover onSelectionChange={e => setSelectedCategories(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['nombre_categoria', 'id_categoria']} emptyMessage="No se encontraron categorias."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="id_categoria" header="Codigo" sortable filterField="id_categoria" body={codeBodyTemplate} filter filterPlaceholder="Search by code" />
                    <Column field="nombre_categoria" header=" Nombre" sortable filter filterPlaceholder="Search by name" body={nameBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
}
