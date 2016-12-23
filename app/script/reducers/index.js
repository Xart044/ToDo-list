import {combineReducers} from 'redux'
import user from './user'
import tasks from './task'
import category from './category'
import visibilityFilter from './visibilityFilter'

export default combineReducers(
    {
        user,
        tasks,
        category,
        visibilityFilter
    }
)

