import React, { useReducer} from "react";
import './styles/Register.css'
import {Link} from "react-router-dom";
import '../firebase/auth'
import Auth from "../firebase/auth";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = new  Auth()
//https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}



function Register(props) {
    const [formData, setFormData] = useReducer(formReducer, {
        name: "",
        email: "",
        password: "",
    })

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleSubmit = async event => {

            event.preventDefault()
            console.log(formData)
            const {name, email, password} = formData
            await auth.registerEmail(name, email, password)
                .then(()=>{
                    setTimeout(()=> {

                        props.history.push('/')
                    }, 1000)
                })
    }


    async function handleGoogle() {
       await auth.loginWithGoogle()
        setTimeout(() => {
            props.history.push('/')
        }, 1500)
    }

    return (
        <section className="register">
            <ToastContainer/>
            <div className="wrapper">
            <form className="register-form" onSubmit={handleSubmit}>
                <div>
                    <h1>Crear una <strong> Celi Cuenta</strong></h1>
                </div>

                <div>
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Ingrese su nombre"
                        required
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo Electronico</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Correo Electronico"
                        required
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Ingrese su Contraseña"
                        required
                        onChange={(e) => handleChange(e)}

                    />
                </div>
                <div>
                    <label/>
                    <button className="button-action" type="submit">
                        Registrar
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        <p>¿Ya tiene una cuenta? <Link to={`/login?redirect=`}>Iniciar Sesión</Link></p>

                    </div>
                </div>
            </form>
                <div className="button-action google" onClick={handleGoogle}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fgoogle_48px.png?alt=media&token=87bc4216-6b62-4411-a826-026fe951f23d"
                        alt="icono de google"/>
                    <p>Registrarse con google</p>
                </div>
            </div>
        </section>
    )
}

export default Register
