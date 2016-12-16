import {
    CATEGORY_LOAD_SUCCESS,
    CATEGORY_LOAD_FAIL,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_REMOVE_SUCCESS,
    CATEGORY_EDIT_SUCCESS,
    CATEGORY_EDIT_FAIL
} from '../constants/Category'
import {hashHistory} from 'react-router';
import {ref, firebaseAuth, objToArrCategories} from './../db.config';

// function categoryUpdate(dispatch) {
//     const userId = firebaseAuth.currentUser.uid,
//         usersRef = ref.child('users'),
//         userRef = usersRef.child(userId),
//         categoriesRef = userRef.child('Categories');
//     categoriesRef.on('value', function (snap) {
//         try {
//             if (snap.val()) {
//                 let arr = objToArr(snap.val());
//                 dispatch({
//                     type: CATEGORY_LOAD_SUCCESS,
//                     categories: arr
//                 });
//             }
//         } catch (e) {
//             dispatch({
//                 type: CATEGORY_LOAD_FAIL,
//                 error: e.message
//             });
//             console.log(e);
//         }

//     .then((snap)=>{
//         return objToArr(snap.val());
//     })
//     .then((arr)=>{
//         dispatch({
//             type: CATEGORY_LOAD_SUCCESS,
//             categories: arr
//         });
//         console.log(arr);
//     })
//     .catch(e=>{
//         dispatch({
//             type: CATEGORY_LOAD_FAIL,
//             error: e.message
//         });
//     })
// })
// }

export const loadCategories = () => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            usersRef = ref.child('users'),
            userRef = usersRef.child(userId),
            categoriesRef = userRef.child('Categories');
        categoriesRef.on('value', function (snap) {
            try {
                if (snap.val()) {
                    let arr = objToArrCategories(snap.val());
                    dispatch({
                        type: CATEGORY_LOAD_SUCCESS,
                        categories: arr
                    });
                }
            } catch (e) {
                dispatch({
                    type: CATEGORY_LOAD_FAIL,
                    error: e.message
                });
                console.log(e);
            }
        })
    };
}

export const categoryCreate = (name, description) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            usersRef = ref.child('users'),
            userRef = usersRef.child(userId),
            categoriesRef = userRef.child('Categories');
        let categoryKey = categoriesRef.push().key;
        let newCatRef = categoriesRef.child(categoryKey);
        newCatRef.set({
            id: categoryKey,
            name: name,
            description: description,
            tasks:{defaultTsk:{id:'default', text:'default', done:true}}
        });
    }
}

export const categoryRemove = (id) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            usersRef = ref.child('users'),
            userRef = usersRef.child(userId),
            categoriesRef = userRef.child('Categories'),
            categoryRef=categoriesRef.child(id);
        categoryRef.remove();

    }
}


export const categoryEdit = (id, name, description) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid,
            usersRef = ref.child('users'),
            userRef = usersRef.child(userId),
            categoriesRef = userRef.child('Categories'),
            categoryRef=categoriesRef.child(id);
        categoryRef.update({name: name, description: description})
    }
}