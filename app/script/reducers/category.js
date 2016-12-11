import {
    CATEGORY_LOAD_SUCCESS,
    CATEGORY_LOAD_FAIL,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_REMOVE_SUCCESS,
    CATEGORY_REMOVE_FAIL,
    CATEGORY_EDIT_FAIL,
    CATEGORY_EDIT_SUCCESS
} from '../constants/Category'

const initialState = {
    categories: [],
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CATEGORY_LOAD_SUCCESS:
            return {...state, categories: action.categories, error: ''};
            break;
        case CATEGORY_LOAD_FAIL:
            return {...state, categories: [], error: action.error};
            break;
        case CATEGORY_CREATE_SUCCESS:
            return {...state, categories: action.categories, error: ''};
            break;
        case CATEGORY_CREATE_FAIL:
            return {...state, error: action.error};
            break;
        case CATEGORY_REMOVE_SUCCESS:
            return {...state, categories: action.categories, error: ''};
            break;
        case CATEGORY_REMOVE_FAIL:
            return {...state, error: action.error};
            break;
        case CATEGORY_EDIT_SUCCESS:
            return {...state, categories: action.categories, error: ''};
            break;
        case CATEGORY_EDIT_FAIL:
            return {...state, error: action.error};
        default:
            return state;
    }
}