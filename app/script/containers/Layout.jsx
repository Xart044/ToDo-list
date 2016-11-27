import React, {Component} from 'react';
import User from '../components/User';
import Page from '../components/Page';
import './Layout.sass';

export default class Layout extends Component {

    render() {

        return (
            <div className='row'>
                <Page/>
                <User/>
            </div>
        );
    }
}


