import { useMemo } from 'react'
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {productDetailsReducer, productListReducer} from './reducers/productReducers'
import {cartReducer} from "./reducers/cartReducers";
import {userSigningReducer} from "./reducers/userReducers";
import {
    orderCreateReducer,
    orderDeleteReducer,
    orderDetailsReducer,
    orderListMineReducer,
    orderListReducer
} from "./reducers/orderReducers";
import { composeWithDevTools } from 'redux-devtools-extension'

let store
let initialState;

if (typeof window !== "undefined") {

    const initialState = {
        userSigning: {
            userInfo: localStorage.getItem('userInfo')
                ? JSON.parse(localStorage.getItem('userInfo'))
                : null,
        },
        cart: {
            cartItems: localStorage.getItem('cartItems')
                ? JSON.parse(localStorage.getItem('cartItems'))
                : [],
            shippingAddress: localStorage.getItem('shippingAddress')
                ? JSON.parse(localStorage.getItem('shippingAddress'))
                : {},
            paymentMethod: 'PayPal',
        },
    };

} else {
    const initialState = {
        userSigning: {
            userInfo: null,
        },
        cart: {
            cartItems: [],
            shippingAddress: {},
            paymentMethod: 'PayPal',
        },
    }
}


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSigning: userSigningReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderListMine: orderListMineReducer,
})


function initStore(initialState) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}

