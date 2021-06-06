import {
    USER_SIGN_OUT,
    USER_SIGNING_SUCCESS
} from '../constants/userConstants';

export const userSigningReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNING_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_SIGN_OUT:
            return {};
        default:
            return state;
    }
};