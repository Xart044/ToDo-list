import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    SIGNOUT_SUCCESS
} from '../constants/User'

const initialState = {
    name: '',
    error: '',
    isLogged: false,
};

export default function (state = initialState, action) {
    switch (action.type){
        case LOGIN_SUCCES:
            return {...state, name: action.payload, isLogged: true};
            break;
        case LOGIN_FAIL:
            return {...state, error: action.error};
            break;
        case SIGNOUT_SUCCESS:
            return {...state,name: '', isLogged: false}
        default:
            return state;
    }

}