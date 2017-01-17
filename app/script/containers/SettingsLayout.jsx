//base
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { firebaseAuth, itRef } from './../db.config'

//styles


//components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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

class SettingsLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        name: this.props.user.name,
        surname: this.props.user.surname,
        email: '',
        newPass: '',
        errorTextname: '',
        errorTextsurname: '',
        errorTextemail: '',
        errorTextnewpass: ''
    };
    validateEmail(email) {
        let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(email);
    }
    editAccount(obj){
        //email update
        if(obj.email){
            firebaseAuth.currentUser.updateEmail(obj.email)
            .then(()=>{
                console.log('updated');
            })
            .catch((e)=>{
                console.log(e);
            })
        }
        //password update
        if(obj.newPassword){
            firebaseAuth.currentUser.updatePassword(obj.newPassword)
            .then(()=>{
                console.log('success');
            })
            .catch((e)=>{
                console.log(e);
            })
        }
        //name && surname update
        const userId = firebaseAuth.currentUser.uid,
        userRef = itRef.ref('users/' + userId);
        userRef.update({
            name: obj.name,
            surname: obj.surname
        })
        .then(()=>{
            console.log('updated');
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    SaveAction(){
        let isValid = true;
        this.setState({
            errorTextname: '',
            errorTextsurname: '',
            errorTextemail: '',
            errorTextnewpass: ''
        });
        if(!this.refs.name.getValue()){
            isValid = false;
            this.setState({errorTextname: 'Incorrect name.It should not be empty.'});
        }
        if(!this.refs.surname.getValue()){
            isValid = false;
            this.setState({errorTextsurname: 'Incorrect surname.It should not be empty.'});
        }
        if(this.refs.email.getValue()){
            if(!this.validateEmail(this.refs.email.getValue())){
                isValid = false;
                this.setState({errorTextemail: 'Incorrect email.'});
            }
        }
        if(!(this.refs.newPass.getValue()==='')){
            if(this.refs.newPass.getValue().length<6){
                isValid = false;
                this.setState({errorTextnewpass: 'Incorrect password.It should be at least 6 characters.'});
            }
        }
        if(isValid){
            const email = this.state.email,
            newPassword = this.state.newPass,
            name = this.state.name,
            surname = this.state.surname,
            editObj = {
                email: email,
                newPassword: newPassword,
                name: name,
                surname: surname
            };
            this.editAccount(editObj);
        }
    }
    onChangeEvent(e){
        switch (e.target.id) {
            case 'email':
                this.setState({
                    email: e.target.value
                });
                break;
            case 'newPass':
                this.setState({
                    newPass: e.target.value
                });
                break;
            case 'name':
                this.setState({
                    name : e.target.value
                });
                break;
            case 'surname':
                this.setState({
                    surname : e.target.value
                });
                break;
            default:
                console.log(e.target.value)
                break;
        }
    }
    render() {
        return (
            <div style={{width: 600, margin: '0 auto'}}>
                Edit Profile:
                <div style={{marginTop: '30px'}}>Input nothing if you dont want to change email</div>
                <TextField 
                    style={styles.input}
                    value={this.state.email}
                    ref="email"
                    id="email"
                    hintText="Set new email"
                    floatingLabelText="Set new email"
                    type="email"
                    floatingLabelFixed={false}
                    required={true}
                    errorText={this.state.errorTextemail}
                    floatingLabelFocusStyle={styles.label}
                    onChange = {this.onChangeEvent.bind(this)}
                />
                <div style={{marginTop: '30px'}}>Input nothing if you dont want to change password</div>
                <TextField 
                    style={styles.input}
                    hintText="Set new password"
                    floatingLabelText="Set new password"
                    type="password"
                    ref="newPass"
                    id="newPass"
                    floatingLabelFixed={false}
                    required={true}
                    errorText={this.state.errorTextnewpass}
                    floatingLabelFocusStyle={styles.label}
                    onChange = {this.onChangeEvent.bind(this)}
                />
                <TextField 
                   style={styles.input}
                   hintText="Set new Name"
                   floatingLabelText="Set new Name"
                   type="text"
                   ref="name"
                   id="name"
                   floatingLabelFixed={false}
                   required={true}
                   value={this.state.name}
                   errorText={this.state.errorTextname}
                   floatingLabelFocusStyle={styles.label}
                   onChange = {this.onChangeEvent.bind(this)}
                />
                <TextField 
                   style={styles.input}
                   hintText="Set new Surname"
                   floatingLabelText="Set new Surname"
                   type="text"
                   ref="surname"
                   id="surname"
                   floatingLabelFixed={false}
                   required={true}
                   value={this.state.surname}
                   errorText={this.state.errorTextsurname}
                   floatingLabelFocusStyle={styles.label}
                   onChange = {this.onChangeEvent.bind(this)}
                />  
                <RaisedButton
                    label="Save changes"
                    primary={true}
                    labelPosition="before"
                    containerElement="label"
                    onClick={this.SaveAction.bind(this)}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsLayout);
