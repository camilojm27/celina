import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";
import './styles/CartScreen.css'

export default function CartScreen(props) {
    const productID = props.match.params.id
    let colorState = props.location.search ? props.location.search.split('=')[1] : 'generic'
    colorState = colorState.split('?')[0]
    const qty = props.location.search ? Number(props.location.search.split('=')[2]) : 100

    const [qtyState, setQty] = useState(1);

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    const dispatch = useDispatch()
    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [dispatch, productID, qty])

    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
    };

    function cartChange(e, item) {
        setQty(Number(e.target.value))
        dispatch(
            addToCart(item.product, Number(e.target.value))
        )

    }

    return (
        <>
            <h1>Carrito de Compras</h1>
            {
                cartItems === 0 ?(
                    <h2>
                    El carrito está vacio
                </h2>) :(
                    <section className="cart-items">
                    {cartItems.map((item) => (
                        <li key={item.product} className="cart-item">
                            <img className="cart-item__image" src={item.image} alt="imagen del producto"/>
                            <div>
                                <p> {item.name} en color {colorState.split('?')[0]}</p>
                                <select className="cart-select" value={qtyState}
                                        onChange={(e) =>
                                            cartChange(e, item)
                                        }
                                >
                                    {
                                        [...Array(item.stock[item.colors.indexOf(colorState)]).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))

                                    }
                                </select>
                            </div>
                            <div>
                                <h2>{item.price} {Number(qtyState) === 1 ? '' : `* ${qtyState}`}</h2>
                                <button className="button-action danger-color button-delete"
                                        type="button"
                                        onClick={() => removeFromCartHandler(item.product)}
                                >Eliminar</button>
                            </div>

                        </li>
                    ))}
                </section>)

            }


            {/*<h1>Carrito de compras :D</h1>*/}
            {/*    <p>*/}
            {/*        En el carrito tienes el producto: #{productID}, en color  {colorState.split('?')[0]} {qty} {Number(qty) === 1  ? 'vez' : 'veces'}*/}
            {/*    </p>*/}
        </>
    )
}

