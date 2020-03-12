import React, { useReducer } from 'react';
import './App.css';

import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';

import { Switch, Route } from 'react-router-dom';

import { GameProvider } from './Context/gameContext';
import { gameReducer, initialGameState } from './Reducer/gameReducer';

import { OptionsProvider } from './Context/optionsContext';
import {
	optionsReducer,
	initialOptionsReducer
} from './Reducer/optionsReducer';

function App() {
	const useGameState = useReducer(gameReducer, initialGameState);
	const useOptionsState = useReducer(optionsReducer, initialOptionsReducer);

	return (
		<GameProvider value={useGameState}>
			<OptionsProvider value={useOptionsState}>
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
			</OptionsProvider>
		</GameProvider>
	);
}

export default App;
