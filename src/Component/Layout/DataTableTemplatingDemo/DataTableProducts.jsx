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
import {AiFillDelete} from 'react-icons/ai'
import { ServiceEnableProduct } from '../../../service/ServiceProduct/ServiceEnableProduct';

export const DataTableProducts = () => {

    const [seew, setSeew] = useState(false);

    const [value, setValue] = useState(false);
    let [selectedProducts, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nombre_producto': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'codigo_producto': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'amount': { value: null, matchMode: FilterMatchMode.IN },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'price': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'id_categoria.nombre_categoria': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    let i = products.length;
    useEffect(() => {
        listProducts()
        
        
        // const admin = sessionStorage.getItem("administrador")
        // const admin2 = JSON.parse(admin.toString());
        // document.getElementById("nameAccount").textContent = admin2.nameU

    }, [selectedProducts])

    function listProducts() {

        console.log("LISTANDO PRODUCTOS")
        const urlRegister = 'https://muebleriaback.herokuapp.com/producto/listaProductos';
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(product => setProducts(product))
        setLoading(false)
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        console.log(selectedProducts);
        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    const inputSarch = () => {
        console.log("hola")
        setValue(true)

    }
    const renderHeader = () => {
        if (selectedProducts == null) {
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                        <div className='button-header-tabla-demo'>
                            <Service_ProductRegis style='' />
                            <Service_Update codeProductUpdate={0} />
                            <Button className='button-book' onClick={inputSarch}><AiFillDelete className='Book'/></Button>
                        </div>
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre producto" />
                        </span>

                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                        <div className='button-header-tabla-demo'>
                            <Service_ProductRegis style='' />
                            <Service_Update codeProductUpdate={selectedProducts.codigo_producto} />
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


    const codeBodyTemplate = (product) => {
        return (
            <React.Fragment>
                <span className="text">{product.codigo_producto}</span>
            </React.Fragment>
        );
    }

    const imageBodyTemplate = (product) => {
        return (
            <React.Fragment>
                <Image template={<i className='pi pi-eye eye'></i>} preview={true} alt="ImagenMuebleria" src={product.foto_producto} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width='100%' height='100%' style={{ verticalAlign: 'middle' }} className='product-image' />
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (product) => {
        return product.nombre_producto;
    }

    const supplierNameBodyTemplate = (product) => {
        return product.nombre_proveedor_producto;
    }

    const amountBodyTemplate = (element) => {
        return element.cantidad_producto;
    }

    const descriptionBodyTemplate = (element) => {
        return element.descripcion_producto;
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const priceBodyTemplate = (element) => {
        return formatCurrency(element.precio_producto);
    }

    const enableButtonTemplate = (product) => {
        if(product.estado == "1"){
            return (
                <ServiceEnableProduct id={product.codigo_producto} text="Deshabilitar"/>
            )
        }else{
            return (
                <ServiceEnableProduct id={product.codigo_producto} text="Habilitar"/>
            )
        }
    }

    const categoryBodyTemplate = (element) => {
        let name_category = "";
        if (element.id_categoria == null) {
            name_category = "Sin categoria"
            return name_category;
        } else {
            name_category = element.id_categoria.nombre_categoria
            return name_category;
        }
    }

    const productFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <div className="mb-3 font-bold">Agent Picker</div>
                <MultiSelect value={options.value} options={products} itemTemplate={productsItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
            </React.Fragment>
        );
    }

    const productsItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt="Muebles" src={option.foto_producto} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
            </div>
        );
    }



    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <div className="contentTheTable">
                <DataTable value={products} paginator className="p-datatable-customers" header={header} rows={3} scrollHeight='400px'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[5, 10, 15]}
                    dataKey="id" rowHover onSelectionChange={e => setSelectedProduct(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['nombre_producto', 'codigo_producto', 'cantidad_producto', 'descripcion_producto', 'precio_producto', 'id_categoria.nombre_categoria', 'nombre_proveedor_producto']} emptyMessage="No se encontraron productos."
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos">
                    <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                    <Column field="codigo_producto" header="Codigo" sortable body={codeBodyTemplate} />
                    <Column field="nombre_producto" header="Nombre" sortable body={nameBodyTemplate} />
                    <Column field="cantidad_producto" header="Cantidad" sortable body={amountBodyTemplate} />
                    <Column field="descripcion_producto" header="Descripcion" sortable sortField='descripcion_producto' body={descriptionBodyTemplate} />
                    <Column field="precio_producto" header="Precio" sortable filterField="price" body={priceBodyTemplate} />
                    <Column header="Imagen producto" sortable sortField="foto_producto" filterField="foto" body={imageBodyTemplate} />
                    <Column field="id_categoria.nombre_categoria" header="Categoria" sortable filterPlaceholder="Search by name" body={categoryBodyTemplate} />
                    <Column field="nombre_proveedor_producto" header="Proveedor" sortable showFilterMatchModes={false} body={supplierNameBodyTemplate} />
                    <Column field="nombre_proveedor_producto" header="Habilitar o Deshabilitar" sortable showFilterMatchModes={false} body={enableButtonTemplate} />
                </DataTable>
            </div>
        </div>
    );
}
