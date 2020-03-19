import React, { useContext, useState, useEffect } from 'react';

import '../CSS/memoryGame.css';

import { Link } from 'react-router-dom';
import Bounce from 'react-reveal';

import randomiseArray from '../randomiseArrayAlgorithm';

import { Howler } from 'howler';
import { soundsTheme } from '../dataSounds';
import { backFace, imagesFrontFace12cards, imagesFrontFace24cards } from '../dataImages';

import optionsContext from '../Context/optionsContext';

const MemoryGame = () => {
	const [optionsState] = useContext(optionsContext);
	const { difficulty, theme, time } = optionsState;
	// The imgArray is set to an array with cards by default because if imgArray was an empty array, the winning condition would be triggered at the beginning of the game
	const [imgArray, setImgArr] = useState(['cards']);
	const [imgFlipped, setImgFlipped] = useState([]);
	const [winCount, setWinCount] = useState(0);
	const [win, setWin] = useState(false);
	const [lost, setLost] = useState(false);
	const [timer, setTimer] = useState(time);
	const [gameStarted, setGameStarted] = useState(false);
	const [numberOfClick, setNumberOfClick] = useState(0);
	const [intervalAndTimoutId, setIntervalAndTimoutId] = useState([]);
	const [themeSongId, setThemeSongId] = useState(0);

	// COMPONENT DID MOUNT
	useEffect(() => {
		Howler.volume(0.5);
	}, []);

	// COMPONENT DID UPDATE
	useEffect(() => {
		// keep track of the Simpson_theme song id through out the game because at the beginning of each game, a new instance of Howl is created
		soundsTheme._sounds.map(e => {
			if (e._sprite === 'Simpson_theme') {
				setThemeSongId(e._id);
			}
		});
	}, [numberOfClick, winCount, win, lost, gameStarted]);

	// COMPONENT DID UPDATE
	useEffect(() => {
		// shuffle the cards inside the array at the beggining of the game and when the user win or lose
		setImgArr(
			randomiseArray(difficulty === 12 ? imagesFrontFace12cards : imagesFrontFace24cards).map(e => {
				return {
					...e,
					flipped: false,
					matched: false
				};
			})
		);
		soundsTheme.stop(themeSongId);
	}, [win, lost]);

	// COMPONENT DID UPDATE
	useEffect(() => {
		if (winCount === imgArray.length / 2) {
			setTimeout(() => {
				alert(`You won in ${time - timer + 1} seconds and ${numberOfClick} clicks`);
				setWin(prevWin => !prevWin);
				resetLocalState();
				clearInterval(intervalAndTimoutId[0]);
				clearTimeout(intervalAndTimoutId[1]);
				setIntervalAndTimoutId([]);
			}, 1000);
		}
		/*
			When 2 cards are flipped and not matched, if the user click on an other card during the animation that flip back the card, 
			this 3rd card can stay stuck. the line of code under prevent this bug
		*/
		imgArray.map(e => {
			if (e.flipped === true && imgFlipped.length === 0) {
				resetImgArr();
			}
		});
	}, [winCount, numberOfClick]);

	// CLICK EVENT ON CARD
	const clickingOnCard = (name, index) => {
		if (imgFlipped.length === 2) {
			setTimeout(() => {
				checkingMatch();
			}, 500);
		} else {
			let image = { name, index };
			let imgFlippedTemp = imgFlipped;
			let imgArrayTemp = imgArray;
			/*
				When 2 cards are flipped and not matched, if the user click on an other card during the animation that flip back the card, 
				this 3rd card can stay stuck. the line of code under prevent this bug
			*/
			if (imgFlippedTemp.length < 2) {
				imgArrayTemp[index].flipped = true;
				imgFlippedTemp.push(image);
				setImgArr(imgArrayTemp);
				setImgFlipped(imgFlippedTemp);
			}
		}
		if (imgFlipped.length === 2) {
			setTimeout(() => {
				checkingMatch();
			}, 500);
		}
		setNumberOfClick(prevNumberOfClick => prevNumberOfClick + 1);
	};

	// MATCHING CONDITION
	const checkingMatch = () => {
		let imgArrayTemp = imgArray;

		if (imgFlipped[0].name === imgFlipped[1].name && imgFlipped[0].index !== imgFlipped[1].index) {
			imgArrayTemp[imgFlipped[0].index].matched = true;
			imgArrayTemp[imgFlipped[1].index].matched = true;
			setWinCount(prevWinCount => prevWinCount + 1);
			soundsTheme.play('Ouh_Pinaise');
		} else {
			imgArrayTemp[imgFlipped[0].index].flipped = false;
			imgArrayTemp[imgFlipped[1].index].flipped = false;
			soundsTheme.play('doh');
		}
		// set the imgArr with the new state
		setImgArr(imgArrayTemp);
		// empty the imgFlipped array
		setImgFlipped([]);
	};

	const resetImgArr = () => {
		imgArray.map(e => {
			return (e.flipped = false), (e.matched = false);
		});
	};

	const resetLocalState = () => {
		resetImgArr();
		setImgFlipped([]);
		setWinCount(0);
		setTimer(time);
		setGameStarted(false);
		setNumberOfClick(0);
		setIntervalAndTimoutId([]);
		setThemeSongId(0);
	};

	const timerInterval = () => {
		const intervalId = setInterval(() => {
			setTimer(prevTimer => prevTimer - 1);
		}, 1000);
		intervalAndTimoutId.push(intervalId);
	};

	const loseTimeout = () => {
		const timeoutId = setTimeout(() => {
			alert('LOSER !!');
			setLost(prevLost => !prevLost);
			resetLocalState();
			clearInterval(intervalAndTimoutId[0]);
			clearTimeout(intervalAndTimoutId[1]);
			setIntervalAndTimoutId([]);
		}, timer * 1000 + 1000);
		intervalAndTimoutId.push(timeoutId);
	};

	const startGame = () => {
		resetImgArr();
		setImgFlipped([]);
		setGameStarted(true);
		timerInterval();
		loseTimeout();
		soundsTheme.volume(0.3).play('Simpson_theme');
	};

	const handleClickOptions = () => {
		resetLocalState();
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
					<button onClick={() => startGame()} disabled={gameStarted ? true : false}>
						start the game
					</button>
				</Bounce>
				<Bounce right>
					<h2>click: {numberOfClick}</h2>
				</Bounce>
			</div>
			<Bounce left>
				<div className={`cards cards${difficulty}`}>
					{imgArray.map((e, i, a) => {
						return (
							<div
								className={
									!gameStarted
										? `card card${difficulty} disabled`
										: `card card${difficulty} ${e.flipped ? 'flip' : ''} ${e.matched ? 'matched' : ''}`
								}
								onClick={() => clickingOnCard(e.name, i)}
								key={i}
								cardname={e.name}
							>
								<img className={`frontCard ${e.matched ? 'matched' : ''}`} src={e.img} alt={e.name} />
								<img className="backCard" src={backFace} alt="back face" />
							</div>
						);
					})}
				</div>
			</Bounce>
			<Bounce bottom>
				<div className="optionsButton">
					<Link to="/">
						<button onClick={handleClickOptions} disabled={gameStarted ? true : false}>
							Options
						</button>
					</Link>
				</div>
			</Bounce>
		</div>
	);
};

export default MemoryGame;
