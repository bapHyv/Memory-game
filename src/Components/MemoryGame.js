import React, { useContext, useState, useEffect } from 'react';

import '../CSS/memoryGame.css';

import { Link } from 'react-router-dom';
import Bounce from 'react-reveal';

import { frontFace, backFace, randomizedImagesArray } from '../DataImages';

import gameContext from '../Context/gameContext';
import optionsContext from '../Context/optionsContext';

const MemoryGame = () => {
	const [gameState, gameDispatch] = useContext(gameContext);
	const { numberOfClicks } = gameState;

	const [optionsState, optionsDispatch] = useContext(optionsContext);
	const { difficulty, theme, time } = optionsState;

	const [imgArray, setImgArr] = useState(randomizedImagesArray);
	const [imgFlipped, setImgFlipped] = useState([]);

	useEffect(() => {
		console.log(imgArray);
	}, []);

	const clickingOnCard = (name, index) => {
		if (imgFlipped.length === 2) {
			setTimeout(() => {
				checkingMatch()
			}, 500);
		} else {
			let image = { name, index };
			let imgFlippedTemp = imgFlipped
			let imgArrayTemp = imgArray;

			imgArrayTemp[index].flipped = true;
			imgFlippedTemp.push(image)
			setImgArr(imgArrayTemp);
			setImgFlipped(imgFlippedTemp)
		}

		if (imgFlipped.length === 2) {
			setTimeout(() => {
				checkingMatch()
			}, 800);
		}
		gameDispatch({
			type: 'SET_NUMBER_CLICKS'
		});
	};

	const checkingMatch = () => {
		let imgArrayTemp = imgArray;

		if (
			imgFlipped[0].name === imgFlipped[1].name &&
			imgFlipped[0].index !== imgFlipped[1].index
		) {
			imgArrayTemp[imgFlipped[0].index].matched = true;
			imgArrayTemp[imgFlipped[1].index].matched = true;
		} else {
			imgArrayTemp[imgFlipped[0].index].flipped = false;
			imgArrayTemp[imgFlipped[1].index].flipped = false;
		}
		setImgArr(imgArrayTemp);
		setImgFlipped([])
	};

	const handleClickButton = () => {
		gameDispatch({
			type: 'RESET_NUMBER_CLICKS'
		});
	};

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
				<div className="cards">
					{imgArray.map((e, i, a) => {
						return (
							<div
								className={`card ${e.flipped ? 'flip' : ''} ${e.matched ? 'matched' : '' }`}
								onClick={() => clickingOnCard(e.name, i)}
								key={i}
								cardname={e.name}
							>
								<img className="frontCard" src={e.img} alt={e.name} />
								<img className="backCard" src={backFace} alt="back face" />
							</div>
						);
					})}
				</div>
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
