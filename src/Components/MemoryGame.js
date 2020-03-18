import React, { useContext, useState, useEffect } from 'react';

import '../CSS/memoryGame.css';

import { Link } from 'react-router-dom';
import Bounce from 'react-reveal';

import { frontFace, backFace, randomizedImagesArray, imagesFrontFace } from '../DataImages';

import gameContext from '../Context/gameContext';
import optionsContext from '../Context/optionsContext';

const MemoryGame = () => {
	const [gameState, gameDispatch] = useContext(gameContext);

	const [optionsState, optionsDispatch] = useContext(optionsContext);
	const { difficulty, theme, time } = optionsState;

	const [imgArray, setImgArr] = useState(['cards']);
	const [imgFlipped, setImgFlipped] = useState([]);
	const [winCount, setWinCount] = useState(0);
	const [win, setWin] = useState(false)
	const [lost, setLost] = useState(false);
	const [timer, setTimer] = useState(time);
	const [gameStarted, setGameStarted] = useState(false);
	const [numberOfClick, setNumberOfClick] = useState(0);
	const [intervalAndTimoutId, setIntervalAndTimoutId] = useState([])

	// COMPONENT DID MOUNT
	useEffect(() => {
		setImgArr(randomizeArray(imagesFrontFace).map(e => {
			return {
				...e,
				flipped: false,
				matched: false
			}
		}))
	}, [win, lost])

	// COMPONENT DID UPDATE
	useEffect(() => {
		if (winCount === imgArray.length / 2) {
			setTimeout(() => {
				alert(`You won in ${time - timer + 1} seconds and ${numberOfClick} clicks`);
				setWin(prevWin => !prevWin)
				resetLocalState();
				clearInterval(intervalAndTimoutId[0]);
				clearTimeout(intervalAndTimoutId[1]);
				setIntervalAndTimoutId([])
			}, 1000);
		}
	}, [winCount]);

	const randomizeArray = (arr) => {
		let index = arr.length;
		let stockingElement, randomIndex
	
		while (0 !== index) {
			randomIndex = Math.floor(Math.random() * index);
			index -= 1
			stockingElement = arr[index]
			arr[index] = arr[randomIndex]
			arr[randomIndex] = stockingElement
		}
		return arr
	}

	const clickingOnCard = (name, index) => {
		if (imgFlipped.length === 2) {
			setTimeout(() => {
				checkingMatch();
			}, 500);
		} else {
			let image = { name, index };
			let imgFlippedTemp = imgFlipped;
			let imgArrayTemp = imgArray;

			imgArrayTemp[index].flipped = true;
			imgFlippedTemp.push(image);
			setImgArr(imgArrayTemp);
			setImgFlipped(imgFlippedTemp);
		}

		if (imgFlipped.length === 2) {
			setTimeout(() => {
				checkingMatch();
			}, 800);
		}
		setNumberOfClick(prevNumberOfClick => prevNumberOfClick + 1);
	};

	const checkingMatch = () => {
		let imgArrayTemp = imgArray;

		if (
			imgFlipped[0].name === imgFlipped[1].name &&
			imgFlipped[0].index !== imgFlipped[1].index
		) {
			imgArrayTemp[imgFlipped[0].index].matched = true;
			imgArrayTemp[imgFlipped[1].index].matched = true;
			setWinCount(winCount + 1);
		} else {
			imgArrayTemp[imgFlipped[0].index].flipped = false;
			imgArrayTemp[imgFlipped[1].index].flipped = false;
		}
		setImgArr(imgArrayTemp);
		setImgFlipped([]);
	};

	const resetImgArr = () => {
		imgArray.map(e => {
			return (e.flipped = false), (e.matched = false)
		});
	};

	const resetLocalState = () => {
		resetImgArr();
		setImgFlipped([]);
		setWinCount(0);
		setWin(false)
		setLost(false);
		setTimer(time);
		setGameStarted(false);
		setNumberOfClick(0);
	};

	const handleClickOptions = () => {
		resetLocalState();
	};

	const timerInterval = () => {
		const intervalId = setInterval(() => {
			setTimer(prevTimer => prevTimer - 1);
		}, 1000)
		intervalAndTimoutId.push(intervalId)
	}

	const loseTimeout = () => {
		const timeoutId = setTimeout(() => {
			alert('LOSER !!');
			setLost(prevLost => !prevLost)
			resetLocalState();
			clearInterval(intervalAndTimoutId[0]);
			clearTimeout(intervalAndTimoutId[1]);
			setIntervalAndTimoutId([])
		}, timer * 1000 + 1000);
		intervalAndTimoutId.push(timeoutId)
	}


	const startGame = () => {
		resetImgArr();
		setImgFlipped([]);
		setGameStarted(true);
		timerInterval()
		loseTimeout()
	};

	return (
		<div className="memoryPage">
			<Bounce top>
				<h1 className="title">Memory game</h1>
			</Bounce>
			<div className="timeAndClick">
				<Bounce left>
					<h2>timer: {timer}</h2>
				</Bounce>
				<Bounce>
					<button
						onClick={() => startGame()}
						disabled={gameStarted ? true : false}
					>
						start the game
					</button>
				</Bounce>
				<Bounce right>
					<h2>click: {numberOfClick}</h2>
				</Bounce>
			</div>
			<Bounce left>
				<div className="cards">
					{imgArray.map((e, i, a) => {
						return (
							<div
								className={
									!gameStarted
										? 'card disabled'
										: `card ${e.flipped ? 'flip' : ''} ${
												e.matched ? 'matched' : ''
										  }`
								}
								onClick={() => clickingOnCard(e.name, i)}
								key={i}
								cardname={e.name}
							>
								<img
									className={`frontCard ${e.matched ? 'matched' : ''}`}
									src={e.img}
									alt={e.name}
								/>
								<img className="backCard" src={backFace} alt="back face" />
							</div>
						);
					})}
				</div>
			</Bounce>
			<Bounce bottom>
				<div className="optionsButton">
					<Link to="/">
						<button
							onClick={handleClickOptions}
							disabled={gameStarted ? true : false}
						>
							Options
						</button>
					</Link>
				</div>
			</Bounce>
		</div>
	);
};

export default MemoryGame;
