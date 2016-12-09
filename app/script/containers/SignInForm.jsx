//base
import React, {Component} from 'react';
import {Link} from 'react-router';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleSignIn} from '../actions/UserActions'
import Snackbar from 'material-ui/Snackbar';
//styles
import '../styles/login.scss';

//components
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
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


class SignInForm extends Component {

    state = {
        errorTextname: '',
        errorTextsurname: '',
        errorTextemail: '',
        errorTextpass: '',
        errorTextconfirmpass: '',
        open: false,
        message: ''
    };

    validateEmail(email) {
        let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(email);
    }

    handleChange(e) {
      this.setState({open: false});
        if (e.target.id == 'email') {
            if (!this.validateEmail(e.target.value)) {
                this.setState({['errorText' + e.target.id]: 'Incorrect email'});
            }
            else {
                this.setState({['errorText' + e.target.id]: ''});
            }
        }
        if (e.target.id == 'pass') {
            if (e.target.value.length < 6) {
                this.setState({['errorText' + e.target.id]: 'Password should be at least 6 characters'});
            }
            else {
                this.setState({['errorText' + e.target.id]: ''});
            }
        }

        if (!e.target.value) {
            this.setState({['errorText' + e.target.id]: 'This field is required'});
        }
        else if (e.target.id != 'email' && e.target.id != 'pass') {
            this.setState({['errorText' + e.target.id]: ''});
        }
    }


    handleValidateFields() {
        let inputs = this.refs;
        let valid = true;
        const name_f = this.refs.name.getValue(),
            surname_f = this.refs.surname.getValue(),
            email = this.refs.email.getValue(),
            pass = this.refs.pass.getValue(),
            conf_pass = this.refs.confirmpass.getValue();
        for (var key in inputs) {
            if (!inputs[key].getValue()) {
                this.setState({['errorText' + key]: 'This field is required'});
                valid = false;
            }
        }
        if (!(pass == conf_pass)) {
            this.setState({errorTextconfirmpass: 'Passwords doesn`t match'});
            valid = false;
        }
        if (email && !this.validateEmail(email)) {
            this.setState({errorTextemail: 'Incorrect Email'});
            valid = false;
        }
        if (pass && pass.length < 6) {
            this.setState({errorTextpass: 'Password should be at least 6 characters'});
            valid = false;
        }

        if (valid) {
          /**
           * TODO: make hadnleSignIn method work synchronously
           */
          this.props.handleSignIn(email, pass, name_f, surname_f);
          setTimeout(()=>{
            if (this.props.error) {
              this.setState({open: true, message: this.props.error});
            }
          }, 1500);
        }
    }

    render() {
        return (

            <div className="login-wrapper">
                <Tabs className="auth-container">
                    <Tab label="Register" value="a">
                        <div className="auth-tab">
                            <TextField style={styles.input}
                                       ref="name"
                                       id="name"
                                       hintText="Name"
                                       floatingLabelText="Name"
                                       type="text"
                                       floatingLabelFixed={false}
                                       required={true}
                                       errorText={this.state.errorTextname}
                                       floatingLabelFocusStyle={styles.label}
                                       onChange={this.handleChange.bind(this)}
                            />
                            <TextField style={styles.input}
                                       ref="surname"
                                       id="surname"
                                       hintText="Surname"
                                       floatingLabelText="Surname"
                                       type="text"
                                       floatingLabelFixed={false}
                                       errorText={this.state.errorTextsurname}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                                       onChange={this.handleChange.bind(this)}
                            />
                            <TextField style={styles.input}
                                       ref="email"
                                       id="email"
                                       hintText="E-mail"
                                       floatingLabelText="E-mail"
                                       type="email"
                                       floatingLabelFixed={false}
                                       errorText={this.state.errorTextemail}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                                       onChange={this.handleChange.bind(this)}
                            />
                            <TextField style={styles.input}
                                       ref="pass"
                                       id="pass"
                                       hintText="Password"
                                       floatingLabelText="Password"
                                       type="password"
                                       floatingLabelFixed={false}
                                       errorText={this.state.errorTextpass}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                                       onChange={this.handleChange.bind(this)}
                            />
                            <TextField style={styles.input}
                                       ref="confirmpass"
                                       id="confirmpass"
                                       hintText="Confirm password"
                                       floatingLabelText="Confirm password"
                                       type="password"
                                       floatingLabelFixed={false}
                                       errorText={this.state.errorTextconfirmpass}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                                       onChange={this.handleChange.bind(this)}
                            />
                            <div className="auth-btn">
                                <Link to="/login"><RaisedButton label="Log in existed account" secondary={true}/></Link>
                                <RaisedButton label="Register" primary={true} onClick={this.handleValidateFields.bind(this)}/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="undo"
                    autoHideDuration={3000}
                />
            </div>

        );
    }

}

function mapStateToProps(state) {
    return {
        error: state.user.error
    }
}


function mapDispatchToProps(dispatch) {
    return {
        handleSignIn: bindActionCreators(handleSignIn, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);