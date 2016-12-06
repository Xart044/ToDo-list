//base
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {crateStore} from 'redux';
import {Provider} from 'react-redux';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

//componetns
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import LoginForm from './containers/LoginForm';
import SignInForm from './containers/SignInForm';
import UserLayout from './containers/UserLayout';
import TaskCategoriesLayout from './containers/TaskCategoriesLayout';

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
					<Route path='/user' component={UserLayout}>
					<IndexRoute component={TaskCategoriesLayout}></IndexRoute>s
						{/*<IndexRoute component={TaskCategoriesLayout}></IndexRoute>
						*/}
					</Route>
				</Route>
			</Router>
        </Provider>,
    App
);