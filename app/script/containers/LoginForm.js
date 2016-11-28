import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import './../styles/auth.scss';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';

const styles = {
    label: {
        fontSize: 24,
        fontWeight: 400,
    },
    input: {
        width: '100%'
    }
};

export default class LoginForm extends Component {

    render() {
        return (
        <Tabs className="auth-container">
            <Tab label="Log In" value="a">
                <div className="auth-tab">
                    <TextField style={styles.input}
                               hintText="E-mail"
                               floatingLabelText="E-mail"
                               type="email"
                               floatingLabelFixed={false}
                               floatingLabelFocusStyle={styles.label}
                    />
                    <TextField style={styles.input}
                               hintText="Password"
                               floatingLabelText="Password"
                               type="password"
                               floatingLabelFixed={false}
                               floatingLabelFocusStyle={styles.label}
                    />

                    <div className="auth-btn"><RaisedButton label="Log in" primary={true}  /></div>
                </div>
            </Tab>
        </Tabs>

        );
    }

}
