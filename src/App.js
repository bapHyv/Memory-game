import React from 'react';
import './App.css';

import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';

import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route>
					<GamePage path="/game" />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
