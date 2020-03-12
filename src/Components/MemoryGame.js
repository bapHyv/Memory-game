import React, {Fragment, useContext} from 'react';

import '../CSS/memoryGame.css'

import { Link } from 'react-router-dom';
import Bounce from 'react-reveal'

import { frontFace, backFace } from '../DataImages';

import gameContext from '../Context/gameContext'

const MemoryGame = () => {

	const [state, dispatch] = useContext(gameContext);

	const handleClick = event => {
		event.currentTarget.className === 'card'
			? (event.currentTarget.className = 'card flip')
			: (event.currentTarget.className = 'card');
	};

	const cards = [];

	for (let i = 0; i < 12; i++) {
		for (let j = 0; j < 2; j++) {
			cards.push(
					<div className="card" onClick={handleClick} key={j % 2 === 0 ? i : i + frontFace.length}>
						<img className="frontCard" src={frontFace[i].img} alt={frontFace[i].name} />
						<img className="backCard" src={backFace} alt="back face"/>
					</div>
			);
		}
	}

	return (
		<div className="memoryPage">
			<Bounce top>
				<h1 className="title">Memory game</h1>
			</Bounce>
			<div className="timeAndClick">
				<Bounce left>
					<h2>timer: 'time remaining'</h2>
				</Bounce>
				<Bounce right>
					<h2>click: 'number of clicks'</h2>
				</Bounce>
			</div>
			<Bounce>
				<div className="cards">{cards}</div>
			</Bounce>
			<Bounce bottom>
				<div className="optionsButton">
					<Link to="/">
						<button>Options</button>
					</Link>
				</div>
			</Bounce>
		</div>
	);
};

export default MemoryGame;
