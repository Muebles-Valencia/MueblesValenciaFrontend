import React from 'react'

export const Service_DeleteAdmin = ({codeAdmin}) => {
    
    function deleteAdmin() {
        console.log("eliminando un admin")
        const urlDelete = "https://muebleriaback.herokuapp.com/administradores/eliminarAdministrador/" + codeAdmin;
        let tokenAdmin = localStorage.getItem('admin')
        if(tokenAdmin == "" || tokenAdmin == null){
            alert("Por favor registrese")
        }else{             
            fetch(urlDelete, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json",
                    "Authorization" : "Bearer " + tokenAdmin
                }
            })
                .then(response => response)
                .then(json => check(json.ok))
        }
    }
    
    function check(element) {
        if (element == true) {
            alert("Eliminacion exitosa")
        } else {
            alert("hubo un error al momento de eliminar")
        }
    }

  return (
    <button onClick={deleteAdmin}><i className='pi pi-trash'></i></button>
  )
}
