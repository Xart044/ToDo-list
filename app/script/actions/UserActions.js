import {
    LOGIN_SUCCES,
    LOGIN_FAIL
} from '../constants/User'

export const handleLogin = () => {

    return function(dispatch) {

        VK.Auth.login((r) => {
            if (r.session) {
                let username = r.session.user.first_name;

                dispatch({
                    type: LOGIN_SUCCES,
                    payload: username
                })

            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    error: true,
                    payload: new Error('Ошибка авторизации')
                })
            }
        },4);
    }

}
