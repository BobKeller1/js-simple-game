var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $result = document.querySelector('#result');
var $gameTime = document.querySelector('#game-time');
var score = 0;
var isGameStarted = false;
$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick );
$time = document.querySelector('#time');
$gameTime.addEventListener('input', setGameTime);
var minColor = 0;
var maxColor = 200;



function getRandomColorForBox(min,max) {

	var colorCode = getRandom(minColor,maxColor);
	return colorCode;

};


function show($elem){

	$elem.classList.remove('hide');

};


function hide($elem){

	$elem.classList.add('hide');

};


function startGame() {

	score = 0;
	setGameTime();
	isGameStarted = true;
	hide($start);
	$game.style.backgroundColor = '#FFF';
	var interval = setInterval(function () {
	var time = parseFloat($time.textContent)

	if (time <=0){

		clearInterval(interval);
		endGame();

	} 
	else {
		$time.textContent = (time - 0.1).toFixed(1);
	}

	}, 100)

	$gameTime.setAttribute ( 'disabled', 'true');

	

	renderBox()

};


function setGameTime() {
	show($timeHeader);
	hide($resultHeader);
	var time = +$gameTime.value;
	$time.textContent = time.toFixed(1); 
	

};

function endGame() {

	isGameStarted = false;
	$gameTime.removeAttribute ('disabled');
	show($start);
	$game.innerHTML = '';
	$game.style.backgroundColor = '#ccc';
	hide($timeHeader);
	show($resultHeader);
	setGameScore();


};


function setGameScore() {
	$result.textContent = score.toString();
};


function renderBox() {

	var boxSize = getRandom(30, 100);
	$game.innerHTML = '';
	var box = document.createElement('div');
	var gameSize = $game.getBoundingClientRect();
	var maxTop = gameSize.height - boxSize;
	var maxLeft = gameSize.width - boxSize;
	box.style.height = box.style.width = boxSize + 'px'
	box.style.position = 'absolute';
	var colorCode1 = getRandomColorForBox();
	var colorCode2 = getRandomColorForBox();
	var colorCode3 = getRandomColorForBox();
	box.style.backgroundColor = 'rgb(' + colorCode1 + ',' + colorCode2 + ',' + colorCode3 +')';
	box.style.top = getRandom(0, maxTop) + 'px';
	box.style.left = getRandom(0, maxLeft) + 'px';
	box.style.cursor = 'pointer';
	box.setAttribute('data-box', 'true')
	$game.insertAdjacentElement('afterbegin', box);

};


function handleBoxClick(event) {

	if (!isGameStarted){
		return
	}

	if (event.target.dataset.box){

		renderBox();
		score ++;
	}

};


function getRandom(min, max) {
	return Math.floor((Math.random() * (max - min) + min));
};



