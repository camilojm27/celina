import  Axios from "axios";
import {CART_ADD_ITEM, CART_ADD_FAIL, CART_REMOVE_ITEM} from "../constants/cartConstants";
import {API} from "../constants/backend";

export const addToCart = (productID, qty, color) => async (dispatch, getState) => {
    try{
        const {data} = await Axios.get(`${API}${productID}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                name: data.name,
                image: data.images[0],
                price: data.price,
                stock: data.stock,
                colors: data.colors,
                product: data._id,
                color: color,
                qty,
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (e) {
        console.error(e)
        dispatch({type: CART_ADD_FAIL, payload: e.message})
    }


}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
