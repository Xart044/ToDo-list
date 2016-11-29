import React, {Component} from 'react';
import AuthLayout from './AuthLayout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Layout extends Component {

    render() {

        return (
            <MuiThemeProvider>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}


