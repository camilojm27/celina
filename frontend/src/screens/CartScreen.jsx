import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {addToCart} from "../actions/cartActions";

export default function CartScreen(props) {
    const productID = props.match.params.id
    const colorState = props.location.search ? props.location.search.split('=')[1] : 'generic'
    const qty = props.location.search ? Number(props.location.search.split('=')[2]) : 100

    const dispatch = useDispatch()
    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [dispatch, productID, qty])

    return(
        <>
        <h1>Carrito de compras :D</h1>
            <p>
                En el carrito tienes el producto: #{productID}, en color  {colorState.split('?')[0]} {qty} {Number(qty) === 1  ? 'vez' : 'veces'}
            </p>
        </>
    )
}

