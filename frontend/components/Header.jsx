import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link";
import { signOut } from "../actions/userActions";

//STYLES

//ASSETS
import { StyledBurger, Ul } from "./styles/HeaderStyled";
import { BiCart } from 'react-icons/bi'

function Header() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    let userSigning = useSelector((state) => state.userSigning);
    let { userInfo } = userSigning;
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)


    const signOutHandler = () => {
        dispatch(signOut())
    }
    return (
        <header className="header">
            <Link href="/">
                <h1>CELINA</h1>
            </Link>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyledBurger>
            <Ul onClick={() => setOpen(false)} open={open} className="header__list">
                <Link href="/categories">Productos</Link>
                <Link href="/sobre-nosotros">Sobre Nosotros</Link>
                <Link href="/contacto">Contacto</Link>


                <li>

                    {userInfo ? (

                        <div className="dropdown">
                            <Link id="username" href='#'>
                                {userInfo.name}
                            </Link>
                            <ul className="dropdown-content">
                                {
                                    userInfo.isAdmin === undefined &&
                                    <li>
                                        <Link href="/admin">
                                            ADMINISTRAR 😎
                                        </Link>
                                    </li>

                                }
                                <li>
                                    <Link href="/profile">Perfil</Link>
                                </li>
                                <li>
                                    <Link href="/orderhistory">Historial de ordenes</Link>
                                </li>
                                <li>
                                    <Link href="#signout" onClick={signOutHandler}>
                                        Cerrar Sesión
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    ) : (
                        <Link href="/login">Iniciar Sesión</Link>
                    )}

                </li>
                <Link href="/cart">
                    <div>
                        <BiCart size={50} />
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </div>
                </Link>
            </Ul>
        </header>
    )
}



export default Header
