import {TASK_FILTER} from '../constants/Tasks'

export const setFilter = (type, props) => {
    return function (dispatch) {
        if (props) {
            dispatch({
                type: TASK_FILTER,
                filterType: type,
                filterpProps: props,
            });
        }
        else {
            dispatch({
                type: TASK_FILTER,
                filterType: type,
                filterProps: '',
            });
        }
    }
}

