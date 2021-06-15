import {USER_SIGN_OUT, USER_SIGNING_SUCCESS} from "../constants/userConstants";


export const signing = (data) => async (dispatch) => {

    dispatch({type: USER_SIGNING_SUCCESS, payload: data});
    //localStorage.setItem('userInfo', JSON.stringify(data));

};
export const signOut = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({type: USER_SIGN_OUT});
};
