import React from 'react'
import {useSelector, useDispatch} from "react-redux"
//STYLES
import './styles/Header.css'

//ASSETS
import FACEBOOK from '../assets/img/facebook.png'
import INSTAGRAM from '../assets/img/instagram1.svg'
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

                <li className="header__list-item">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/celina.tienda/">
                        <img src={INSTAGRAM} alt=""/>
                    </a>
                </li>
                <li className="header__list-item">
                    <img src={FACEBOOK} alt=""/>
                </li>
                <div>
                    <Link to="/cart">
                        <img id="cart" src={CARRITO} alt=""/>
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </Link>
                    {userInfo ? (

                        <div className="dropdown">
                            <Link to="#">
                                {/*{userInfo.name} <i className="fa fa-caret-down"/>{' '}*/}
                                {userInfo.name}
                            </Link>
                            <ul className="dropdown-content">
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
                    {/*{userInfo && userInfo.isSeller && (*/}
                    {/*    <div className="dropdown">*/}
                    {/*        <Link to="#admin">*/}
                    {/*            Seller <i className="fa fa-caret-down"></i>*/}
                    {/*        </Link>*/}
                    {/*        <ul className="dropdown-content">*/}
                    {/*            <li>*/}
                    {/*                <Link to="/productlist/seller">Products</Link>*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <Link to="/orderlist/seller">Orders</Link>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {/*{userInfo && userInfo.isAdmin && (*/}
                    {/*    <div className="dropdown">*/}
                    {/*        <Link to="#admin">*/}
                    {/*            Admin <i className="fa fa-caret-down"></i>*/}
                    {/*        </Link>*/}
                    {/*        <ul className="dropdown-content">*/}
                    {/*            <li>*/}
                    {/*                <Link to="/dashboard">Dashboard</Link>*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <Link to="/productlist">Products</Link>*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <Link to="/orderlist">Orders</Link>*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <Link to="/userlist">Users</Link>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </ul>
        </header>
    )
}
export default Header
