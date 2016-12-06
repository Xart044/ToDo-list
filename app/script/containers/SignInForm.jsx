//base
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleSignIn} from '../actions/UserActions'

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
    handleValidateFields(){
      const name_f = this.refs.name.getValue(),
            surname_f = this.refs.surname.getValue(),
            email = this.refs.email.getValue(),
            pass = this.refs.pass.getValue(),
            conf_pass = this.refs.confirmpass.getValue();
      if(name_f.length&&surname_f.length&&email.length&&pass.length&&conf_pass.length&&pass === conf_pass){
        this.props.handleSignIn(email,pass,name_f,surname_f);
      }
      else{
        console.log('error');
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
                                       hintText="Name"
                                       floatingLabelText="Name"
                                       type="text"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <TextField style={styles.input}
                                       ref="surname"
                                       hintText="Surname"
                                       floatingLabelText="Surname"
                                       type="text"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <TextField style={styles.input}
                                       ref="email"
                                       hintText="E-mail"
                                       floatingLabelText="E-mail"
                                       type="email"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <TextField style={styles.input}
                                       ref="pass"
                                       hintText="Password"
                                       floatingLabelText="Password"
                                       type="password"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <TextField style={styles.input}
                                       ref="confirmpass"
                                       hintText="Confirm password"
                                       floatingLabelText="Confirm password"
                                       type="password"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <div className="auth-btn">
                                <Link to="/login"><RaisedButton label="Log in existed account" secondary={true}/></Link>                                
                                <RaisedButton label="Register" primary={true} onClick={this.handleValidateFields.bind(this)}/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>

        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


function mapDispatchToProps(dispatch) {
    return {
        handleSignIn: bindActionCreators(handleSignIn, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);