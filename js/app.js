
 let cardList = ['fa-diamond', 'fa-diamond',
 								'fa-paper-plane-o', 'fa-paper-plane-o',
 								'fa-anchor', 'fa-anchor',
 								'fa-bolt', 'fa-bolt',
 								'fa-cube', 'fa-cube',
 								'fa-leaf', 'fa-leaf',
 								'fa-bicycle', 'fa-bicycle',
 								'fa-bomb', 'fa-bomb'
 							];

const scorePanel = document.querySelector(".score-panel");
const stars = document.querySelector(".stars");
const moves = document.querySelector(".moves");
const restart = document.querySelector(".restart");
const deck = document.querySelector(".deck");


const winners = document.querySelector('.winners');
// const winnerModal = document.querySelector('#winner-modal');
const winnerMessage = document.querySelector('#winner-message');
const playAgain = document.querySelector('.playAgain');

let activeCards = [];
let matchedCards = 0;
let star = 3;
let moveCounter = moves.textContent || 0;
let interval;
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let timeStart = false;

function init(){
  stopTimer();
  timeStart = false;
  timer.textContent = minute+"minutes "+second+"seconds";
	let shuffledCards = shuffle(cardList);  
	
  for (let i=0; i<cardList.length; i++){  
		
    let deckIndex = deck.getElementsByTagName("li"); 
    let listElementsClass = deckIndex[i].getAttribute("class");
    deckIndex[i].className='';
    deckIndex[i].classList.add('card');

    let deckIconElements = deck.getElementsByTagName("i"); /*shuffle the icons*/
    let iconElementsClass = deckIconElements[i].getAttribute("class");
    deckIconElements[i].className='';
    deckIconElements[i].classList.add('fa',shuffledCards[i]);
    }
  
  activeCards = [];
  matchedCards = 0;
  moves.textContent = 0;
  moveCounter = moves.textContent || 0;
  stars.innerHTML='<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
  star='3';
  };


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

// Start Game
init();

deck.addEventListener('click', (e) => {
	if (!timeStart) {
    startTimer();
    timeStart= true;
	};
	
	let card = e.target;
	
  if (activeCards.length < 2){
    if (!card.classList.contains('open')){ 
      showSymbol(card); 
      addCardOpen(card); 
		}};
		
  if (activeCards.length === 2){
    if (activeCards[0].innerHTML === activeCards[1].innerHTML){
      goodMatch();
      matchedCards++;
     }
    else {
      badMatch()
		};
	
	// Moves
	moveCounter++;
	
	// Stars
  moves.innerText = moveCounter 
  if ( moves.innerText >= 20 ) {
      stars.innerHTML='<li><i class="fa fa-star"></i></li>';
      star='1';
    }
    else if ( moves.innerText >= 10 ){
      stars.innerHTML='<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
      star='2';
    }
    else {
      stars.innerHTML='<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
      star='3';
    }
  }; 
  gameOver() 
});

// Card Logic
function addCardOpen(card){
  activeCards.push(card);
};

function showSymbol(card){
  card.classList.add('open');
  card.classList.add('show');
 };

function goodMatch(){
  activeCards[0].classList.add('match');
  activeCards[0].classList.remove('open','show');
  activeCards[1].classList.add('match');
  activeCards[1].classList.remove('open','show');
  activeCards=[];
};

function badMatch(){
  setTimeout(function(){
    activeCards[0].classList.remove("show", "open");
    activeCards[1].classList.remove("show", "open");
    activeCards = [];
  }, 1000);
};

// Restart
restart.addEventListener('click', init);

// End Game with complete matches
function gameOver(){
  if (matchedCards === 8){
		// winnerModal.style.display='block';
		winners.style.display = 'block';
    winnerMessage.textContent= `Congrats. It took ${minute} minutes and ${second} seconds, and ${moveCounter} moves. You earn ${star} stars`; 
		stopTimer();
  }
};


// Timer
function startTimer(){
   interval = setInterval(function(){
        timer.textContent = minute+"minutes "+second+"seconds";
        second++;
        if (second === 60){
          minute++;
          second=0;
        }
    }, 1000);
};


function stopTimer(){
  clearInterval(interval);
  second = 0;
  minute = 0;
}

// Restart Game
restart.addEventListener('click', init());

playAgain.addEventListener('click',function(){
  winners.style.display = "none";
  init();
});