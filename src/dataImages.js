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

import butters from './Assets/Images/SouthPark/butters.png';
import cartman from './Assets/Images/SouthPark/cartman.png';
import chef from './Assets/Images/SouthPark/chef.png';
import craig from './Assets/Images/SouthPark/craig.png';
import kenny from './Assets/Images/SouthPark/kenny.png';
import kyle from './Assets/Images/SouthPark/kyle.png';
import liane from './Assets/Images/SouthPark/liane.png';
import randy from './Assets/Images/SouthPark/randy.png';
import stan from './Assets/Images/SouthPark/stan.png';
import timmy from './Assets/Images/SouthPark/timmy.png';
import token from './Assets/Images/SouthPark/token.png';
import wendy from './Assets/Images/SouthPark/wendy.png';
import southParkSign from './Assets/Images/SouthPark/South_Park_sign_logo.png';

const frontFaceSimpsons12cards = [
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

const frontFaceSimpsons24Cards = [
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

export const backFaceSimpsons = donut;

export const imagesFrontFaceSimpsons12cards = frontFaceSimpsons12cards.concat(frontFaceSimpsons12cards);

export const imagesFrontFaceSimpsons24cards = imagesFrontFaceSimpsons12cards.concat(frontFaceSimpsons24Cards.concat(frontFaceSimpsons24Cards));

const frontFaceSouthPark12Cards = [
	{
		img: cartman,
		name: 'Cartman'
	},
	{
		img: kenny,
		name: 'Kenny'
	},
	{
		img: stan,
		name: 'Stan'
	},
	{
		img: kyle,
		name: 'Kyle'
	},
	{
		img: butters,
		name: 'Butters'
	},
	{
		img: timmy,
		name: 'Timmy'
	}
];

const frontFaceSouthPark24Cards = [
	{
		img: chef,
		name: 'Chef'
	},
	{
		img: liane,
		name: 'Liane'
	},
	{
		img: craig,
		name: 'Craig'
	},
	{
		img: randy,
		name: 'Randy'
	},
	{
		img: token,
		name: 'Token'
	},
	{
		img: wendy,
		name: 'Wendy'
	}
];

export const backFaceSouthPark = southParkSign

export const imagesFrontFaceSouthPark12cards = frontFaceSouthPark12Cards.concat(frontFaceSouthPark12Cards);

export const imagesFrontFaceSouthPark24cards = imagesFrontFaceSouthPark12cards.concat(frontFaceSouthPark24Cards.concat(frontFaceSouthPark24Cards));

