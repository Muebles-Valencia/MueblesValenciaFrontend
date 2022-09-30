
import { Button } from 'primereact/button'
import toast from 'react-hot-toast';

// import { useState } from 'react'
// import { useEffect } from 'react'
// import { ContentShoppingCart } from '../../Component/Layout/ShoppingCart/ContentShoppingCart'
// import './css/Style.css'
// import { ListsCart } from './ListsCart'

export const ServicieDelete_Favorite = ({codigo,className}) => {


    function deleteProduct() {

        const urlRegister = 'https://muebleriaback.herokuapp.com/favoritos/eliminarFavoritos/';
        fetch(urlRegister + codigo, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(response => response)
            .then(response => {


                if (response.status == 200) {
                    alert("eliminado")
                    document.getElementById(codigo).innerHTML = "" //cada ves que borremos un producto del carrito de compras se borrara el producto del carrito || se le pasa por id el codigo para referencia cada cart que se encuntra ShoppingCart(iteratCart)
                    //   document.getElementById("cantidad").innerHTML -= 1 //cada ves que borremos un producto del carrito de compras se le restara a la cantidad de productos que tenemos en el carrito
                    //   document.getElementById("press").innerHTML -= press //cada ves que borremos un producto del carrito de compras se le restara al total de Compra

                }
            })
    }

   const messageDelete=()=>{
    toast("Quitar de favoritos",{
        position:'bottom-left',
        className:'send-toast'
        
    })
   }

    return (


        < div>
            <button onClick={deleteProduct} className={className} ><i className='pi pi-times-circle deleteFavorite' onMouseEnter={messageDelete}></i></button>
        </div>
    )
}




// export const ServicieDeleteCart = ({ codigo, press }) => {//tiene como propiedad codigo y precio para capturar su valor en la carperta ShoppingCart(iteratCart)
//     // const [status,setStatus]=useState(0)


//     const [visible2, setVisible2] = useState(false)

//     return (
//         <div>
//             <Button onClick={deleteProduct} className='delete-product-cart' codigo><i className='pi pi-trash delete'></i></Button>
//             <ContentShoppingCart visible2={visible2} onHide={() => { setVisible2(false) }} />

//         </div>
//     )
// }
