import React, { useContext, useState, useEffect } from 'react';

import '../CSS/memoryGame.css';

import { Link } from 'react-router-dom';
import Bounce from 'react-reveal';

import randomiseArray from '../randomiseArrayAlgorithm';

import { Howler } from 'howler';
import { soundEffectSimpson, themeSongSimpson, soundEffectSouthPark, themeSongSouthPark } from '../dataSounds';
import { backFaceSimpsons, imagesFrontFaceSimpsons12cards, imagesFrontFaceSimpsons24cards, backFaceSouthPark, imagesFrontFaceSouthPark12cards, imagesFrontFaceSouthPark24cards } from '../dataImages';

import optionsContext from '../Context/optionsContext';

import speaker from '../Assets/Images/speaker-128.png';
import mutedSpeaker from '../Assets/Images/muted_speaker-128.png';

const MemoryGame = () => {
	const [optionsState] = useContext(optionsContext);
	const { difficulty, theme, time } = optionsState;
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
	const [muted, setMuted] = useState(false);

	// COMPONENT DID MOUNT
	useEffect(() => {
		Howler.volume(0.5);
	}, []);

	//COMPONENT DID UPDATE
	useEffect(() => {
		Howler.mute(muted);
	}, [muted]);

	// COMPONENT DID UPDATE
	useEffect(() => {
		// keep track of the Simpson_theme song id through out the game because at the beginning of each game, a new instance of Howl is created
		(theme === 'simpson' ? themeSongSimpson : themeSongSouthPark)._sounds.map(e => {
			if (e._sprite === 'Simpson_theme' || e._sprite === 'South_park_theme') {
				setThemeSongId(e._id);
			}
		});
	}, [numberOfClick, winCount, win, lost, gameStarted]);

	// COMPONENT DID UPDATE
	useEffect(() => {
		// shuffle the cards inside the array at the beggining of the game and when the user win or lose
		setImgArr(
			randomiseArray(theme === 'simpson' ? (difficulty === 12 ? imagesFrontFaceSimpsons12cards : imagesFrontFaceSimpsons24cards) : difficulty === 12 ? imagesFrontFaceSouthPark12cards : imagesFrontFaceSouthPark24cards).map(e => {
				return {
					...e,
					flipped: false,
					matched: false
				};
			})
		);
		(theme === 'simpson' ? themeSongSimpson : themeSongSouthPark).stop(themeSongId);
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
			if (winCount === imgArray.length / 2 - 1) {
				theme === 'simpson' ? soundEffectSimpson.play('woohoo') : soundEffectSouthPark.play('applaudissement');
			} else {
				theme === 'simpson' ? soundEffectSimpson.play('Ouh_Pinaise') : soundEffectSouthPark.play('ouais');
			}
		} else {
			imgArrayTemp[imgFlipped[0].index].flipped = false;
			imgArrayTemp[imgFlipped[1].index].flipped = false;
			theme === 'simpson' ? soundEffectSimpson.play('doh') : soundEffectSouthPark.play('ca_craint');
		}
		// set the imgArr with the new state
		setImgArr(imgArrayTemp);
		// empty the imgFlipped array
		setImgFlipped([]);
	};

	// this function is used to reset every single card
	const resetImgArr = () => {
		imgArray.map(e => {
			return (e.flipped = false), (e.matched = false);
		});
	};

	// this function is used to reset the local state at the end of each game and when the user click on options to prevent any bug
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
		// keep track of the interval IDs to stop them when the game finishes
		intervalAndTimoutId.push(timeoutId);
	};

	const playThemeSong = theme => {
		return theme === 'simpson'
			? themeSongSimpson
					.volume(0.4)
					.loop(true)
					.play('Simpson_theme')
			: themeSongSouthPark
					.volume(0.4)
					.loop(true)
					.play('South_park_theme');
	};

	const startGame = () => {
		resetImgArr();
		setImgFlipped([]);
		setGameStarted(true);
		timerInterval();
		loseTimeout();
		playThemeSong(theme)
	};

	const handleClickOptions = () => {
		resetLocalState();
	};

	const muteSound = () => {
		setMuted(prevMuted => !prevMuted);
	};

	const col4 = 'col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 p-0';
	const col12 = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0';
	const dFlxJustContCent = 'd-flex justify-content-center';

	return (
		<div className="memoryPage">
			<div className={`timeAndClick ${col12}`}>
				<Bounce left>
					<h2 className={`${theme} ${dFlxJustContCent} ${col4}`}>timer: {timer}</h2>
				</Bounce>
				<Bounce>
					<button onClick={() => startGame()} disabled={gameStarted ? true : false} className={`${gameStarted ? 'disabledBtn' : 'enabledBtn'} ${theme} ${col4}`}>
						START
					</button>
				</Bounce>
				<Bounce right>
					<h2 className={`${theme} ${dFlxJustContCent} ${col4}`}>click: {numberOfClick}</h2>
				</Bounce>
			</div>
			<Bounce left>
				<div className={`cards cards${difficulty}`}>
					{imgArray.map((e, i) => {
						return (
							<div className={!gameStarted ? `card card${difficulty} disabled` : `card card${difficulty} ${e.flipped ? 'flip' : ''} ${e.matched ? 'matched' : ''}`} onClick={() => clickingOnCard(e.name, i)} key={i} cardname={e.name}>
								<img className={`frontCard ${e.matched ? 'matched' : ''} ${theme}`} src={e.img} alt={e.name} />
								<img className={`backCard ${theme}`} src={theme === 'simpson' ? backFaceSimpsons : backFaceSouthPark} alt="back face" />
							</div>
						);
					})}
				</div>
			</Bounce>
			<Bounce bottom>
				<div className={`${dFlxJustContCent} ${col12} mt-3`}>
					<Link to="/">
						<button onClick={handleClickOptions} disabled={gameStarted ? true : false} className={`${gameStarted ? 'disabledBtn' : 'enabledBtn'} ${theme}`}>
							OPTIONS
						</button>
					</Link>
				</div>
				<div className={`${dFlxJustContCent} ${col12} mt-3 mb-3`}>{muted ? <img onClick={muteSound} src={mutedSpeaker} alt="muteSound" className="muteButton" /> : <img onClick={muteSound} src={speaker} alt="muteSound" className="muteButton" />}</div>
			</Bounce>
		</div>
	);
};

export default MemoryGame;
