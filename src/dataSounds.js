import SoundsSimpsonsWEBM from './Sounds/Simpson/soundsSimpsons.webm';
import SoundsSimpsonsMP3 from './Sounds/Simpson/soundsSimpsons.mp3';

import { Howler, Howl } from 'howler';

export const soundsTheme = new Howl({
	src: [SoundsSimpsonsWEBM, SoundsSimpsonsMP3],
	sprite: {
		doh: [0, 705.3061224489796],
		Ouh_Pinaise: [2000, 1018.7755102040815],
		Simpson_theme: [5000, 98847.34693877552]
	}
});

// const id = soundsTheme._sounds[0]._id
// const doh = soundsTheme.play('doh')
// const ouhPinaise = soundsTheme.play('Ouh_Pinaise')
// const themeSongId = soundsTheme.play('Simpson_theme');
// console.log(soundsTheme, id)

// setTimeout(() => {
//     console.log(soundsTheme, id)
// 	soundsTheme.stop(themeSongId);
// }, 4000);
// setTimeout(() => {
//     console.log(soundsTheme, id)
// 	soundsTheme.play('Simpson_theme')
// }, 8000);
// setTimeout(() => {
//     console.log(soundsTheme, id)
// 	soundsTheme.stop(themeSongId + 1);
// }, 12000);
// export const playSongTheme = songTheme().play()
