import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    REGISTR_SUCCES,
    REGISTER_FAIL,
    SIGNOUT_SUCCESS
} from '../constants/User'
import {hashHistory} from 'react-router';
import {ref,firebaseAuth} from './../db.config';

export const HandleLoginWithoutPass = (user) => {
    return function(dispatch) {
        const usersRef = ref.child('users'),
        userRef = usersRef.child(user.uid);
        userRef.once('value')
        .then((snap) => {
            return snap.val();
        })
        .then((val)=>{
            dispatch({
                type: LOGIN_SUCCES,
                name: val.name,
                surname: val.surname,
            });
            hashHistory.push('/user');
        })
        .catch((e)=>{
            console.log(e);
        })      
    }   
}

export const handleLogin = (email, pass) => {
    return function(dispatch) {
        firebaseAuth.signInWithEmailAndPassword(email, pass)
        .then((user)=>{
            const usersRef = ref.child('users'),
            userRef = usersRef.child(user.uid);
            userRef.once('value')
            .then((snap) => {
                return snap.val();
            })
            .then((val)=>{
                dispatch({
                    type: LOGIN_SUCCES,
                    name: val.name,
                    surname: val.surname,
                });
                hashHistory.push('/user');
            })
        })
        .catch(e=>{
            dispatch({
                type: LOGIN_FAIL,
                error: e.message,
            });
        });
    }
};

export const handleSignIn = (email,pass,name,surname) => {
    return function(dispatch){
        firebaseAuth.createUserWithEmailAndPassword(email,pass)
        .then((user)=>{
            dispatch({
                type: REGISTR_SUCCES,
                name: name,
                surname: surname,
            });
            const usersRef = ref.child('users'),
            userRef = usersRef.child(user.uid);
            userRef.set({
              name: name,
              surname: surname,
            })
            hashHistory.push('/user');
        })
        .catch((e)=>{
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
        .then(()=>{
            dispatch({
                type: SIGNOUT_SUCCESS
            });
            hashHistory.push('/login');
        })
        .catch((e)=>{
            console.log(e);        
        })
    };
};