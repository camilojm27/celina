import React from "react";
import './styles/Register.css'
import {Link} from "react-router-dom";

function Register() {
    return (
        <section className="register">
            <form className="register-form">
                <div>
                    <h1>Crear una <strong> Celi Cuenta</strong></h1>
                </div>

                <div>
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ingrese su nombre"
                        required

                    />
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
                    <label htmlFor="confirmPassword">Confime su Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Ingrese de nuevo su Contraseña"
                        required
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
                        ¿Ya tiene una cuenta?{' '}
                        <Link to={`/login?redirect=`}>Sign-In</Link>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Register
