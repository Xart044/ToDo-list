//base
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HandleLoginWithoutPass} from '../actions/UserActions'
import {firebaseAuth} from './../db.config'
//styles


//components
import NavBar from './NavBar';


class UserLayout extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        firebaseAuth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.props.HandleLoginWithoutPass(firebaseUser);
            }
        });
    }

    renderContent = () => {
        if(this.props.user.name){
            return <div><NavBar/>{this.props.children}</div>
        }
        else{
            return <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src="app/images/ring.svg"/></div>;
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);
