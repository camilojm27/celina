import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";
import Axios from "axios";
import { API } from "../constants/backend";



export const listProducts = () => async (dispatch, getState) => {
    const { productList: { products }, } = getState();

    try {
        if (Object.keys(products).length > 0 ){
            //dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products })
            console.log('Reciclao', products);
            return
        }

    }catch (e) {
        //No hay cache
    }

    console.log('FUCK');

    dispatch({
        type: PRODUCT_LIST_REQUEST
    })

    try {
        let { data } = await Axios.get(`${API}/products/`)

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: e.message })
    }
}

export const detailsProduct = (productId) => async (dispatch, getState) => {
    // TODO: Hacer cache desde el estado de redux
    // Hay que almacenar cada objeto en lugar de reemplazarlo


    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
    try {
        let data = await Axios.get(
            `${API}/products/${productId}`
        );

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data })
    } catch (e) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message
        })
    }
}
