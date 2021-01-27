import React from "react";
import './styles/Register.css'
import {useForm} from "react-hook-form";
import Auth from "../firebase/auth";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
    const auth = new Auth()

    const {register, handleSubmit} = useForm()

    async function onSubmit(data) {
        const {email, password} = data
        let user = await auth.loginWithEmail(email, password)
        if (user === true) {
            console.log('sip')
            setTimeout(() => {
                props.history.push('/')
            }, 1500)
        }

    }

    return (
        <section className="register">
            <ToastContainer/>
            <div className="wrapper">
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1>Iniciar sesión</h1>
                    </div>

                    <div>
                        <label htmlFor="email">Correo Electronico</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electronico"
                            required
                            ref={register}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Ingrese su Contraseña"
                            required
                            ref={register}

                        />
                    </div>

                    <div>
                        <label/>
                        <button className="button-action" type="submit">
                            Ingresar
                        </button>
                    </div>

                </form>
            </div>
        </section>
    )
}


