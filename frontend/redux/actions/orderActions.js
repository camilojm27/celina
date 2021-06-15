import Axios from 'axios';
import {CART_EMPTY} from '../constants/cartConstants';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_FAIL as ORDER_MODIFY_FAIL,
    ORDER_DELETE_REQUEST as ORDER_MODIFY_REQUEST,
    ORDER_DELETE_SUCCESS as ORDER_MODIFY_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_USER_FAIL,
    ORDER_LIST_USER_REQUEST,
    ORDER_LIST_USER_SUCCESS,
} from '../constants/orderConstants';
import {API} from "../constants/backend";
import firebase from '../../firebase/app'


export const createOrderAction = (order) => async (dispatch) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try {
        const userInfo = await firebase.auth().currentUser.getIdToken()
        const {data} = await Axios.post(`${API}/orders`, order, {
            headers: {
                Authorization: `Bearer ${userInfo}`,
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
                    ? error.response.data.code
                    : error.code,
        });
    }
};

export const orderDetailsAction = (orderId) => async (dispatch) => {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});


    try {
        const userInfo = await firebase.auth().currentUser.getIdToken()
        const {data} = await Axios.get(`${API}/orders/${orderId}`, {
            headers: {Authorization: `Bearer ${userInfo}`},
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

export const orderModifyAction = (orderId, action) => async (dispatch) => {


    dispatch({type: ORDER_MODIFY_REQUEST, payload: orderId});

    try {
        let data;
        const userInfo = await firebase.auth().currentUser.getIdToken()

        switch (action) {
            case 0:
                data = await Axios.delete(`${API}/orders/${orderId}`, {
                    headers: {Authorization: `Bearer ${userInfo}`}
                })

                dispatch({type: ORDER_MODIFY_SUCCESS, payload: data.data})

                break;

            case 1:
                data = await Axios.put(`${API}/orders/${orderId}/pay`, {}, {
                    headers: {Authorization: `Bearer ${userInfo}`}
                })

                dispatch({type: ORDER_MODIFY_SUCCESS, payload: data.data})
                break;
            case 2:
                data = await Axios.put(`${API}/orders/${orderId}/deliver`, {}, {
                    headers: {
                        Authorization: `Bearer ${userInfo}`
                    }
                })

                dispatch({type: ORDER_MODIFY_SUCCESS, payload: data.data})
                break;

            default:
                break;
        }

    } catch (error) {
        dispatch({
            type: ORDER_MODIFY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
};

export const orderListAction = () => async (dispatch) => {
    dispatch({type: ORDER_LIST_REQUEST});


    try {
        const userInfo = await firebase.auth().currentUser.getIdToken()

        const {data} = await Axios.get(`${API}/orders/`, {
                headers: {Authorization: `Bearer ${userInfo}`}
            }
        )

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

export const orderListMineAction = () => async (dispatch) => {

    dispatch({type: ORDER_LIST_USER_REQUEST});

    try {
        const userInfo = await firebase.auth().currentUser.getIdToken()
        const {data} = await Axios.get(`${API}/orders/mine`, {
                headers: {Authorization: `Bearer ${userInfo}`}
            }
        )

        dispatch({type: ORDER_LIST_USER_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
            type: ORDER_LIST_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
