import {
    TASKS_CREATE_SUCCESS,
    TASKS_CREATE_FAIL,
    TASKS_REMOVE_SUCCESS,
    TASKS_REMOVE_FAIL,
    TASKS_LOAD_FAIL,
    TASKS_LOAD_SUCCESS,
    TASKS_CLEAR
} from '../constants/Tasks'

const initialState = {
    category: '',
    tasks: [],
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type){
        case TASKS_LOAD_SUCCESS:
            return {...state, tasks: action.tasks, category: action.category, error: ''};
            break;
        case TASKS_LOAD_FAIL:
            return {...state, error: action.error};
            break;
        case TASKS_CLEAR:
            return {...state, tasks: [], category: '', error: ''};
            break;
        default:
            return state;
    }
}