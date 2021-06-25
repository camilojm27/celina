import {
    CART_ADD_FAIL,
    CART_ADD_ITEM,
    CART_EMPTY,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

let shippingAddress
let cartItems
let paymentMethod


if (typeof window !== "undefined") {
    cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []

    shippingAddress = localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            state: '',
        }

    paymentMethod = localStorage.getItem('paymentMethod')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : ''

} else {
    cartItems = [];
    shippingAddress = {
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        state: '',
    }
    paymentMethod = ''
}

export const cartReducer = (state = {cartItems, shippingAddress, paymentMethod}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {...state, cartItems: [...state.cartItems, item]}
            }
        case CART_ADD_FAIL:
            return {
                ...state, error: action.payload,
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload};

        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload};
        case CART_EMPTY:
            return {...state, cartItems: []};
        default:
            return state
    }
}
