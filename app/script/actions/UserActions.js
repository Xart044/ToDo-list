import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    REGISTR_SUCCES,
    REGISTER_FAIL,
    SIGNOUT_SUCCESS,
    LOAD_PHOTO
} from '../constants/User'
import {hashHistory} from 'react-router';
import {ref, itRef, firebaseAuth, storageRef} from './../db.config';

export const HandleLoginWithoutPass = (user) => {
    return function (dispatch) {
        const userRef = itRef.ref('users/' + user.uid);
        userRef.once('value')
            .then((snap) => {
                return snap.val();
            })
            .then((val) => {
                dispatch({
                    type: LOGIN_SUCCES,
                    name: val.name,
                    surname: val.surname,
                    photo: val.photo
                });
            })
            .catch((e) => {
                console.log(e);
            })
    }
}

export const handleLogin = (email, pass) => {
    return function (dispatch) {
        firebaseAuth.signInWithEmailAndPassword(email, pass)
            .then((user) => {
                const userRef = itRef.ref('users/' + user.uid);
                userRef.once('value')
                    .then((snap) => {
                        return snap.val();
                    })
                    .then((val) => {
                        dispatch({
                            type: LOGIN_SUCCES,
                            name: val.name,
                            surname: val.surname,
                            photo: val.photo
                        });
                        hashHistory.push('/categories');
                    })
            })
            .catch(e => {
                dispatch({
                    type: LOGIN_FAIL,
                    error: e.message,
                });
            });
    }
};

export const handleSignIn = (email, pass, name, surname) => {
    return function (dispatch) {
        firebaseAuth.createUserWithEmailAndPassword(email, pass)
            .then((user) => {
                dispatch({
                    type: REGISTR_SUCCES,
                    name: name,
                    surname: surname,
                    photo: 'no'
                });
                const userRef = itRef.ref('users/' + user.uid);
                userRef.set({
                    name: name,
                    surname: surname,
                    photo: 'no',
                    Categories: {
                        all: {
                            id: 'all',
                            name: 'All tasks',
                            description: 'Tasks from all categories',
                            tasks: {
                                defaultTsk: {
                                    id: 'default',
                                    text: 'default',
                                    done: true
                                }
                            }
                        }
                    },
                });
                hashHistory.push('/categories');
            })
            .catch((e) => {
                dispatch({
                    type: REGISTER_FAIL,
                    error: e.message,
                });
            })
    }
};

export const handleSignOut = () => {
    return function (dispatch) {
        firebaseAuth.signOut()
            .then(() => {
                dispatch({
                    type: SIGNOUT_SUCCESS
                });
                hashHistory.push('/login');
            })
            .catch((e) => {
                console.log(e);
            })
    };
};

export const loadPhoto = (file) => {
    return function (dispatch) {
        const userId = firebaseAuth.currentUser.uid;
        const userRef = itRef.ref('users/' + userId);
        let imgRef = storageRef.child(userId).child('avatar');
        if (file) {
            imgRef.put(file).then(() => {
                imgRef.getDownloadURL().then((url) => {
                    userRef.update({photo: url});
                    dispatch({
                        type: LOAD_PHOTO,
                        photo: url
                    });
                })
            })
        }
    };
};