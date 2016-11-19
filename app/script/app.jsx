import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import Layout from './components/Layout.jsx';

const store = createStore(allReducers);

const App = document.getElementById('App')

ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>,
     App
);