import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleLogin} from '../actions/UserActions'

class User extends Component{
    render(){
        const {name, error} = this.props.user;
        let template;

        if (name) {
            template = <p>Привет, {name}!</p>
        } else {

            template = <button className='btn' onClick={this.props.handleLogin}>Войти</button>
        }

        return <div className='ib user'>
            {template}
            {error ? <p className='error'> {error}. <br /> Попробуйте еще раз.</p> : ''}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
