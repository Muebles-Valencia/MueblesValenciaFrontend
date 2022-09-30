import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Panel } from 'primereact/panel';
import './FormDemo.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const FormRegister = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [surnameClient, setSurnameClient] = useState("")
    const [cellphoneNumberClient , setcellphoneNumberClient] = useState("")
    const [idClient , setIdClient] = useState("")
    const [passwordClient , setPasswordClient] = useState("")
    const [dateBirthClient , setDateBirthClient] = useState(Date)
    const [nameClient , setNameClient] = useState("")
    const [emailClient , setEmailClient] = useState("")
    const [panelCollased , setPanelCollased] = useState(true)
    let navigate = useNavigate();
    
    const catchSurnameClient = (event) => {
        formik.values.surname = event.target.value
        setSurnameClient(event.target.value)
    } 

    const catchCodeClient = (event) => {
        setSurnameClient(event.target.value)
    } 

    const catchCellPhoneNumber = (event) => {
        formik.values.cellphoneNumber = event.target.value
        setcellphoneNumberClient(event.target.value)
    }

    const catchIdClient = (event) => {
        formik.values.identification = event.target.value
        setIdClient(event.target.value)
    } 

    const catchPasswordClient = (event) => {
        formik.values.password = event.target.value
        setPasswordClient(event.target.value)
    } 

    const catchDateBirthClient = (event) => {
        const fecha = new Date(event.target.value);
        const yearBirth = fecha.getFullYear();
        const monthBirth = fecha.getMonth() + 1;
        const dayBirth = fecha.getDate();
        const finalDateBirth = yearBirth + "-" + monthBirth + "-" + dayBirth
        formik.values.date = finalDateBirth
        setDateBirthClient(finalDateBirth)
    } 

    const catchNameClient = (event) => {
        formik.values.name = event.target.value
        setNameClient(event.target.value)
    } 

    const catchEmailClient = (event) => {
        formik.values.email = event.target.value
        setEmailClient(event.target.value)
    } 

    const formik = useFormik({
        initialValues: {
            name: nameClient,
            surname : surnameClient,
            identification : idClient,
            email: emailClient,
            password: passwordClient,
            cellphoneNumber : cellphoneNumberClient,
            date: null,
            accept: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Se requiere el nombre.';
            }
            if(!data.surname){
                errors.surname = 'Se requiere el apellido.';
            }
            if(!data.cellphoneNumber){
                errors.cellphoneNumber = 'Se requiere el numero celular.';
            }
            if(!data.identification){
                errors.identification = 'Se requiere el numero de identificacion'
            }
            if (!data.email) {
                errors.email = 'Se requiere el correo electronico.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Direccion de correo invalida. Ejemplo de ingreso. example@email.com';
            }
            if(!data.date){
                errors.date = 'Se requiere la fecha de nacimiento'
            }
            if (!data.password) {
                errors.password = 'Se requiere la contraseña.';
            }

            if (!data.accept) {
                errors.accept = 'Necesitas aceptar los terminos y condiciones.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);

            formik.resetForm();
        }
    });

    function registerClient() {
        console.log("estoy registrando un cliente")
        const urlRegister = 'https://muebleriaback.herokuapp.com/clientes';
        if(formik.values.accept == true){
            fetch(urlRegister, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    cedula_cliente : idClient,
                    apellido_cliente : surnameClient,
                    celular_cliente : cellphoneNumberClient,
                    contraseña_cliente : passwordClient,
                    correo : emailClient,
                    estado_cliente : 1,
                    fecha_nacimin_cliente : dateBirthClient,
                    nombre : nameClient
                })
            })
                .then(response => response)
                .then(json => check(json.ok))
        }else{
            {getFormErrorMessage('accept')}
        }
    }

    function check(element) {
        if (element == true) {     
            return (
                toast("Registro exitoso")
                (setTimeout(() => {
                    (navigate("/"))
                  }, 1000))
            )
        } else {
            return(
                toast("hubo un error al momento de registrar"))
        }
    }
    
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pon tu contraseña</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugerencias en la contraseña</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Al menos una letra en minuscula</li>
                <li>Al menos una letra en mayuscula</li>
                <li>Al menos un numero</li>
                <li>Minimo 8 caracteres</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">        
                <div className="card">
                   
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={nameClient} onChange={e => catchNameClient(e)} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Nombres*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <br/>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="surname" name="surname" value={surnameClient} onChange={e => catchSurnameClient(e)} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('surname') })} />
                                <label htmlFor="surname" className={classNames({ 'p-error': isFormFieldValid('name') })}>Apellidos*</label>
                            </span>
                            {getFormErrorMessage('surname')}
                        </div>
                       
                        <br/>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="identification" name="identification" value={idClient} onChange={e => catchIdClient(e)} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="identification" className={classNames({ 'p-error': isFormFieldValid('identification') })}>Cedula*</label>
                            </span>
                            {getFormErrorMessage('identification')}
                        </div>
                        <br/>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="cellphoneNumber" name="cellphoneNumber" value={cellphoneNumberClient} onChange={e => catchCellPhoneNumber(e)} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="cellphoneNumber" className={classNames({ 'p-error': isFormFieldValid('cellphoneNumber') })}>Numero celular*</label>
                            </span>
                            {getFormErrorMessage('cellphoneNumber')}
                        </div>
                        <br/>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={emailClient} onChange={e => catchEmailClient(e)} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <br/>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={passwordClient} onChange={e => catchPasswordClient(e)} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <br/>
                        <div className="field">
                            <span className="p-float-label">
                                <Calendar id="date" name="date" value={dateBirthClient} onChange={e => catchDateBirthClient(e)} className={classNames({ 'p-invalid': isFormFieldValid('date') })} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                <label htmlFor="date" className={classNames({ 'p-error': isFormFieldValid('date') })}>Fecha De Nacimiento</label>
                            </span>
                            {getFormErrorMessage('date')}
                        </div>
                        <br/>
                        <div className="field-checkbox">
                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>Acepto terminos y condiciones*</label>
                            {getFormErrorMessage('accept')}
                        </div>

                        <Button type="submit" label="Registrar" onClick={registerClient} className="mt-2 buttom-register" />
                    </form>
                </div>
                <Panel className='descrition' header="Hola 🙂" collapsed={panelCollased} onToggle={(e) => setPanelCollased(e.value)}  toggleable>  
                    <p>Que esperas Registrate y disfruta de nuestros increibles precios y productos
                        que muebles valencia tiene para ti 😉 
                    </p>         
                </Panel>
                <Toaster reverseOrder={true} toastOptions={{
                className: 'k',
                duration: '100'
            }} />
        </div>
    );
}
                 