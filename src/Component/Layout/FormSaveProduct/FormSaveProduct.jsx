import React, { useState, useEffect } from 'react'
import { FormGroup } from 'reactstrap'
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import './style.css'
import { InputText } from 'primereact/inputtext';
import { RadioGroup } from 'rsuite';
import { InputNumber } from 'primereact/inputnumber';
export const FormSaveProduct = ({ onChange1, onChange2, onchange3, onchange4, onChange5, onChange6, onChange7, onChange8, onChange9 }) => {

    let [category, setCategory] = useState(0);
    const [idCategory, setIdCategory] = useState(0)
    const [nameCategory, setNameCategory] = useState("")

    const catchValue1 = () => {
        let cat = document.getElementById("mueble").value;
        setCategory(cat)
        onChange7(cat)
        console.log(cat);
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

    function checkSuppliers() {
        while (document.getElementById('selectContainer').lastChild) {
            document.getElementById('selectContainer').removeChild(document.getElementById('selectContainer').lastChild)
        }
        listSuppliers();
    }

    function checkCategories() {
        while (document.getElementById('selectContainerCategories').lastChild) {
            document.getElementById('selectContainerCategories').removeChild(document.getElementById('selectContainerCategories').lastChild)
        }
        listCategories();
    }
    const createSelectElements = (supplierList) => {
        console.log(supplierList.length);
        let i = 0;
        const selectContainer = document.getElementById("selectContainer");
        const optionSelect = document.createElement("option")
        // optionSelect.textContent = "Proveedores";
        optionSelect.setAttribute("value", "")
        selectContainer.appendChild(optionSelect)
        while (i <= supplierList.length) {
            supplierList.forEach(element => {
                const optionSelect = document.createElement("option")
                console.log("ELEMENT: " + element.nombre_proveedor);
                optionSelect.textContent = element.nombre_proveedor;
                optionSelect.setAttribute("value", element.nombre_proveedor)
                // optionSelect.setAttribute("onClick",catchSupplierName(optionSelect))
                selectContainer.appendChild(optionSelect)
                i++
            })
            break;
        }
    }

    const createSelectElementsCategories = (categoriesList) => {
        let i = 0;
        const selectContainer = document.getElementById("selectContainerCategories");
        const optionSelect = document.createElement("option")

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

    useEffect(() => {
        checkCategories()
        checkSuppliers()
    }, [listCategories.length])

    const setDataCategory = (category) => {
        console.log(category);
        fetch("http://localhost:8080/producto/consultarCategoria/" + category, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(product => {
                onChange9(product.nombre_categoria);
                onChange7(product.id_categoria)
            })
    }
    return (

        <FormGroup className='cont-Register-product-2'>
            <div className='form2'>

                <InputText type='text' className='input-register box' onChange={onChange1} placeholder="Nombre" />
                <InputTextarea type='' className='input-text-area box' onChange={onChange2} placeholder="Descripcíon" />

                <div className='cantidad'>
                    <InputNumber className='input-register-price box' placeholder="$" onChange={onChange5} />
                    <InputNumber className='input-quantyti box' placeholder="cantidad" onChange={onChange6} />
                </div>

                <div className='optionsProdu'>

                    <div className='category'>
                        <div>
                            <div className='paredCategories'></div>
                            <select id='selectContainerCategories' onChange={e => setDataCategory(e.target.value)} className='radioGroup'>
                            </select>
                        </div>
                        <div id='labelGroup' className='labelGroup'>
                        </div>
                    </div>

                    <div className='selecProvider'>
                        <div className='paredProvider'></div>
                        <select id='selectContainer' onChange={e => onChange8(e.target.value)} className='radioGroup'>
                        </select>
                    </div>
                </div>

                <div className='button-save-Product'>
                    <Button onClick={onchange4}>Guardar</Button>
                    <Button onClick={onchange3}>Desacer</Button>
                </div>
            </div>

        </FormGroup>
    )
}
