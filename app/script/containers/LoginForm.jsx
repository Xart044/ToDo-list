import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import '../styles/login.scss';
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
    },
    checkbox:{
        marginTop: '10px'
    },
    label1:{
        color: 'grey'
    }
};

export default class LoginForm extends Component {
    render() {
        return (
            <div className="login-wrapper">
                <Tabs className="auth-container">
                    <Tab label="Log In" value="a">
                        <div className="auth-tab">
                            <TextField style={styles.input}
                                       hintText="E-mail"
                                       floatingLabelText="E-mail"
                                       type="email"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <TextField style={styles.input}
                                       hintText="Password"
                                       floatingLabelText="Password"
                                       type="password"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <Checkbox style={styles.checkbox}
                                      labelStyle={styles.label1}
                                      label="Remember me"
                            />
                            <div className="auth-btn"><RaisedButton label="Log in" primary={true}/></div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }

}
