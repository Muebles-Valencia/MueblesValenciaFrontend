import React,{useState,useEffect} from 'react'
import { GetCards } from '../../Component/Layout/ContentPageMain/GetCards';

export const Service_ListProduct = () => {
  
  const [product, setProduct] = useState([])
  // const [save, setSave] = useState([])
  
  const getProducts = () => {
    const url = 'https://muebleriaback.herokuapp.com/producto/listaProductosPrincipal';
      fetch(url,{
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => response.json())
        .then(data =>{
          console.log("esta es la sista que llega\n"+data)
          setProduct(data)
        } )
  }

  useEffect(() => {
      getProducts()
      //saveObj.push(objProduct)
      //setProductFound(saveObj)
  }, [])
 
  return (
    <GetCards getCards={product}/>
  )
}
