import {
    TASKS_LOAD_FAIL,
    TASKS_LOAD_SUCCESS
} from '../constants/Tasks'


import {ref, firebaseAuth, objToArrTasks} from './../db.config';

export const loadTasks = (id) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            usersRef = ref.child('users'),
            userRef = usersRef.child(userId),
            categoriesRef = userRef.child('Categories'),
            categoryRef = categoriesRef.child(id),
            tasksRef = categoryRef.child('tasks');
        tasksRef.on('value', function (snap) {
            try {
                if (snap.val()) {
                    let arr = objToArrTasks(snap.val());

                    dispatch({
                        type: TASKS_LOAD_SUCCESS,
                        tasks: arr
                    });
                }
            } catch (e) {
                dispatch({
                    type: TASKS_LOAD_FAIL,
                    error: e.message
                });
            }
        })
    };
}

export const taskCreate = (id, text) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            usersRef = ref.child('users'),
            userRef = usersRef.child(userId),
            categoriesRef = userRef.child('Categories'),
            categoryRef = categoriesRef.child(id),
            tasksRef = categoryRef.child('tasks');
        let taskKey = tasksRef.push().key;
        let newTaskRef = tasksRef.child(taskKey);
        newTaskRef.set({
            id: taskKey,
            text: text,
            done: false
        });
    }
}


export const taskRemove = (catId, taskId) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            usersRef = ref.child('users'),
            userRef = usersRef.child(userId),
            categoriesRef = userRef.child('Categories'),
            categoryRef = categoriesRef.child(catId),
            tasksRef = categoryRef.child('tasks'),
            taskRef = tasksRef.child(taskId);
        taskRef.remove();

    }
}


export const taskEdit = (catId, taskId, done) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            usersRef = ref.child('users'),
            userRef = usersRef.child(userId),
            categoriesRef = userRef.child('Categories'),
            categoryRef = categoriesRef.child(catId),
            tasksRef = categoryRef.child('tasks'),
            taskRef = tasksRef.child(taskId);
        taskRef.update({done: done});
    }
}