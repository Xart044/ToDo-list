import {TASK_FILTER} from '../constants/Tasks'


const initialState = {
    filterType: 'ALL',
    filterProps: '',
};

export default function (state = initialState, action) {
    switch (action.type){
        case TASK_FILTER:
            return {...state, filterType: action.filterType, filterProps: action.filterpProps};
            break;
        default:
            return state;
    }
}
