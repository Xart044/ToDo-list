import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import './../styles/auth-form.scss';

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
                <TextField style={styles.input} className="auth-input"
                           hintText="User name"
                           floatingLabelText="Name"a
                           floatingLabelFixed={false}
                           floatingLabelFocusStyle={styles.label}
                />
                <TextField className="auth-input"
                           hintText="User name"
                           floatingLabelText="Name"
                           floatingLabelFixed={false}
                           floatingLabelFocusStyle={styles.label}
                />
                <TextField className="auth-input"
                           hintText="User name"
                           floatingLabelText="Name"
                           floatingLabelFixed={false}
                           floatingLabelFocusStyle={styles.label}
                />
            </div>
        );
    }

}
