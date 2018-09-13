// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

const deck = document.querySelector('.deck')
const cards = [...document.querySelectorAll('.card')];
const moveCount = document.querySelector('.moves');


let cardList = ['fa-diamond', 'fa-diamond',
								'fa-paper-plane-o', 'fa-paper-plane-o',
								'fa-anchor', 'fa-anchor',
								'fa-bolt', 'fa-bolt',
								'fa-cube', 'fa-cube',
								'fa-leaf', 'fa-leaf',
								'fa-bicycle', 'fa-bicycle',
								'fa-bomb', 'fa-bomb'
							];

const generateCard = (card) => {;
	return `<li class="card"><i class="fa ${card}"></i>`;
}

const initGame = () => {
	let cardHTML = shuffle(cardList).map((card) => {
		return generateCard(card);
	}).join('');
	deck.innerHTML = cardHTML;
}

initGame();



let activeCards = [];
let count = 0;

const toggleCard = (card) => {
	card.classList.toggle('open');
	card.classList.toggle('show');
}

const addActiveCard = (card) => {
	activeCards.push(card);
}

const checkMatch = () => {
	if (activeCards[0].firstElementChild.className === activeCards[1].firstElementChild.className) {
		activeCards[0].classList.toggle('match');
		activeCards[1].classList.toggle('match');
		activeCards = [];
	} else {
		const unFlip = setTimeout(() => {
			toggleCard(activeCards[0]);
			toggleCard(activeCards[1]);
			activeCards = [];
		}, 1000);
		
		// if (activeCards.length >= 3) {
		// 	clearTimeout(unFlip);
		// };

	}
	console.log(count);
}

const updateMoves = () => {
	count++;

	moveCount.innerHTML = count;
}

deck.addEventListener('click', (e) => {
	const card = e.target;
	
	if (activeCards.length < 2) {
		toggleCard(card);
		addActiveCard(card);
	}

	if (activeCards.length === 2) {
		checkMatch();
		updateMoves();
	}
	
})



// const restart = document.querySelectorAll('#restart');
// restart.addEventListener('click', () => {
	
// 	initGame();
// })


// const isGameWon = () => {
	// 	const win = cards.every((card) => {
	// 		card.classList.contains('match');
	// 	})
	
	// 	if (win) {
	//		alert('Your score is')
	// 	}
	
	// }
	