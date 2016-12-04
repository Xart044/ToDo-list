//base
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleLogin} from '../actions/UserActions'

//styles 
import '../styles/login.scss';

//components
import TextField from 'material-ui/TextField';
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


class LoginForm extends Component {
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
                                       ref="email"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <TextField style={styles.input}
                                       hintText="Password"
                                       floatingLabelText="Password"
                                       type="password"
                                       ref="pass"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <Checkbox style={styles.checkbox}
                                      labelStyle={styles.label1}
                                      label="Remember me"
                            />
                            <div className="auth-btn">
                              <Link to="/register"><RaisedButton label="Go to register" secondary={true}/></Link>
                              <RaisedButton label="Log in" primary={true} onClick={() =>this.props.handleLogin(this.refs.email.getValue(), this.refs.pass.getValue())}/>
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
        handleLogin: bindActionCreators(handleLogin, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
