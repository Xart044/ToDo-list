import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    SIGNOUT_SUCCESS
} from '../constants/User'
import {hashHistory} from 'react-router';
import {firebaseAuth} from '../db.config';

export const handleLogin = (email, pass) => {

    return function(dispatch) {
        console.log(email, pass);

        firebaseAuth.signInWithEmailAndPassword(email, pass)
            .then(()=>{
                dispatch({
                    type: LOGIN_SUCCES,
                    payload: email,

                });
                hashHistory.push('/user');
                console.log("yes");
            })
            .catch(e=>{
                dispatch({
                    type: LOGIN_FAIL,
                    error: e.message
                });
            });


        // VK.Auth.login((r) => {
        //     if (r.session) {
        //         let username = r.session.user.first_name;
        //
        //         dispatch({
        //             type: LOGIN_SUCCES,
        //             payload: username
        //         })
        //
        //     } else {
        //         dispatch({
        //             type: LOGIN_FAIL,
        //             error: true,
        //             payload: new Error('Ошибка авторизации')
        //         })
        //     }
        // },4);
    }

};
export const handleSignOut = () => {

    return function (dispatch) {
        firebaseAuth.signOut();
        dispatch({
            type: SIGNOUT_SUCCESS
        });
        console.log('logout');
        hashHistory.push('/');
    };
};