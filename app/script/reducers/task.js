import {
    TASKS_CREATE_SUCCESS,
    TASKS_CREATE_FAIL,
    TASKS_REMOVE_SUCCESS,
    TASKS_REMOVE_FAIL
} from '../constants/Tasks'

const initialState = {
    name: '',
    done: false,
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type){
        case TASKS_CREATE_SUCCESS:
            return {...state, name: action.name, done: false, error: ''};
            break;
        case TASKS_CREATE_FAIL:
            return {...state, name: '', done: false, error: action.error};
            break;
        case TASKS_REMOVE_SUCCESS:
            return {...state, name: '', done: false, error: ''};
            break;
        case TASKS_REMOVE_FAIL:
            return {...state, name: action.name, done: action.done, error: action.error};
            break;
        default:
            return state;
    }
}