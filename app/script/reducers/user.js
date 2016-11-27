import {
    LOGIN_SUCCES,
    LOGIN_FAIL
} from '../constants/User'

const initialState = {
    name: '',
    error: ''
}

export default function (state = initialState, action) {
    switch (action.type){
        case LOGIN_SUCCES:
            return {...state, name: action.payload, error: ''};
            break;
        case LOGIN_FAIL:
            return {...state, error: action.payload.message};
            break;
        default:
            return state;
    }

}