// SHUFFLING ARRAY ALGORITHM
const randomiseArray = arr => {
	let index = arr.length;
	let stockingElement, randomIndex;
	while (0 !== index) {
		randomIndex = Math.floor(Math.random() * index);
		index -= 1;
		stockingElement = arr[index];
		arr[index] = arr[randomIndex];
		arr[randomIndex] = stockingElement;
	}
	return arr;
};

export default randomiseArray