import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {crateStore} from 'redux';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Layout from './containers/Layout.jsx';
require ('./styles.scss');

const App = document.getElementById('App');
const store = configureStore();

ReactDOM.render(
    <Provider store = {store}>
        <div className="app">
            <Layout/>
        </div>

    </Provider>,
    App
);