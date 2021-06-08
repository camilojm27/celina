import {
    USER_SIGN_OUT,
    USER_SIGNING_SUCCESS
} from '../constants/userConstants';
let userSigning;

if (typeof window !== "undefined") {
    userSigning = {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    }
}
else{
    userSigning = {
        userInfo: null,
    }
}

export const userSigningReducer = (state = {userSigning}, action) => {
    switch (action.type) {
        case USER_SIGNING_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_SIGN_OUT:
            return {};
        default:
            return state;
    }
};