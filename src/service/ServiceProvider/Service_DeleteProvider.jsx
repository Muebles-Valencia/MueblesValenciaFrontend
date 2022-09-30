import React from 'react'

export const Service_DeleteProvider = ({id}) => {
  
    function deleteProvider() {
        const URL = "https://muebleriaback.herokuapp.com/proveedores/eliminarProveedor/" + id
        let tokenAdmin = localStorage.getItem('admin')
        if(tokenAdmin == "" || tokenAdmin == null){
            alert("Por favor registrese")
        }else{             
            fetch(URL, {
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
        <div>
            <button onClick={deleteProvider}><i className='pi pi-trash'></i></button>
        </div>
    )
}
