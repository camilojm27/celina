import React from 'react'
import {useSelector, useDispatch} from "react-redux"
//STYLES
import './styles/Header.css'

//ASSETS
import CARRITO from '../assets/img/carito.png'
import {Link} from "react-router-dom";
import {signOut} from "../actions/userActions";

function Header() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSigning = useSelector((state) => state.userSigning);
    const { userInfo } = userSigning;
    const dispatch = useDispatch()


    const signOutHandler = () =>{
        dispatch(signOut())
    }
    return(
        <header className="header">
            <Link to="/">
            <h1>CELINA</h1>
            </Link>
            <ul className="header__list">
                <Link to="/categories">Productos</Link>
                <Link to="/sobre-nosotros">Sobre Nosotros</Link>
                <Link to="/contacto">Contacto</Link>


                <div>
                    
                    {userInfo ? (

                        <div className="dropdown">
                            <Link id="username" to="#">
                                {userInfo.name}
                            </Link>
                            <ul className="dropdown-content">
                                {
                                userInfo.isAdmin === undefined &&
                                       <li>
                                        <Link to="/admin">
                                            ADMINISTRAR 😎
                                        </Link>
                                    </li>  
                                    
                                }
                                <li>
                                    <Link to="/profile">Perfil</Link>
                                </li>
                                <li>
                                    <Link to="/orderhistory">Historial de ordenes</Link>
                                </li>
                                <li>
                                    <Link to="#signout" onClick={signOutHandler}>
                                        Cerrar Sesión
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>

                    ) : (
                        <Link to="/login">Iniciar Sesión</Link>
                    )}
                    <Link to="/cart">
                        <img id="cart" src={CARRITO} alt="" />
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </Link>
                </div>
            </ul>
        </header>
    )
}
export default Header
