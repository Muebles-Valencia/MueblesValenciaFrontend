import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import '../PageResetPassword/PageResetPassword.css'
import { Home } from '../../Page/Home/Home';

export const PageInsertCode = () => {
    
    const [valueInput1 , setValueInput1] = useState("")
    const [valueInput2 , setValueInput2] = useState("")
    const [valueInput3 , setValueInput3] = useState("")
    const [valueInput4 , setValueInput4] = useState("")
    const [valueInput5 , setValueInput5] = useState("")
    const [valueInput6 , setValueInput6] = useState("")
    const [code , setFinalCode] = useState("")
    const [visible, setVisible] = useState(true)
    let navigate = useNavigate()

    const catchValueInput1 = (event) => {
        setValueInput1(event.target.value)
        getFinalCode()
        
    }

    const catchValueInput2 = (event) => {
        setValueInput2(event.target.value)
        getFinalCode()
        
    }

    const catchValueInput3 = (event) => {
        setValueInput3(event.target.value)
        getFinalCode()
        
    }

    const catchValueInput4 = (event) => {
        setValueInput4(event.target.value)
        getFinalCode()
        
    }

    const catchValueInput5 = (event) => {
        setValueInput5(event.target.value)
        getFinalCode()
        
    }
    
    const catchValueInput6 = (event) => {
        setValueInput6(event.target.value)
        getFinalCode()
        
    }

    const getFinalCode = () => {
        setFinalCode(valueInput1 + valueInput2 + valueInput3 + valueInput4 + valueInput5 + valueInput6)
        console.log(valueInput1 + "" + valueInput2 + "" + valueInput3 +"" + valueInput4 +"" + valueInput5 + "" + valueInput6);
        console.log(code);
    }

    function insertCode() {
        getFinalCode()
        const URL = 'https://muebleriaback.herokuapp.com/clientes/compararCodigo/' + code;
        fetch(URL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(res => checkRes(res))
    }

    const checkRes = (result) => {
        if(result == "ACCEPTED"){
            navigate("/insertNewPassword")
        }else{
            alert("CODIGO INCORRECTO")
        }
    }

    const header = (
        <div className='div-login'>
            <h2>El codigo llego al correo</h2>
        </div>
    )

    const onHide = () => {
        if (visible == true) {
            setVisible(false)
            navigate("/")
        } else {
            setVisible(true)
        }
    }

    return (
        <>
            <Home/>
            <Dialog header={header} className='-login' visible={visible} modal onHide={onHide} style={{ width: '30%', height: '30%' }}>

                <div className='input-password'>
                    <label htmlFor="">Ingrese el Codigo </label>
                    <div>
                    <InputText onChange={e=> setValueInput1(e.target.value)} className='input-code' />
                    <InputText onChange={e=> setValueInput2(e.target.value)} className='input-code' />
                    <InputText onChange={e=> setValueInput3(e.target.value)} className='input-code' />
                    <InputText onChange={e=> setValueInput4(e.target.value)} className='input-code' />
                    <InputText onChange={e=> setValueInput5(e.target.value)} className='input-code' />
                    <InputText onChange={e=> setValueInput6(e.target.value)} className='input-code' />
                    </div>
                </div>
                <div className='divLink'>
                    <div><Button onClick={insertCode} onMouseDown={getFinalCode}>Ingresar</Button></div>
                </div>
            </Dialog>
        </>
        
   )
}
{/* <div className='code-password'>
            <h4>Ingresa el codigo que ha llegado al correo que has registrado</h4>
            <div className='input-password'>
                <InputText onChange={e=> setValueInput1(e.target.value)} className='input-code' />
                <InputText onChange={e=> setValueInput2(e.target.value)} className='input-code' />
                <InputText onChange={e=> setValueInput3(e.target.value)} className='input-code' />
                <InputText onChange={e=> setValueInput4(e.target.value)} className='input-code' />
                <InputText onChange={e=> setValueInput5(e.target.value)} className='input-code' />
                <InputText onChange={e=> setValueInput6(e.target.value)} className='input-code' />
            </div>
            <Button onClick={insertCode} onMouseDown={getFinalCode}>Ingresar</Button>
        </div> */}
