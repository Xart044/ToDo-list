//base
import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HandleLoginWithoutPass} from '../actions/UserActions'
import {firebaseAuth} from './../db.config'
//styles


//components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Layout extends Component {
	componentWillMount() {
		firebaseAuth.onAuthStateChanged(firebaseUser=>{
			if(firebaseUser){
                console.log('cwm');
				this.props.HandleLoginWithoutPass(firebaseUser);
				hashHistory.push('/user');
			}
		}); 
	}
    render() {

        return (
            <MuiThemeProvider>
                {this.props.children}
            </MuiThemeProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

