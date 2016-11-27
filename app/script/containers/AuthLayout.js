import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';
import './../styles/auth-form.scss';
import RaisedButton from 'material-ui/RaisedButton';

// const style={
//     display: 'flex',
//     justifyContent: 'center',
//     width:'100%',
//
// }

export default class AuthLayout extends Component {


    render() {
        return (
            <div >
                <RaisedButton
                    label="Log In"
                    primary={true}
                />
                <span>or</span>
                <RaisedButton
                    label="Register"
                    primary={true}
                />
            </div>
        );
    }
}
