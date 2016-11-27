import React, {Component} from 'react';
import AuthLayout from '../containers/AuthLayout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'

}

export default class Layout extends Component {

    render() {

        return (
            <MuiThemeProvider>
                <div style={style}>
                    <AuthLayout/>
                </div>
            </MuiThemeProvider>
        );
    }
}


