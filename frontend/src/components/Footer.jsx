import React from 'react'
import './styles/Footer.css'
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div>
                <figure>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fmobile-solid.svg?alt=media&token=e12710e8-7c60-4902-835b-6161b640ecb5"
                        alt="imagen de un telefono"
                        height={20} width={20}/>
                    <a href="https://t.me/"> +57 322 689 0290</a>
                </figure>
                <figure>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fenvelope-open-regular.svg?alt=media&token=3f90ec9c-4a6f-4402-bd16-34b6ca0fcd43"
                        alt="imagen correo electronico"
                        height={20} width={20}/>
                    <a href="mailto:celina.tienda@gmail.com">celina.tienda@gmail.com</a>
                </figure>

            </div>

            <div>
                <h2>Hecho con 💛 Cali - Colombia 🇨🇴 </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate doloremque ea iste odit tempore?
                    Commodi consectetur culpa doloremque eveniet facilis ipsam itaque mollitia nulla quibusdam quo
                    reprehenderit, sit vero vitae.</p>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/garantia">Garantía y Devoluciones </Link>
                        <Link to="/politicas">Politicas de privacidad </Link>
                        <Link to="/contacto">Contactanos</Link>
                    </li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer