//base
import React, {Component} from 'react';
import {Link,hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HandleLoginWithoutPass} from '../actions/UserActions'
import {firebaseAuth} from './../db.config'

//styles
import './../styles/auth.scss';

//components
import RaisedButton from 'material-ui/RaisedButton';


class AuthLayout extends Component {
    componentDidMount(){
        firebaseAuth.onAuthStateChanged(firebaseUser=>{
            if(firebaseUser){
                this.props.HandleLoginWithoutPass(firebaseUser);
                hashHistory.push('/user');
            }
        }); 
    }
    render() {
        return (
            <div className="index-layout">
                <div className="index-layout__container">
                    <h1 className="index-layout__title">Task Manager</h1>
                    <div className="index-layout__about">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem nemo ut in a nam quos minus ipsa officiis placeat quis, veniam, accusamus earum sunt nulla! Eos magnam in, deserunt ex reiciendis voluptatum! Atque doloribus repellat minus aliquam id dignissimos, officiis error rerum laboriosam, impedit eos maiores. Iusto autem, impedit quod.
                    </div>
                    <div className="index-layout__wrapper">
                        <Link to='/login'>
                            <RaisedButton
                                label="Log In"
                                primary={true}
                            />
                        </Link>
                        <span className="index-layout__devider">
                            or
                        </span>
                        <Link to='/register'>
                            <RaisedButton
                                label="Register"
                                primary={true}
                            />
                        </Link>
                    </div>
                </div>
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
        HandleLoginWithoutPass: bindActionCreators(HandleLoginWithoutPass, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);