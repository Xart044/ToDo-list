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
import Snackbar from 'material-ui/Snackbar';

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
    state = {
      open: false,
      message: ''
    };
    handleLoginValidate(){
      this.setState({
        open: false,
        message: ''
      });
      const email = this.refs.email.getValue(),
            pass = this.refs.pass.getValue();
      this.props.handleLogin(email, pass);
      setTimeout(()=>{
        if (this.props.user.error) {
          this.setState({open: true, message: this.props.user.error});
        }
      }, 1500);    
    }
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
                                       id="email"
                                       floatingLabelFixed={false}
                                       required={true}
                                       floatingLabelFocusStyle={styles.label}
                            />
                            <TextField style={styles.input}
                                       hintText="Password"
                                       floatingLabelText="Password"
                                       type="password"
                                       ref="pass"
                                       id="pass"
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
                              <RaisedButton label="Log in" primary={true} onClick={this.handleLoginValidate.bind(this)}/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="undo"
                    autoHideDuration={3000}
                    contentStyle={{height:'auto'}}
                />
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
