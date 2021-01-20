import React from "react";
import './styles/Login.css'

export default function Login(props) {
    return (
        <section className="login">
            <form className="register-form">
                <div>
                    <h1>Iniciar sesión</h1>
                </div>

                <div>
                    <label htmlFor="email">Correo Electronico</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Correo Electronico"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Ingrese su Contraseña"
                        required

                    />
                </div>

                <div>
                    <label/>
                    <button className="button-action" type="submit" onClick={() => props.history.push(`/`)}>
                        Ingresar
                    </button>
                </div>

            </form>
        </section>
    )
}


