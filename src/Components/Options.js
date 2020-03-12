import React from 'react';

import { Link } from 'react-router-dom';

const Options = () => {
	return (
		<div>
			<h1>
				<u>Game options:</u>
			</h1>
			<select name="" id="">
				<option value="">--Select a difficulty--</option>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>
			<select name="" id="">
				<option value="">--Select a theme--</option>
				<option value="">Simpson</option>
				<option value="">South Park</option>
				<option value="">SpongeBob SquarePants</option>
			</select>
			<Link to='/game'>
				<button>Start game</button>
			</Link>
		</div>
	);
};

export default Options;
