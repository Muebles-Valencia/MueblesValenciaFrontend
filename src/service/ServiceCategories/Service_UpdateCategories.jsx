
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React,{useState,useEffect}from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioGroup } from 'rsuite';
import { InputNumber } from 'primereact/inputnumber';
import '../ServiceCategories/css/ServiceCategories.css'
import {FaUserEdit} from 'react-icons/fa'

export const Service_UpdateCategories = ({codeCategoriUpdate}) => {
    const [visible, setVisible] = useState(false);
    const [name_supplier_product, setNameSupplierProduct] = useState("")
    const [code , setCodeCategori] = useState("")
    const [categori, setCategori] = useState("")
    const [listC , setListC] = useState([])



    function searchCategori () {
      console.log("entro a buscar una categoria")
      console.log("codigo"+codeCategoriUpdate)
        const urlRegister = 'https://muebleriaback.herokuapp.com/categorias/buscarCategoriaCodigo/' + codeCategoriUpdate;
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(category => {
                guardarCategory(category)
            })
    }    
  
    const guardarCategory = (list) =>{
        console.log("rtrr " + list.nombre_categoria)
        
        setCategori(list)
        setCodeCategori(list.id_categoria)
    }
    
    const seew=()=>{
       
        if (visible == false) {
          console.log("entro al if")
          console.log(codeCategoriUpdate+"fsd")
            searchCategori()
            setVisible(true)
        } else {
          console.log("entro al else")
            setVisible(false)
        } 
    }
  
    function editCategori() {
        console.log("estoy editando una categoria")
        const name_category = document.getElementById("inputName").value
        console.log("nombre"+name_category)
        const urlRegister = 'https://muebleriaback.herokuapp.com/categorias/actualizarCategoria/' + codeCategoriUpdate;
        fetch(urlRegister, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                    id_categoria: code,
                    nombre_categoria: name_category
            })
        })
            .then(response => response.json())
            .then(json => {
                if(json.ok){
                    alert("Actualizacion Fallida")
                }else{
                    alert("Actualizacion Exitosa")
                }
            })

        let tokenAdmin = localStorage.getItem('admin')
        if(tokenAdmin == "" || tokenAdmin == null){
          alert("Por favor registrese")
        }else{
          fetch(urlRegister, {
              method: 'PUT',
              headers: {
                  "Content-type": "application/json",
                  "Authorization" : "Bearer " + tokenAdmin
              },
              body: JSON.stringify({
                id_categoria: code,
                nombre_categoria: name_category
              })
          })
              .then(response => response.json())
              .then(json => {
                  if(json.ok){
                    //   alert("Actualizacion Fallida")
                  }else{
                    //   alert("Actualizacion Exitosa")
                  }
              })
        }
    }
  
  
  
    const header=(
        <div className='div-update'>
           Editar Categorias
       </div>
    )
  
  return (
    <>
        <Button onClick={()=>seew(seew)} className='button-book'><FaUserEdit className='Book'/></Button>
        <Dialog header={header} visible={visible} modal onHide={seew} style={{ width: '30em',bordeRadius:'100%'}} className='dialogoRegisterProduct tabla' >     
            <div className='content-categori'>
                <InputText id='inputName' className='input-update' placeholder={categori.nombre_categoria}/>
            </div>
            <div className='save-edit'>
                <Button onClick={editCategori} >Guardar</Button>
            </div>
        </Dialog>
    </>
  )
}
