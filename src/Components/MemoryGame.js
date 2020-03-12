import React from 'react';
import { Link } from 'react-router-dom';

const MemoryGame = () => {
	return (
		<div>
			<h1>
				<u>Memory Game</u>
			</h1>
			<div>
				<h2>Timer: 'time remaining'</h2>
				<h2>Click: 'number of clicks'</h2>
			</div>
			<div>{/* CARDS */}</div>
			<Link to="/">
				<button>Options</button>
			</Link>
		</div>
	);
};

export default MemoryGame;
