import { Button } from 'primereact/button'
import {AiFillDelete} from 'react-icons/ai'
export const Servicie_DeleteReserve = ({codigo,className}) => {

    function deleteReserve() {
        console.log("CODIGO " + codigo);
        const urlRegister = 'https://muebleriaback.herokuapp.com/reserva/eliminarReserva/';
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

    return (


        < >
            <Button onClick={deleteReserve} className={className} ><AiFillDelete className='Book'/></Button>
        </>
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
