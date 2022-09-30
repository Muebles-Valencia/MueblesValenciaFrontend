import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioGroup } from 'rsuite';
import { InputNumber } from 'primereact/inputnumber';
import './css/registerProduct.css'
import { FaUserEdit } from 'react-icons/fa'
import { FormGroup } from 'reactstrap'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const Service_Update = ({ codeProductUpdate }) => {

    const [productSearch, setProducts] = useState(null);
    const [visible, setVisible] = useState(false);
    const [image, setImageProduct] = useState("");
    const [loading, setLoading] = useState(true);
    const [name_supplier_product, setNameSupplierProduct] = useState("")
    const [code, setCodeProduct] = useState(0)
    const [idCategory, setIdCategory] = useState(0)
    const [nameCategory, setNameCategory] = useState("")
    const [product, setProductos] = useState("")

    function searchProduct() {
        console.log("buscarproducto")
        const urlRegister = 'https://muebleriaback.herokuapp.com/producto/buscar/' + codeProductUpdate;
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(product => guardarProduc(product))
        setLoading(false)
    }

    const guardarProduc = (prod) => {
        console.log("guardarP")
        setProductos(prod)
        setCodeProduct(prod.codigo_producto)
        setImageProduct(prod.foto_producto)
        checkCategories()
        checkSuppliers()
    }



    function listCategories() {
        const urlRegister = 'https://muebleriaback.herokuapp.com/categorias/listarCategorias';
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(categories => createSelectElementsCategories(categories))
    }


    const setDataCategory = (category) => {
        console.log(category);
        fetch("https://muebleriaback.herokuapp.com/producto/consultarCategoria/" + category, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(product => {
                setNameCategory(product.nombre_categoria);
                setIdCategory(product.id_categoria)
            })
    }

    const createSelectElementsCategories = (categoriesList) => {
        let i = 0;
        const selectContainer = document.getElementById("selectContainerCategories");
        const optionSelect = document.createElement("option")
        optionSelect.textContent = "";
        optionSelect.setAttribute("value", "Vacio")
        selectContainer.appendChild(optionSelect)
        while (i <= categoriesList.length) {
            categoriesList.forEach(element => {
                const optionSelect2 = document.createElement("option")
                console.log("ELEMENT CATEGORY: " + element.nombre_categoria);
                optionSelect2.textContent = element.nombre_categoria;
                optionSelect2.setAttribute("value", element.id_categoria)
                // optionSelect.setAttribute("onClick",catchSupplierName(optionSelect))
                selectContainer.appendChild(optionSelect2)
                i++
            })
            break;
        }
    }

    const seew = () => {

        if (visible == false) {
            searchProduct()
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    function editProduct() {
        console.log("estoy registrando un producto")
        const name_product = document.getElementById("inputName").value
        const description = document.getElementById("inputDescription").value
        const price = document.getElementById("inputPrice").value
        const amount = document.getElementById("inputAmount").value
        console.log(name_supplier_product);
        const urlRegister = 'https://muebleriaback.herokuapp.com/producto/actualizar/' + codeProductUpdate;
        let tokenAdmin = localStorage.getItem('admin')
        if (tokenAdmin == "" || tokenAdmin == null) {
            alert("Por favor registrese")
        } else {
            fetch(urlRegister, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + tokenAdmin
                },
                body: JSON.stringify({
                    codigo_producto: code,
                    nombre_producto: name_product,
                    descripcion_producto: description,
                    precio_producto: price,
                    cantidad_producto: amount,
                    foto_producto: image,
                    id_categoria: {
                        id_categoria: idCategory,
                        nombre_categoria: nameCategory
                    },
                    nombre_proveedor_producto: name_supplier_product
                })
            })
                .then(response => response.json())
                .then(json => {
                    if (json.ok) {
                        alert("Actualizacion Exitosa")
                    } else {
                        alert("Actualizacion Exitosa")
                    }
                })
        }
    }

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
            .then(supplier => createSelectElements(supplier))
    }

    const createSelectElements = (supplierList) => {
        console.log(supplierList.length);
        let i = 0;
        const selectContainer = document.getElementById("selectContainer");
        const optionSelect = document.createElement("option")
        optionSelect.textContent = "";
        optionSelect.setAttribute("value", "")
        selectContainer.appendChild(optionSelect)
        while (i <= supplierList.length) {
            supplierList.forEach(element => {
                const optionSelect2 = document.createElement("option")
                console.log("ELEMENT: " + element.nombre_proveedor);
                optionSelect2.textContent = element.nombre_proveedor;
                optionSelect2.setAttribute("value", element.nombre_proveedor)
                selectContainer.appendChild(optionSelect2)
                i++
            })
            break;
        }
    }

    function checkCategories() {
        while (document.getElementById('selectContainerCategories').lastChild) {
            document.getElementById('selectContainerCategories').removeChild(document.getElementById('selectContainerCategories').lastChild)
        }
        listCategories();
    }

    function checkSuppliers() {
        while (document.getElementById('selectContainer').lastChild) {
            document.getElementById('selectContainer').removeChild(document.getElementById('selectContainer').lastChild)
        }
        listSuppliers();
    }

    const uploadimage = async (e) => {
        console.log("entro")
        const files = e.target.files;
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "images");
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/estivencloud/image/upload",
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json();
        console.log(res)
        console.log(idCategory);
        setImageProduct(file.secure_url)
        setLoading(false)
    }
    const header = (
        <div className='div-update'>
            Editar Productos
        </div>
    )
    /*<div id='dataProductsContainer' className='dataProductsContainer'></div>
    <div className='barra-desplegable'>
    */
    return (
        <>
            <Button className='button-book' onClick={() => seew(seew)}><FaUserEdit className='BooK' /></Button>
            <Dialog header={header} visible={visible} modal onHide={seew} style={{ width: '30em', bordeRadius: '100%' }} className='dialogoRegisterProduct' >

                <div className='content-image'>
                    <FormGroup className='cont-Register-product-2'>
                        <div className='form2'>
                            
                            <InputText id='inputName' type='text' className='input-register box' placeholder={product.nombre_producto} />
                            <InputTextarea id='inputDescription' placeholder={product.descripcion_producto} className='input-text-area box'></InputTextarea>
                    

                            <div className='cantidad'>
                                <InputText type='number' id='inputPrice' className='input-register-price box' placeholder={product.precio_producto} />
                                <InputText type='number' id='inputAmount' className='input-quantyti box' placeholder={product.cantidad_producto} />
                            </div>


                            <div className='optionsProdu'>

                                <div className='category'>
                                    <div>
                                        <div className='paredCategories'></div>
                                        <select name="selectContainerCategories" id="selectContainerCategories" onChange={e => setDataCategory(e.target.value)} className='radioGroup'>
                                        </select>
                                    </div>
                                    <div id='labelGroup' className='labelGroup'> </div>
                                </div>

                                <div className='selecProvider'>
                                    <div className='paredProvider'></div>
                                    <select name='selectContainer' id='selectContainer' onChange={e => setNameSupplierProduct(e.target.value)} className='radioGroup' >
                                    </select>
                                </div>
                            </div>

                            <div className='button-save-Product'>
                                <Button onClick={editProduct}  >Guardar</Button>
                            </div>
                        </div>

                    </FormGroup>




                    <div className='content-img-download-input'>
                        <input className='input-img-download' id='catch' type='file' name='file' placeholder='subirImg' onChange={uploadimage} />
                        <div className='content-imag-2'>
                            {loading == true ? <AiOutlineLoading3Quarters className='loadig' /> : <img className='img-product-download' src={image} />}

                        </div>

                    </div>
                </div>


            </Dialog>
        </>
    )
}
