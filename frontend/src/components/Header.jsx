import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux"

//STYLES
import './styles/Header.css'

//ASSETS
import CARRITO from '../assets/img/carito.png'
import {Link} from "react-router-dom";
import {signOut} from "../actions/userActions";
import {StyledBurger, Ul} from "./styles/HeaderStyled";


function Header() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSigning = useSelector((state) => state.userSigning);
    const { userInfo } = userSigning;
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)


    const signOutHandler = () =>{
        dispatch(signOut())
    }
    return(
        <header className="header">
            <Link to="/">
            <h1>CELINA</h1>
            </Link>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyledBurger>
            <Ul onClick={()=> setOpen(false)} open={open} className="header__list">
                <Link to="/categories">Productos</Link>
                <Link to="/sobre-nosotros">Sobre Nosotros</Link>
                <Link to="/contacto">Contacto</Link>


                <li>
                    
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

                </li>
                <Link to="/cart">
                    <img id="cart" src={CARRITO} alt="" />
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                </Link>
            </Ul>
            <div className="burger">
                <span className="line1"/>
                <span className="line2"/>
                <span className="line3"/>
            </div>
        </header>
    )
}



export default Header
