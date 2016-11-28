import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {crateStore} from 'redux';
import {Provider} from 'react-redux';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

//componetns
import Layout from './components/Layout.jsx';
import AuthLayout from './containers/AuthLayout.jsx';

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