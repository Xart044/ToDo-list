import React , {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './../styles/auth-form.scss';

const styles = {
    label: {
        fontSize: 24,
        fontWeight: 400,
    },
    input: {
        width: '100%'
    },
};

export default class SignInForm extends Component {
    render(){
        return(<div className="auth-tab">
            <TextField style={styles.input}
                       hintText="User name"
                       floatingLabelText="Name"
                       floatingLabelFixed={false}
                       floatingLabelFocusStyle={styles.label}
            />
            <TextField style={styles.input}
                       hintText="User surname"
                       floatingLabelText="Name"
                       floatingLabelFixed={false}
                       floatingLabelFocusStyle={styles.label}
            />
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
            <TextField style={styles.input}
                       hintText="Confirm your password"
                       floatingLabelText="Confirm password"
                       type="password"
                       floatingLabelFixed={false}
                       floatingLabelFocusStyle={styles.label}
            />
            <div className="auth-btn"><RaisedButton label="Sign up" primary={true} /></div>
        </div>);
    }

}

