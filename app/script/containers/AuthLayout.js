import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';
import './../styles/auth-form.scss';



export default class AuthLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs className="auth-container" value={this.state.value} onChange={this.handleChange}>
                <Tab label="Log In" value="a">
                        <LoginForm />
                </Tab>
                <Tab label="Sign Up" value="b">
                    <SignInForm/>
                </Tab>
            </Tabs>
        );
    }
}
