
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './DataTableDemo.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

export const DataTableTemplatingDemo = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'amount': { value: null, matchMode: FilterMatchMode.IN },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'price': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
    function listProducts() {

        console.log("LISTANDO PRODUCTOS")
        const urlRegister = 'https://muebleriaback.herokuapp.com/producto/listaProductos';
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(product => setProducts(product))
            console.log(products);
            setLoading(false)
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const codeBodyTemplate = (element) => {
        return element.codigo_producto;
    }

    const supplierNameBodyTemplate = (element) => {
        return element.nombre_proveedor_producto;
    }

    const nameBodyTemplate = (element) => {
        return element.nombre_producto;
    }

    const amountBodyTemplate = (element) => {
        return element.cantidad_producto;
    }

    const priceBodyTemplate = (element) => {
        return formatCurrency(element.precio_producto);
    }

    const descriptionBodyTemplate = (element) => {
        return element.descripcion_producto;
    }

    const imageBodyTemplate = (element) => {
        return <img src={element.foto_producto} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt="imgProd" className="product-image" />;
    }

    const categoryBodyTemplate = (element) => {
        return element.id_categoria.nombre_categoria;
    }

    let i = products.length;
    useEffect(() => {
        listProducts()
        const admin = sessionStorage.getItem("administrador")
        const admin2 = JSON.parse(admin.toString());
        document.getElementById("nameAccount").textContent = admin2.nameU

    }, [i])
    
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Productos</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Palabras Clave" />
                    <button onClick={mostrar}>Boton</button>
                </span>
            </div>
        )
    }
    
    const codeFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <div className="mb-3 font-bold">Code Picker</div>
                <MultiSelect value={options.code} options={products} itemTemplate={productsItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
            </React.Fragment>
        );
    }

    const productsItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <span className="image-text">{option.codigo_producto}</span>
            </div>
        );
    }

    const mostrar = () => {
        console.log(selectedProducts);
    }

    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
        <div className="card">
            <DataTable value={products} paginator className="p-datatable-customers" header={header} rows={5}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[5,10,15]}
                dataKey="id" rowHover selection={selectedProducts} onSelectionChange={e => setSelectedProducts(e.value)}
                globalFilterFields={['name', 'product.code', 'amount', 'description', 'price']} filterDisplay="menu" responsiveLayout="scroll"  filters={filters} loading={loading} emptyMessage="No se han encontrado productos."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" body={nameBodyTemplate}/>
                <Column field="code" header="Codigo" sortable sortField="product.code" filterField="code" body={codeBodyTemplate} showFilterMatchModes={false} filter filterElement={codeFilterTemplate}/>
                <Column field="amount" header="Cantidad" sortable filterField="product.code" body={amountBodyTemplate} filter filterPlaceholder="Search by country"  />
                <Column field="description" header="Descripcion" sortable filter filterPlaceholder="Search by name" body={descriptionBodyTemplate}/>
                <Column field="price" header="Precio" sortable filterField="price" body={priceBodyTemplate}/>
                <Column field="image" header="Imagen" body={imageBodyTemplate} />
                <Column field="category" header="Categoria" body={categoryBodyTemplate}/>
                <Column field='nameSupplier' header='Nombre Proveedor' body={supplierNameBodyTemplate} />
            </DataTable>
        </div>
    </div>
    );
}
                 