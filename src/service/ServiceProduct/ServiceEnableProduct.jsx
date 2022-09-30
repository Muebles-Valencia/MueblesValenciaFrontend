import React from 'react'
import { Button, } from 'primereact/button';

export const ServiceEnableProduct = ({id , text}) => {
    
    const enableOrDisable = () => {
        const URL = "https://muebleriaback.herokuapp.com/producto/habilitarProducto/" + id
        fetch(URL , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => check(json.ok))
    }

    function check(element) {
        if (element == true) {
            alert("Actualizacion exitosa")
        } else {
            alert("Se realizo la acción")
        }
    }

  return (
    <div>
        <Button onClick={enableOrDisable}>{text}</Button>
    </div>
  )
}
