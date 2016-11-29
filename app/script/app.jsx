import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {crateStore} from 'redux';
import {Provider} from 'react-redux';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configDB from './db.config';
import * as firebase from 'firebase';

//componetns
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import LoginForm from './containers/LoginForm'
import SignInForm from './containers/SignInForm'

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
					{/*<Route></Route>
								Два роута на будущее
								один для логин формы
								другой для регистрации
					<Route></Route>*/}
				</Route>
			</Router>
        </Provider>,
    App
);