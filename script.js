let body = document.querySelector('body');
let elem = document.querySelector('section');
let score = document.querySelector('#score');
let finalScore = document.querySelector('#final_score');
let lifes = document.querySelector('.lifes');
let final = document.querySelector('#final');
let btnRestart = document.querySelector('#final-btn');
let gameWrap = document.querySelector('#game-wrap');
let blockGame = document.querySelector('#block-game');

let hero = document.createElement('div');
let gift = document.createElement('div');
let enemy = document.createElement('div');
let fullTime = new Date();
let time = (String(fullTime.getHours()).length < 2 ? ('0' + fullTime.getHours()) : fullTime.getHours()) + ':' + (String(fullTime.getMinutes()).length < 2 ? ('0' + fullTime.getMinutes()) : fullTime.getMinutes()) + ':' + (String(fullTime.getSeconds()).length < 2 ? ('0' + fullTime.getSeconds()) : fullTime.getSeconds());
let localStorageSize = window.localStorage.length;


let randomNumVertGift, randomNumHorisGift, randomNumVertEnemy, randomNumHorisEnemy;

hero.classList.add('hero');
gift.classList.add('gift');
enemy.classList.add('enemy');
elem.prepend(hero);
elem.prepend(gift);
elem.prepend(enemy);

let points = 0;
let step = 10;
let giftCount = 0;
let showEnemy = Math.floor(Math.random() * (3 - 1) + 1);

let widthBlock = blockGame.offsetWidth;
let heightBlock = blockGame.offsetHeight;


// -------------------------------------------------------------------


function changePositionVertGift() {
    randomNumVertGift = Math.random() * (355 - 5) + 5;
    if (randomNumVertGift > hero.offsetTop + 40 || randomNumVertGift < hero.offsetTop - 40 && (randomNumVertGift > enemy.offsetTop + 80 || randomNumVertGift < enemy.offsetTop - 80)) {
        return randomNumVertGift;
    } else {
        console.log(randomNumVertGift);
        changePositionVertGift();
    }
}

function changePositionHorisGift() {
    randomNumHorisGift = Math.random() * ((widthBlock - 50) - 3) + 3;
    if (randomNumHorisGift > hero.offsetLeft + 50 || randomNumHorisGift < hero.offsetLeft - 50) {
        return randomNumHorisGift;
    } else {
        changePositionHorisGift();
    } return randomNumHorisGift;
}

// -------------------------------------------------------------------


function changePositionVertEnemy() {
    randomNumVertEnemy = Math.random() * ((heightBlock - 90) - 20) + 20;
    if ((randomNumVertEnemy > hero.offsetTop + 50 || randomNumVertEnemy < hero.offsetTop - 50) && (randomNumVertEnemy > gift.offsetTop + 50 || randomNumVertEnemy < gift.offsetTop - 50)) {
        return randomNumVertEnemy;
    } else {
        changePositionVertEnemy();
    }
    return randomNumVertEnemy;
}

function changePositionHorisEnemy() {
    randomNumHorisEnemy = Math.random() * ((widthBlock - 110) - 10) + 10;
    if (randomNumHorisEnemy > hero.offsetLeft + 50 || randomNumHorisEnemy < hero.offsetLeft - 50) {
        return randomNumHorisEnemy;
    } else {
        changePositionHorisEnemy();
    }
    return randomNumHorisEnemy;
}

hero.style.top = step - 5 + 'px';
hero.style.left = step - 10 + 'px';

gift.style.top = changePositionVertGift() + 'px';
gift.style.left = changePositionHorisGift() + 'px';

enemy.style.top = changePositionVertEnemy() + 'px';
enemy.style.left = changePositionHorisEnemy() + 'px';


// -------------------------------------------------------------------

body.addEventListener('keypress', function (event) {
    let last = lifes.lastElementChild;

    if (hero.offsetTop > enemy.offsetTop - 60 && hero.offsetTop < enemy.offsetTop + 60 && hero.offsetLeft > enemy.offsetLeft - 50 && hero.offsetLeft < enemy.offsetLeft + 100) {

        enemy.style.top = changePositionVertEnemy() + 'px';
        enemy.style.left = changePositionHorisEnemy() + 'px';

        if (points <= 59) {
            points = 0;
        } else {
            points -= 60;
        }
        score.textContent = points;
        lifes.removeChild(last);
        if (lifes.children.length === 0) {
            setTimeout(() => gameWrap.style.display = 'none', 100);
            setTimeout(() => final.style.display = 'block', 200);
            // document.cookie += `${time}=${points}`;
            window.localStorage.setItem(time, points);
            console.log(localStorage);

            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                finalScore.textContent += `${i}. ${key} : ${localStorage.getItem(key)}points `;
            }
        }
    }


    if (hero.offsetTop > gift.offsetTop - 50 && hero.offsetTop < gift.offsetTop + 40 && hero.offsetLeft > gift.offsetLeft - 36 && hero.offsetLeft < gift.offsetLeft + 36) {
        gift.style.top = changePositionVertGift() + 'px';
        gift.style.left = changePositionHorisGift() + 'px';
        points += 20;
        score.textContent = points;
        giftCount++;
        gift.classList.add('star-appearance');
        setTimeout(() => gift.classList.remove('star-appearance'), 1000);
        if (giftCount == showEnemy) {
            enemy.style.top = changePositionVertEnemy() + 'px';
            enemy.style.left = changePositionHorisEnemy() + 'px';
            showEnemy = Math.floor(Math.random() * (3 - 1) + 1);
            giftCount = 0;
        }
    }


    switch (event.key) {
        case 'w':
        case 'ц':

            if (hero.offsetTop >= step) {
                if (hero.style.marginTop == '0') {
                    hero.style.marginTop = step + 'px';
                } else {
                    let num = parseInt(hero.style.marginTop, 10);
                    num -= step;
                    hero.style.marginTop = num + 'px';
                }
            }
            break;

        case 'd':
        case 'в':

            if (hero.offsetLeft <= (widthBlock - 56)) {
                if (hero.style.marginLeft == '') {
                    hero.style.marginLeft = step + 'px';
                } else {
                    let num = parseInt(hero.style.marginLeft, 10);
                    num += step;
                    hero.style.marginLeft = num + 'px';
                }
            }
            break;

        case 's':
        case 'ы':

            if (hero.offsetTop <= (heightBlock - 80)) {
                if (hero.style.marginTop == '') {
                    hero.style.marginTop = step + 'px';
                } else {
                    let num = parseInt(hero.style.marginTop, 10);
                    num += step;
                    hero.style.marginTop = num + 'px';
                }
            }
            break;

        case 'a':
        case 'ф':

            if (hero.offsetLeft > step) {
                if (hero.style.marginLeft == '') {
                    hero.style.marginLeft = step + 'px';
                } else {
                    let num = parseInt(hero.style.marginLeft, 10);
                    num -= step;
                    hero.style.marginLeft = num + 'px';
                }
            }
            break;

        case 'q':
        case 'й':
            lifes.removeChild(last);
            if (lifes.children.length === 0) {
                setTimeout(() => gameWrap.style.display = 'none', 100);
                setTimeout(() => final.style.display = 'block', 200);
                // document.cookie += `${time}=${points}`;
                window.localStorage.setItem(time, points);

                for (let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i);
                    finalScore.textContent += key + ' - ' + localStorage.getItem(key) + ' points' + '\r\n';
                }
                let kek = finalScore.textContent.split('\r\n');
                console.log(kek);
            }
    }
});

btnRestart.addEventListener('click', () => {
    location.reload();
})