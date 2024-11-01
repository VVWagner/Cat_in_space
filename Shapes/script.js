let start = document.querySelector('#start');
let game = document.querySelector('#game');
let score = 0;
let time = document.querySelector('#time');
let isGameStarted = false;
let timeHeader = document.querySelector('#time-header');
let resultHeader = document.querySelector('#result-header');
let result = document.querySelector('#result');
let gameTime = document.querySelector('#game-time');
gameTime.addEventListener('input', setGameTime);

start.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);

function startGame() {
    score = 0;
    setGameTime();
    gameTime.setAttribute('disabled', 'true');
    timeHeader.classList.remove('hide');
    resultHeader.classList.add('hide');

    isGameStarted = true;
    start.classList.add('hide');
    game.style.background = '#FFF';

    let interval = setInterval(function(){
        let t = time.textContent;

        if(t <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            time.textContent = (t - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function setGameTime(){
    let tm = +gameTime.value;
    time.textContent = tm.toFixed(1);
    time.style.fontSize = 38 + 'px';
    timeHeader.classList.remove('hide');
    resultHeader.classList.add('hide');
}

function endGame() {
    isGameStarted = false;
    result.textContent = score + ' очков!';
    gameTime.removeAttribute('disabled');
    setTimeout(() => start.classList.remove("hide"), 600);
    game.innerHTML = '';
    timeHeader.classList.add('hide');
    resultHeader.classList.remove('hide');

}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function renderBox(){
    game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandom(30, 140);
    let gameSize = game.getBoundingClientRect();
    let maxTop = gameSize.height - (boxSize+8);
    let maxLeft = gameSize.width - (boxSize+8);

    box.style.borderRadius = getRandom(0, 50) + 'px';
    box.style.width = box.style.height = boxSize + 'px';
    box.style.background = '#000';
    box.style.position = 'absolute';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.style.boxShadow = '0px 0px 2px 4px rgba(0, 0, 0, 1), 4px 4px 8px 0px rgba(255, 255, 255, 0.95) inset';
    box.setAttribute('data-box', 'true');

    game.insertAdjacentElement('afterbegin', box);
    changeColor(box);
}

function handleBoxClick(event){
    if(!isGameStarted){
        return;
    }
    if(event.target.dataset.box){
        score += 10;
        renderBox();
    }
}

function changeColor(a){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    color = `rgb(${r},${g},${b})`;
    a.style.background = color;
};