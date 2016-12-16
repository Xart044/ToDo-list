import {
    TASKS_CREATE_SUCCESS,
    TASKS_CREATE_FAIL,
    TASKS_REMOVE_SUCCESS,
    TASKS_REMOVE_FAIL,
    TASKS_LOAD_FAIL,
    TASKS_LOAD_SUCCESS
} from '../constants/Tasks'

const initialState = {
    tasks: [],
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type){
        case TASKS_LOAD_SUCCESS:
            return {...state, tasks: action.tasks, error: ''};
            break;
        case TASKS_LOAD_FAIL:
            return {...state, error: action.error};
            break;
        default:
            return state;
    }
}