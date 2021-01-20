import React from 'react'

//STYLES
import './styles/Header.css'

//ASSETS
import FACEBOOK from '../assets/img/facebook.png'
import INSTAGRAM from '../assets/img/instagram1.svg'
import CARRITO from '../assets/img/carito.png'
import USER_ICON from '../assets/img/user1.svg'
import {Link} from "react-router-dom";


function Header() {
    return(
        <header className="header">
            <Link to="/">
            <h1>CELINA</h1>
            </Link>
            <ul className="header__list">

                <li className="header__list-item">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/celina.tienda/">
                        <img src={INSTAGRAM} alt=""/>
                    </a>
                </li>
                <li className="header__list-item">
                    <img src={FACEBOOK} alt=""/>
                </li>
                <li className="header__list-item">
                    <Link to="/cart">
                    <img src={CARRITO} alt=""/>
                    </Link>
                </li>
                <li className="header__list-item">
                    <Link to="/register">
                    <img src={USER_ICON} alt=""/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}
export default Header
