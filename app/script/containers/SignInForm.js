import React , {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class SignInForm extends Component {
    render(){
        return(<TextField
            hintText="Password"
            floatingLabelText="Password"
            floatingLabelFixed={true}
        />);
    }

}

