import apu from './Assets/Images/Simpson/Apu.png';
import bart from './Assets/Images/Simpson/bart.png';
import burns from './Assets/Images/Simpson/burns.png';
import carl from './Assets/Images/Simpson/Carl.png';
import homer from './Assets/Images/Simpson/homer.png';
import krusty from './Assets/Images/Simpson/krusty.png';
import lenny from './Assets/Images/Simpson/Lenny.png';
import lisa from './Assets/Images/Simpson/lisa.png';
import maggie from './Assets/Images/Simpson/Maggie.png';
import marge from './Assets/Images/Simpson/marge.png';
import milhouse from './Assets/Images/Simpson/milhouse.png';
import moe from './Assets/Images/Simpson/moe.png';
import donut from './Assets/Images/Simpson/donut.png';

export const backFace = donut;

const frontFace12cards = [
	{
		img: apu,
		name: 'Apu'
	},
	{
		img: bart,
		name: 'Bart'
	},
	{
		img: burns,
		name: 'Burns'
	},
	{
		img: carl,
		name: 'Carl'
	},
	{
		img: homer,
		name: 'Homer'
	},
	{
		img: krusty,
		name: 'Krusty'
	}
];

const frontFace24Cards = [
	{
		img: lenny,
		name: 'Lenny'
	},
	{
		img: lisa,
		name: 'Lisa'
	},
	{
		img: maggie,
		name: 'Maggie'
	},
	{
		img: marge,
		name: 'Marge'
	},
	{
		img: milhouse,
		name: 'Milhouse'
	},
	{
		img: moe,
		name: 'Moe'
	}
];

export const imagesFrontFace12cards = frontFace12cards.concat(frontFace12cards);

export const imagesFrontFace24cards = imagesFrontFace12cards.concat(frontFace24Cards.concat(frontFace24Cards))