import React, { useContext, useState, useEffect } from 'react';

import '../CSS/options.css';

import { Link } from 'react-router-dom';

import Bounce from 'react-reveal';

import optionsContext from '../Context/optionsContext';

const Options = () => {
	const [difficultyLocalState, setDifficultyLocalState] = useState(null);
	const [themeLocalState, setThemeLocalState] = useState(null);
	const [timeLocalState, setTimeLocalState] = useState(null);

	const [state, dispatch] = useContext(optionsContext);

	console.log('options state:', state)

	useEffect(() => {
		dispatch({
			type: 'SET_DIFFICULTY',
			payload: difficultyLocalState
		});
		dispatch({
			type: 'SET_THEME',
			payload: themeLocalState
		});
		dispatch({
			type: 'SET_TIME',
			payload: timeLocalState
		});
	}, [difficultyLocalState, themeLocalState, timeLocalState]);

	const handleSelectDifficulty = event => {
		const { value } = event.target;
		setDifficultyLocalState(value);
	};

	const handleSelectTheme = event => {
		const { value } = event.target;
		setThemeLocalState(value);
	};

	const handleSelectTime = event => {
		const { value } = event.target;
		setTimeLocalState(parseInt(value));
	};

	return (
		<div className="gameOptions">
			<Bounce top>
				<h1>
					<u>Game options:</u>
				</h1>
			</Bounce>
			<Bounce left cascade>
				<div className="selectOptions">
					<select name="" id="" onChange={handleSelectDifficulty}>
						<option value="">--Select a difficulty--</option>
						<option value="12cards">12 cards</option>
						<option value="24cards">24 cards</option>
					</select>
					<select name="" id="" onChange={handleSelectTheme}>
						<option value="">--Select a theme--</option>
						<option value="simpson">Simpson</option>
						<option value="southPark">South Park</option>
					</select>
					<select name="" id="" onChange={handleSelectTime}>
						<option value="">--Select a time--</option>
						<option value="30">30 secondes</option>
						<option value="60">60 secondes</option>
						<option value="90">90 secondes</option>
						<option value="120">120 secondes</option>
					</select>
				</div>
			</Bounce>
			<Bounce bottom>
				<Link to="/game">
					<button>Start game</button>
				</Link>
			</Bounce>
		</div>
	);
};

export default Options;
