import React, { useContext } from 'react';

import '../CSS/memoryGame.css';

import { Link } from 'react-router-dom';
import Bounce from 'react-reveal';

import { frontFace, backFace } from '../DataImages';

import gameContext from '../Context/gameContext';
import optionsContext from '../Context/optionsContext';

const MemoryGame = () => {
	const [gameState, gameDispatch] = useContext(gameContext);
	const { numberOfClicks } = gameState;

	const [optionsState, optionsDispatch] = useContext(optionsContext);
	const { difficulty, theme, time } = optionsState;

	const handleClickCard = event => {
		event.currentTarget.className === 'card'
			? (event.currentTarget.className = 'card flip')
			: (event.currentTarget.className = 'card');
		gameDispatch({
			type: 'SET_NUMBER_CLICKS'
		})
	};

	const handleClickButton = () => {
		gameDispatch({
			type: "RESET_NUMBER_CLICKS"
		})
	}

	const cards = [];

	for (let i = 0; i < (difficulty / 2); i++) {
		for (let j = 0; j < 2; j++) {
			cards.push(
				<div
					className="card"
					onClick={handleClickCard}
					key={j % 2 === 0 ? i : i + frontFace.length}
				>
					<img
						className="frontCard"
						src={frontFace[i].img}
						alt={frontFace[i].name}
					/>
					<img className="backCard" src={backFace} alt="back face" />
				</div>
			);
		}
	}

	console.log('game state:', gameState);

	return (
		<div className="memoryPage">
			<Bounce top>
				<h1 className="title">Memory game</h1>
			</Bounce>
			<div className="timeAndClick">
				<Bounce left>
					<h2>timer: {time}</h2>
				</Bounce>
				<Bounce right>
					<h2>click: {numberOfClicks}</h2>
				</Bounce>
			</div>
			<Bounce left>
				<div className="cards">{cards}</div>
			</Bounce>
			<Bounce bottom>
				<div className="optionsButton">
					<Link to="/">
						<button onClick={handleClickButton}>Options</button>
					</Link>
				</div>
			</Bounce>
		</div>
	);
};

export default MemoryGame;
