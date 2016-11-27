import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {crateStore} from 'redux';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Layout from './components/Layout.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const App = document.getElementById('App');
const store = configureStore();


ReactDOM.render(

        <Provider store={store}>
            <div className="app">
                <Layout/>
            </div>
        </Provider>,
    App
);