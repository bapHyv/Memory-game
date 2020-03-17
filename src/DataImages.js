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

export const frontFace = [
	{
		img: apu,
		name: 'Apu',
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
	},
	// {
	// 	img: lenny,
	// 	name: 'Lenny'
	// },
	// {
	// 	img: lisa,
	// 	name: 'Lisa'
	// },
	// {
	// 	img: maggie,
	// 	name: 'Maggie'
	// },
	// {
	// 	img: marge,
	// 	name: 'Marge'
	// },
	// {
	// 	img: milhouse,
	// 	name: 'Milhouse'
	// },
	// {
	// 	img: moe,
	// 	name: 'Moe'
	// }
];

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

const imagesFrontFace = frontFace.concat(frontFace)

export const randomizedImagesArray = randomizeArray(imagesFrontFace).map(e => {
	return {
		...e,
		flipped: false,
		matched: false
	}
})