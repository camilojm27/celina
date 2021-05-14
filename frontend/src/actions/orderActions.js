import Axios from 'axios';
import {CART_EMPTY} from '../constants/cartConstants';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';
import {API} from "../constants/backend";

export const createOrderAction = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try {
        const {
            userSigning: {userInfo},
        } = getState();
        console.warn(userInfo)
        const {data} = await Axios.post(`${API}/orders`, order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems');
    } catch (error) {
        //Todo: Manejar este código de error    code = auth/id-token-expired
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const orderDetailsAction = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});

    const {
        userSigning: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.get(`${API}/orders/${orderId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: ORDER_DETAILS_FAIL, payload: message});
    }

};

export const orderDeleteAction = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DELETE_REQUEST, payload: orderId});
    const {
        userSigning: {userInfo},
    } = getState();
    try {
        const {data} = Axios.delete(`${API}/orders/${orderId}`, {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            }
        )
        dispatch({type: ORDER_DELETE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
};

export const orderListAction = () => async (dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST});

    const {
        userSigning: {userInfo},
    } = getState();

    try {
        const {data} = await Axios.get(`${API}/orders/`, {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            }
        )
        console.log('ORDERS', data)

        dispatch({type: ORDER_LIST_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}