const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');
const puntos = document.querySelector('#puntos');
const max = document.querySelector('#max')
let posX = 2;
let posY = 1;
let direction = 1;
let counter = 0;

ctx.font = '25px serif';

//leer localstorage
if (localStorage.getItem('max')) {
    max.innerText = localStorage.getItem('max');
    max.innerText = 0;
} else {
    max.innerText = 0;
    localStorage.setItem('max', 0);
}

function init(){
    posX = 2;
    posY = 1;
    direction = 1;
    counter = 0;
    puntos.innerText = 0;
    const snake = [{
        x: 2,
        y: 1,
        show: function(){
            ctx.fillText("🌑",this.x * 20, this.y * 20);
        }
    }];
    snake.push({
        x: 1,
        y: 1,
        xNext: 2,
        yNext: 1,
        show: function(){
            ctx.fillText("🌌",this.x * 20, this.y * 20);
        }
    });
    snake.push({
        x: 0,
        y: 1,
        xNext: 2,
        yNext: 1,
        show: function(){
            ctx.fillText("🌌",this.x * 20, this.y * 20);
        }
    });

    return snake;
}

let snake = init();

function nextMove(x, y){
    snake.forEach((item, index) => {
        if (index === 0) {
            item.x = x;
            item.y = y;
        }else{
            item.x = item.xNext;
            item.y = item.yNext;
            item.xNext = snake[index - 1].x;
            item.yNext = snake[index - 1].y;
        }
    });
}

const food = {
    x: 0,
    y: 1,
    foodList: ['✨', '⭐','🌟', '💫', '🌠'],
    idx: 0,
    show: function(){
        ctx.fillText(this.foodList[this.idx], this.x *20, this.y * 20);
    },
    random: function(){
        this.idx = Math.floor(Math.random() * 5);
        this.x = Math.floor(Math.random() * 25);
        this.y = Math.ceil(Math.random() * 15);
    }
}

function checkEat(){
    if(snake[0].x === food.x && snake [0].y === food.y){
        snake.push({ ...snake[1] });
        food.random();
        counter++;
        puntos.innerText = counter;
    }
}

function death(){
    const head = snake[0];
    for(let i = 1; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            alert('Intentalo de nuevo!');
            snake = init();
            break;
        }
    }
    let maximo = Number(localStorage.getItem('max'));
    if (counter > maximo) {
        localStorage.setItem('max', String(counter));
        max.innerText = counter;
    } else {
        localStorage.setItem('max', String(maximo));
        max.innerText = maximo;
    }
}

food.random();

setInterval(() => {
    ctx.fillRect(0, 0, 500, 300);

    snake.forEach(item => item.show());
    food.show();
    checkEat();
    death();
    
    if (direction === 1) posX++;
    else if(direction === 2) posY++;
    else if(direction === 3) posX--;
    else posY--;

    if(posX < 0 ) posX = 24;
    else if (posX > 24) posX = 0;

    if(posY < 1 ) posY = 15;
    else if (posY > 15) posY = 1;

    nextMove(posX, posY);

}, 200);

document.querySelector('body')
    .addEventListener('keydown', (e) => {
    const tecla = e.key;
    
    if (tecla === 'ArrowRight') direction = 1;
    else if (tecla === 'ArrowDown') direction = 2;
    else if (tecla === 'ArrowLeft') direction = 3;
    else if (tecla === 'ArrowUp') direction = 4;
});

const up = () => direction = 4;
const down = () => direction = 2;
const right = () => direction = 1;
const left = () => direction = 3;
