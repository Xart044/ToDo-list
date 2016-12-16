//base
import React, {Component} from 'react';

//styles


//components
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




