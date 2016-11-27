import React, {Component} from 'react';
import AuthLayout from '../containers/AuthLayout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



export default class Layout extends Component {

    render() {

        return (
            <MuiThemeProvider>
                <div>
                    <AuthLayout/>
                </div>
            </MuiThemeProvider>
        );
    }
}


