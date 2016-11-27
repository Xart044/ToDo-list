import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import './../styles/auth-form.scss';
import RaisedButton from 'material-ui/RaisedButton';

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
        return (<div className="auth-tab">
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
        );
    }

}
