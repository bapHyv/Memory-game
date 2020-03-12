import React, { useContext } from 'react';

import '../CSS/options.css'

import { Link } from 'react-router-dom';

import Bounce from 'react-reveal'

import optionsContext from '../Context/optionsContext'

const Options = () => {

	const [state, dispatch] = useContext(optionsContext)

	return (
		<div className="gameOptions">
			<Bounce top>
				<h1>
					<u>Game options:</u>
				</h1>
			</Bounce>
			<Bounce left>
				<select name="" id="">
					<option value="">--Select a difficulty--</option>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</Bounce>
			<Bounce right>
				<select name="" id="">
					<option value="">--Select a theme--</option>
					<option value="">Simpson</option>
					<option value="">South Park</option>
					<option value="">SpongeBob SquarePants</option>
				</select>
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
