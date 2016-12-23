//base
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {crateStore} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {firebaseAuth} from './db.config'

//componetns
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import LoginForm from './containers/LoginForm';
import SignInForm from './containers/SignInForm';
import UserLayout from './containers/UserLayout';
import TaskCategoriesLayout from './containers/TaskCategoriesLayout';
import clientErrorComponent from './components/clientErrorComponent';
import TasksListLayout from './containers/TasksListLayout';

//styles
import './styles/layout.scss';

injectTapEventPlugin();
const App = document.getElementById('App');
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Layout}>
                <IndexRoute component={AuthLayout}></IndexRoute>
                <Route path='/login' component={LoginForm}></Route>
                <Route path='/register' component={SignInForm}></Route>
                <Route path='/categories' component={UserLayout} onEnter={requireAuth}>
                    <IndexRoute component={TaskCategoriesLayout}></IndexRoute>
                    <Route path='/tasks/:catId' component={TasksListLayout}></Route>
                </Route>
            </Route>
            <Route path='*' component={clientErrorComponent}></Route>
        </Router>
    </Provider>,
    App
);


function requireAuth(nextState, replace, callback) {
    firebaseAuth.onAuthStateChanged(firebaseUser => {
        if (!firebaseUser) {
            replace('/login');
            callback();
        }
        else {
            callback();
        }
    });
}
