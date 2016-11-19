import {combineReducers} from 'redux';
import TaskReducer from './tasks-reducer';


const allReducers = combineReducers({
    tasks: TaskReducer,
});

export default allReducers
