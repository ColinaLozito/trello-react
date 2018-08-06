import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import configureStore from './store';

import Header from './components/Header/Header'
import Board from './components/Board/Board'
import NotFound from './components/NotFound'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
	<Provider store={configureStore()}>
		<div className="main-container">
			<Header />
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Board}/>
					<Route path='*' component={NotFound}/>
				</Switch>
			</BrowserRouter>
		</div>
	</Provider>,

document.getElementById('root'))

registerServiceWorker();
