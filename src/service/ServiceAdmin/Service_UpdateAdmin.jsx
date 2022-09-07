import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React,{useState,useEffect}from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioGroup } from 'rsuite';
import { InputNumber } from 'primereact/inputnumber';

export const Service_UpdateAdmin = ({codeAdminUpdate}) => {
    const [visible, setVisible] = useState(false);
    const [adm , setAdmin] = useState("")
    function searchAdmin () {
      console.log("codigo "+ codeAdminUpdate)
        const urlRegister = 'http://localhost:8080/administradores/consultarAdministrador/' + codeAdminUpdate;
        let tokenAdmin = localStorage.getItem("admin")
        fetch(urlRegister, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization" : "Bearer " + tokenAdmin
            }
        })
            .then(response => response.json())
            .then(adm => {
                setAdmin(adm)
            })
    }    
  
    const saveAdmin = (ad) =>{
        console.log("ADMIN " + ad.nombre_administrador)
    }
    
    const seew=()=>{
       
        if (visible == false) {
          console.log("entro al if")
          console.log(codeAdminUpdate+" fsd")
            searchAdmin()
            setVisible(true)
        } else {
          console.log("entro al else")
            setVisible(false)
        } 
    }
  
    function editAdmin() {
        const name_admin = document.getElementById("inputName").value
        const email_admin = document.getElementById("inputEmail").value
        const password_admin = document.getElementById("inputPassword").value

        console.log("nombre "+ name_admin)
        const urlRegister = 'http://localhost:8080/administradores/actualizarAdministrador/' + codeAdminUpdate + "/" + adm.correo_administrador;
        fetch(urlRegister, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                codigo_administrador : 0,
                nombre_administrador: name_admin,
                correo_administrador : email_admin,
                contraseña_administrador: password_admin,
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
    }
  
  
  
    const header=(
        <div className='div-update'>
           Editar Administrador
       </div>
    )
  
  return (
    <>
        <Button onClick={()=>seew(seew)}><i className='pi pi-user-edit icons-registerProduct'></i></Button>
        <Dialog header={header} visible={visible} modal onHide={seew} style={{ width: '30em',bordeRadius:'100%'}} className='dialogoRegisterProduct tabla' >     
            
         
              
              <div className='content-provider'>
                  <InputText id='inputName' className='input-update' placeholder={"Nombre " + adm.nombre_administrador}/>
                  <InputText id='inputEmail' className='input-update' placeholder={"Correo " + adm.correo_administrador}/>
                  <InputText id='inputPassword' className='input-update' placeholder={"Contraseña"}/>
              </div>
          <div className='save-edit'>
                <Button onClick={editAdmin} >Guardar</Button>
            </div>
        </Dialog>
    </>
  )
}
