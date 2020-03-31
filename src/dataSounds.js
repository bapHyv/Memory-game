import SoundEffectSimpsonWEBM from './Sounds/Simpson/soundEffectSimpson.webm';
import SoundEffectSimpsonMP3 from './Sounds/Simpson/soundEffectSimpson.mp3';
import ThemeSongSimpsonWEBM from './Sounds/Simpson/themeSongSimpson.webm';
import ThemeSongSimpsonMP3 from './Sounds/Simpson/themeSongSimpson.mp3';

import SoundEffectSouthParkWEBM from './Sounds/SouthPark/soundEffectSouthPark.webm';
import SoundEffectSouthParkMP3 from './Sounds/SouthPark/soundEffectSouthPark.mp3';
import ThemeSongSouthParkWEBM from './Sounds/SouthPark/themeSongSouthPark.webm';
import ThemeSongSouthParkMP3 from './Sounds/SouthPark/themeSongSouthPark.mp3';

import { Howl } from 'howler';

export const soundEffectSimpson = new Howl({
	src: [SoundEffectSimpsonWEBM, SoundEffectSimpsonMP3],
	sprite: {
		doh: [0, 705.3061224489796],
		Ouh_Pinaise: [2000, 1018.7755102040815],
		woohoo: [5000, 626.9387755102046]
	}
});

export const themeSongSimpson = new Howl({
	src: [ThemeSongSimpsonWEBM, ThemeSongSimpsonMP3],
	sprite: {
		Simpson_theme: [0, 98847.34693877552]
	}
});

export const soundEffectSouthPark = new Howl({
	src: [SoundEffectSouthParkWEBM, SoundEffectSouthParkMP3],
	sprite: {
		ca_craint: [0, 783.6734693877551],
		ouais: [2000, 757.5510204081635],
		applaudissement: [4000, 2246.5306122448983]
	}
});

export const themeSongSouthPark = new Howl({
	src: [ThemeSongSouthParkWEBM, ThemeSongSouthParkMP3],
	sprite: {
		South_park_theme: [0, 28421.224489795917]
	}
});