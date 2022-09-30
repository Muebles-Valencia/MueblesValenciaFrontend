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
import{Image} from 'primereact/image'
import { ServicieRegisterProximos } from '../../../service/ServicieProximos/ServicieRegisterProximos';
import { ServicieArriveProduct } from '../../../service/ServicieProximos/ServicieArriveProduct';
import { ServiceDeleteComingSoon } from '../../../service/ServicieProximos/ServiceDeleteComingSoon';
export const DataTableComingsoon = () => {

    const [seew, setSeew] = useState(false);

    const [value, setValue] = useState(false);
    let [selectedProximos, setSelectedProximos] = useState(null);
    const [products, setProducts] = useState([]);
    
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nombre_producto': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'codigo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'amount': { value: null, matchMode: FilterMatchMode.IN },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'price': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        // 'id_categoria.nombre_categoria': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
   
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    let i = products.length;
    
    useEffect(() => {
        listProximos()

        // const admin = sessionStorage.getItem("administrador")
        // const admin2 = JSON.parse(admin.toString());
        // document.getElementById("nameAccount").textContent = admin2.nameU

    }, [selectedProximos])

    function listProximos() {
        console.log(".l.")
        console.log("LISTANDO Proximo")
        const url = 'https://muebleriaback.herokuapp.com/proximos/listaProximos';
        fetch(url, {
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
        console.log(selectedProximos);
        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const inputSarch = () => {
        console.log("hola")
        setValue(true)

    }

    const renderHeader = () => {
        if (selectedProximos == null) {
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                        <div className='button-header-tabla-demo'>
                            <ServicieRegisterProximos style='' />
                            <ServicieArriveProduct cod={0}></ServicieArriveProduct>
                            <ServiceDeleteComingSoon cod={0}/>
                        </div>
                        
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nombre producto" />
                        </span>
                    
                    </div>
                </div>
            )
        } else {
            // searchProduct(selectedProximos.codigo)
            return (
                <div className="flex justify-content-between align-items-center">
                    <div className='buttons'>
                       <div className='button-header-tabla-demo'>
                            <ServicieRegisterProximos style='' />
                            <ServicieArriveProduct cod={selectedProximos.codigo}></ServicieArriveProduct>
                            <ServiceDeleteComingSoon cod={selectedProximos.codigo}/>
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
                <span className="text">{product.codigo}</span>
            </React.Fragment>
        );
    }

    const imageBodyTemplate = (product) => {
        return (
            <React.Fragment>
                <Image template={<i className='pi pi-eye eye'></i>} preview={true}  alt="ImagenMuebleria" src={product.imagen_producto} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width='100%' height='100%' style={{ verticalAlign: 'middle' }} className='product-image' />
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (product) => {
        return product.nombre_producto;
    }

    // const supplierNameBodyTemplate = (product) => {
    //     return product.nombre_proveedor_producto;
    // }

    // const amountBodyTemplate = (element) => {
    //     return element.cantidad_producto;
    // }

    const descriptionBodyTemplate = (element) => {
        return element.descripcion;
    }

    const formatCurrency = (value) => {
        // return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const priceBodyTemplate = (element) => {
        return element.precioProducto;
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
                <img alt="Muebles" src={option.imagen_producto} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
            </div>
        );
    }



    const header = ()=>{
       return renderHeader()
    };

    return (
        <div className="datatable-doc-demo">
            <div className="contentTheTable">
                <DataTable value={products} paginator className="p-datatable-customers" header={header}  rows={3} scrollHeight='400px'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[5, 10, 15]}
                    dataKey="id2" rowHover onSelectionChange={e => setSelectedProximos(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['nombre_producto', 'codigo_producto', 'cantidad_producto', 'descripcion_producto', 'precio_producto', 'id_categoria.nombre_categoria', 'nombre_proveedor_producto']} emptyMessage="No se encontraron productos."
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos">
                    {/* <Column selectionMode='multiple' headerStyle={{ width: '3em' }}></Column> */}
                    <Column selectionMode="single"></Column>
                    <Column field="codigo_producto" header="Codigo" sortable body={codeBodyTemplate} className='column-descrition'/>
                    <Column field="nombre_producto" header="Nombre" sortable body={nameBodyTemplate} />
                    {/* <Column field="cantidad_producto" header="Cantidad" sortable body={amountBodyTemplate} /> */}
                    <Column field="descripcion_producto" header="Descripcion" sortable sortField='descripcion_producto' className='column-descrition' body={descriptionBodyTemplate} />
                    <Column field="precio_producto" header="Precio" sortable filterField="price" className='column-descrition' body={priceBodyTemplate} />
                    <Column header="Imagen producto" sortable sortField="foto_producto" filterField="foto" body={imageBodyTemplate} />
                    
                </DataTable>
            </div>
        </div>
    );
}
