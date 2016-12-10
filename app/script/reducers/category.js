import {
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_REMOVE_SUCCESS,
    CATEGORY_REMOVE_FAIL
} from '../constants/Category'

const initialState = {
    name: '',
    description: '',
    error: '',
    tasks: {}
};

export default function (state = initialState, action) {
    switch (action.type){
        case CATEGORY_CREATE_SUCCESS:
            return {...state, name: action.name, description: action.description, tasks: [], error: ''};
            break;
        case CATEGORY_CREATE_FAIL:
            return {...state, name: '', description: '', tasks: [], error: action.error};
            break;
        case CATEGORY_REMOVE_SUCCESS:
            return {...state, name: '', description: '', tasks: [], error: ''};
            break;
        case CATEGORY_REMOVE_FAIL:
            return {...state, name: action.name, description: action.description, tasks: action.tasks, error: action.error};
            break;
        default:
            return state;
    }
}