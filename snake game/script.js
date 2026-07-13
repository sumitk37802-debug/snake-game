const board = document.getElementById("board");
const ctx = board.getContext("2d");

const box = 20;

let snake = [
    {x:200,y:200}
];

let food = randomFood();

let score = 0;

let dx = box;
let dy = 0;

let game;

document.addEventListener("keydown",changeDirection);

function randomFood(){

    return{
        x:Math.floor(Math.random()*20)*box,
        y:Math.floor(Math.random()*20)*box
    }

}

function changeDirection(e){

    if(e.key=="ArrowUp" && dy==0){
        dx=0;
        dy=-box;
    }

    if(e.key=="ArrowDown" && dy==0){
        dx=0;
        dy=box;
    }

    if(e.key=="ArrowLeft" && dx==0){
        dx=-box;
        dy=0;
    }

    if(e.key=="ArrowRight" && dx==0){
        dx=box;
        dy=0;
    }

}

function draw(){

    ctx.fillStyle="#222";
    ctx.fillRect(0,0,400,400);

    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,box,box);

    for(let i=0;i<snake.length;i++){

        ctx.fillStyle=i==0?"lime":"green";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

    }

    let headX=snake[0].x+dx;
    let headY=snake[0].y+dy;

    if(
        headX<0||
        headY<0||
        headX>=400||
        headY>=400||
        collision(headX,headY)
    ){

        clearInterval(game);
        alert("Game Over!\nScore : "+score);
        return;

    }

    let newHead={
        x:headX,
        y:headY
    };

    if(headX==food.x && headY==food.y){

        score++;
        document.getElementById("score").innerText=score;
        food=randomFood();

    }else{

        snake.pop();

    }

    snake.unshift(newHead);

}

function collision(x,y){

    for(let i=0;i<snake.length;i++){

        if(snake[i].x==x && snake[i].y==y){

            return true;

        }

    }

    return false;

}

function restartGame(){

    snake=[{x:200,y:200}];
    dx=box;
    dy=0;
    score=0;
    document.getElementById("score").innerText=0;
    food=randomFood();

    clearInterval(game);
    game=setInterval(draw,120);

}

restartGame();