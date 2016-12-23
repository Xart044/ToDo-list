import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    REGISTR_SUCCES,
    REGISTER_FAIL,
    SIGNOUT_SUCCESS,
    LOAD_PHOTO
} from '../constants/User'

const initialState = {
    name: '',
    surname: '',
    photo:'',
    error: '',
    isLogged: false
};

export default function (state = initialState, action) {
    switch (action.type){
        case LOGIN_SUCCES:
            return {...state, name: action.name, surname: action.surname, photo: action.photo, error: '', isLogged: true};
            break;
        case LOGIN_FAIL:
            return {...state, name: '', surname: '', error: action.error, isLogged: false};
            break;
        case SIGNOUT_SUCCESS:
            return {...state, name: '', surname: '', error: '', isLogged: false};
            break;
        case REGISTR_SUCCES:
            return {...state, name: action.name, surname: action.surname, photo: action.photo, error: '', isLogged: true};
            break;
        case REGISTER_FAIL:
            return {...state, name: '', surname: '', error: action.error, isLogged: false};
            break;
        case LOAD_PHOTO:
            return {...state, photo: action.photo};
            break;
        default:
            return state;
    }
}