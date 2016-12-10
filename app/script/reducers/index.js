import {combineReducers} from 'redux'
import page from './page'
import user from './user'
import tasks from './task'
import category from './category'

export default combineReducers(
    {
        page,
        user,
        tasks,
        category
    }
)

