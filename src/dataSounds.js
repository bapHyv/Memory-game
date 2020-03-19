import SoundsSimpsonsWEBM from './Sounds/Simpson/soundsSimpsons.webm';
import SoundsSimpsonsMP3 from './Sounds/Simpson/soundsSimpsons.mp3';

import { Howl } from 'howler';

export const soundsTheme = new Howl({
	src: [SoundsSimpsonsWEBM, SoundsSimpsonsMP3],
	sprite: {
		doh: [0, 705.3061224489796],
		Ouh_Pinaise: [2000, 1018.7755102040815],
		Simpson_theme: [5000, 98847.34693877552]
	}
});
