import React, { useReducer} from "react";
import './styles/Register.css'
import {Link} from "react-router-dom";
import '../firebase/auth'
import Auth from "../firebase/auth";
const auth = new  Auth()

//https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}



function Register() {
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

    const handleSubmit = event => {
        event.preventDefault()
        console.log(formData)
        const {name, email, password} = formData
        auth.registerEmail(name, email, password)
    }


    return (
        <section className="register">
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
            </div>
        </section>
    )
}

export default Register
