import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";
import './styles/CartScreen.css'

export default function CartScreen(props) {

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    const dispatch = useDispatch()


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };


    return (
        <>
            <h1>Carrito de Compras</h1>
            {
                cartItems === 0 ?(
                    <h2>
                    El carrito está vacio
                </h2>) :(
                    <>
                    <section className="cart-items">
                    {cartItems.map((item) => (
                        <li key={item.product} className="cart-item">
                            <img className="cart-item__image" src={item.image} alt="imagen del producto"/>
                            <div>
                                <p> {item.name} en color {item.color}</p>
                                <select className="cart-select" value={item.qty}
                                        onChange={(e) =>
                                        {
                                            console.log(item)

                                            dispatch(
                                                addToCart(item.product, Number(e.target.value), item.color)
                                            )
                                        }}
                                >
                                    {
                                        [...Array(item.stock[item.colors.indexOf(item.color)]).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))

                                    }
                                </select>
                            </div>
                            <div>
                                <h2>{item.price} {Number(item.qty) === 1 ? '' : `* ${item.qty}`}</h2>
                                <button className="button-action danger-color button-delete"
                                        type="button"
                                        onClick={() => removeFromCartHandler(item.product)}
                                >Eliminar</button>
                            </div>

                        </li>
                    ))}
                </section>

                            <section className="subtotal">

                                    <li>
                                        <h2>
                                            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                        </h2>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            // onClick={() => checkoutHandler}
                                            className="button-action "
                                            disabled={cartItems.length === 0}
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </li>

                            </section>
                    </>
                )

            }


            {/*<h1>Carrito de compras :D</h1>*/}
            {/*    <p>*/}
            {/*        En el carrito tienes el producto: #{productID}, en color  {colorState.split('?')[0]} {qty} {Number(qty) === 1  ? 'vez' : 'veces'}*/}
            {/*    </p>*/}
        </>
    )
}

