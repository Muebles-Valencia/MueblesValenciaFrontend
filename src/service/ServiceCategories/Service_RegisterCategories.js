import React,{useState} from 'react'
import { FromSaveProvider } from '../../Component/Layout/FromSaveProvider/FromSaveProvider';
import { Dialog } from 'primereact/dialog';
import { Button,} from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {IoIosSave} from 'react-icons/io'
import { FormSaveCategories } from '../../Component/Layout/FormSaveCategories/FormSaveCategories';

export const Service_RegisterCategories = ({style}) => {

    const [visible, setVisible] = useState(false)
    const [id, setIdCategory] = useState("")
    const [name , setNameCategory] = useState("")
  
      const catchIdCategory = (even) => {
        setIdCategory(even.target.value)
      }
  
      const catchNameCategory = (even) => {
        setNameCategory(even.target.value)
      }
  
  
      function registerCategory() {
          console.log("estoy registrando un proveedor")
          const urlRegister = 'https://muebleriaback.herokuapp.com/categorias';
          console.log(urlRegister)
          let tokenAdmin = localStorage.getItem('admin')
          console.log(tokenAdmin)
          if(tokenAdmin == "" || tokenAdmin == null){
            alert("Por favor registrese")
          }else{
            fetch(urlRegister, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization" : "Bearer " + tokenAdmin
                },
                body: JSON.stringify({
                  id_categoria : id,
                  nombre_categoria: name,
                })
            })
            .then(response => response)
            .then(json => check(json.ok))
            console.log();
          }
      }
  
      function check(element) {
          if (element == true) {
              alert("Registro exitoso")
          } else {
              alert("hubo un error al momento de registrar")
          }
      }
      
      const onHide = () => {
          if (visible == false) {
              setVisible(true)
          } else {
              setVisible(false)
          }
      }
  
      const header=(
          <div className='div-login'>
             Registrar Categoria
         </div>
      )
    return (
      <div className={style}>
          <Button className='button-book' onClick={() => onHide(onHide)} ><IoIosSave className='Book'/></Button>
          <Dialog header={header}   className='dialogoRegisterProduct' visible={visible} style={{ width: '30em',bordeRadius:'100%'}} modal onHide={onHide}>

          <div className='content-image'>
              <FormSaveCategories onChange2={catchNameCategory} onchange4={registerCategory} onchange3={() => onHide(onHide)}/>
          </div>
          </Dialog>
      </div>
    )
}
