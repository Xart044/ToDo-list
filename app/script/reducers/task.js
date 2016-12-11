import {
    TASKS_CREATE_SUCCESS,
    TASKS_CREATE_FAIL,
    TASKS_REMOVE_SUCCESS,
    TASKS_REMOVE_FAIL
} from '../constants/Tasks'

const initialState = {
    tasks: [],
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type){
        case TASKS_CREATE_SUCCESS:
            return {...state, tasks: action.tasks, error: ''};
            break;
        case TASKS_CREATE_FAIL:
            return {...state, error: action.error};
            break;
        case TASKS_REMOVE_SUCCESS:
            return {...state, tasks: action.tasks, error: ''};
            break;
        case TASKS_REMOVE_FAIL:
            return {...state, error: action.error};
            break;
        default:
            return state;
    }
}