let cells = document.querySelectorAll('.cell');
let score = document.querySelector('#score');
let start = document.querySelector('#start');
let end = document.querySelector('#end');
let restart = document.querySelector('.restart');
let timer = document.querySelector('#timer');
let inputs = document.querySelectorAll('input');
let apply = document.querySelector('#apply');
let choice_wrap = document.querySelector('#choice');
let lifes = document.querySelector('.lifes');
let time_icon = document.querySelector('#time_icon');

let friend = document.createElement('div');
let friend2 = document.createElement('div');


let count = 0;
let countFriend = 0;
let lastValue = 0;
let num = 0;
let time;
let timeId;
let enemyRandomNum = Math.floor(Math.random() * (5 - 1) + 1);

friend.classList.add('friend');
friend2.classList.add('friend2');


function getTime() {
    inputs.forEach((input) => {
        if (input.checked) {
            time = input.value;
            timer.textContent = time;
        }
    })
}

getTime();

start.addEventListener('click', () => {
    startGame();
});

restart.addEventListener('click', ()=> {
    restartRun();
    lifes.innerHTML = '<img src="images/heart.png" alt=""><img src="images/heart.png" alt=""><img src="images/heart.png" alt="">';
})

function startGame() {
    setTimeout(() => {
        start.remove();
        getTime();
        choice_wrap.style.display = 'none';
        timeId = setInterval(countdown, 1000);
    }, 200);
}

function countdown() {
    time--;
    timer.textContent = time;
    if (time <= 0) {
        clearInterval(timeId);
        end.style.display = 'block';
        choice_wrap.style.display = 'block';
    }
}

function restartRun() {
    end.style.display = 'none';
    count = 0;
    score.textContent = count;
    num = 0;
    removeEnemy();
    startGame();
}

function removeEnemy() {
    document.querySelectorAll(".enemy").forEach((element) => element.remove());
}

function friendPosition() {
    let randomNum = Math.floor(Math.random() * (9 - 0) + 0);
    if (randomNum === lastValue || cells[randomNum].children.length != '') {
        friendPosition();
    } else {
        lastValue = randomNum;
        cells[randomNum].prepend(friend);
    }
}

function enemyPosition() {
    let randomNum = Math.floor(Math.random() * (9 - 0) + 0);
    if (cells[randomNum].children.length == '') {
        removeEnemy();
        let enemy = document.createElement('div');
        enemy.classList.add('enemy');
        cells[randomNum].prepend(enemy);
    } else {
        enemyPosition();
    }
}

friendPosition();

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        let last = lifes.lastElementChild;

        if (cell.childNodes[0].className == 'friend') {
            count += 3;
            num++;
            score.textContent = count;
            friendPosition();
        } else if (cell.childNodes[0].className == 'enemy') {
            count = count - 10;
            score.textContent = count;
            if (count <= 0) {
                count = 0;
                score.textContent = count;
            }
            enemyPosition();
            lifes.removeChild(last);
            if (lifes.children.length === 0) {
                clearInterval(timeId);
                end.style.display = 'block';
                choice_wrap.style.display = 'block';
                lifes.innerHTML = '<img src="images/heart.png" alt=""><img src="images/heart.png" alt=""><img src="images/heart.png" alt="">';
                time = 1;
                timer.textContent = time;
                countdown();
            }
        }
        if (num == enemyRandomNum) {
            enemyPosition();
            enemyRandomNum = Math.floor(Math.random() * (5 - 1) + 1);
            num = 0;
        }
    })
});