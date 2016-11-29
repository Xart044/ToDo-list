import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';
import './../styles/auth.scss';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';


export default class AuthLayout extends Component {
    render() {
        return (
            <div className="index-layout">
                <h1 className="index-layout__title">Task Manager</h1>
                <div className="index-layout__about">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem nemo ut in a nam quos minus ipsa officiis placeat quis, veniam, accusamus earum sunt nulla! Eos magnam in, deserunt ex reiciendis voluptatum! Atque doloribus repellat minus aliquam id dignissimos, officiis error rerum laboriosam, impedit eos maiores. Iusto autem, impedit quod.
                </div>
                <div className="index-layout__wrapper">
                    <Link to='/login'>
                        <RaisedButton
                            label="Log In"
                            primary={true}
                        />
                    </Link>
                    <span className="index-layout__devider">
                        or
                    </span>
                    <Link to='/register'>
                        <RaisedButton
                            label="Register"
                            primary={true}
                        />
                    </Link>
                </div>
            </div>
        );
    }
}
