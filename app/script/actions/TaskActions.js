import {
    TASKS_LOAD_FAIL,
    TASKS_LOAD_SUCCESS,
    TASKS_CLEAR
} from '../constants/Tasks'


import {itRef, firebaseAuth, objToArrTasks} from './../db.config';

export const loadTasks = (id) => {
    return function (dispatch) {

        const userId = firebaseAuth.currentUser.uid,
            tasksRef = itRef.ref('users/' + userId + '/Categories/' + id + '/tasks');
        tasksRef.on('value', function (snap) {
            try {
                if (snap.val()) {
                    let arr = objToArrTasks(snap.val());
                    let catRef = itRef.ref('users/' + userId + '/Categories/' + id);
                    catRef.once('value').then((snap) => {
                        dispatch({
                            type: TASKS_LOAD_SUCCESS,
                            tasks: arr,
                            category: snap.val().name
                        });
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

export const taskCreate = (id, text, date) => {
    console.log(date);
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            tasksRef = itRef.ref('users/' + userId + '/Categories/' + id + '/tasks'),
            allTasksRef = itRef.ref('users/' + userId + '/Categories/all/tasks');
        let taskKey = tasksRef.push().key;
        let newTaskRef = tasksRef.child(taskKey);
        let newAllTasksRef = allTasksRef.child(taskKey);
        newAllTasksRef.set({
            id: taskKey,
            catId: id,
            text: text,
            date: date.toString(),
            done: false
        });
        newTaskRef.set({
            id: taskKey,
            text: text,
            date: date.toString(),
            done: false
        });
    }
}


export const taskRemove = (catId, taskId) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            taskRef = itRef.ref('users/' + userId + '/Categories/' + catId + '/tasks/' + taskId),
            allTaskRef = itRef.ref('users/' + userId + '/Categories/all/tasks/' + taskId);
        taskRef.remove();
        allTaskRef.remove();
    }
}


export const taskEdit = (catId, taskId, done) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            taskRef = itRef.ref('users/' + userId + '/Categories/' + catId + '/tasks/' + taskId),
            allTaskRef = itRef.ref('users/' + userId + '/Categories/all/tasks/' + taskId);
        taskRef.update({done: done});
        allTaskRef.update({done: done});
    }
}


export const offTaskListener = (catId) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid;
        itRef.ref('users/' + userId + '/Categories/' + catId + '/tasks').off('value');
    }
}


export const clearTasks = () => {
    return function (dispatch) {
        dispatch({
            type: TASKS_CLEAR,
        });
    }
}

