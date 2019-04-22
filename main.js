let gameArea_Width = 680;
let gameArea_Height = 600;
let bar;
let barWidth = 70;
let barHeight = 10;
let barX = gameArea_Width/2 - barWidth/2;
let barY = gameArea_Height * 14/15;
let barSpeed = 10;
let barColor = "black";
let ball;
let ballRadius = 10;
let ballX = barX + barWidth/2;
let ballY = barY - 10;
let ballColor = "red";
let ballSpeedX;
let ballSpeedY;
let interval;
let timeoutOfInterval = 40;
let arrStone = [];
let score = 0;
let level = 10;

let myGameArea = {
    canvas : document.createElement("canvas"),
    create : function () {
        this.canvas.width = gameArea_Width;
        this.canvas.height = gameArea_Height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.startGame = window.addEventListener('keydown', function(event) {
            if (event.keyCode == 13) {
                if (!interval) {
                    startGame()
                } else {
                    pauseGame();
                }
            }
        })
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
function setBallSpeed() {
   let i = Math.floor(Math.random()*3);
   let arrSpeed = [-5, -4, 4, 5];
   ballSpeedX = arrSpeed[i];
   ballSpeedY = -Math.abs(arrSpeed[i]);
}

function createGame() {
    setBallSpeed();
    ball  = new Ball(ballX, ballY, ballRadius, ballColor, ballSpeedX, ballSpeedY);
    bar = new Bar(barX, barY, barWidth, barHeight, barColor );
    createMultiStones();
    myGameArea.create();
    ball.draw();
    bar.draw();
    drawMultiStones();
    displayScore();
}
function getRandomHex() {
    let randomHex = Math.floor(Math.random() * 255);
    return randomHex;
}

function getRandomColor() {
    let r = getRandomHex();
    let g = getRandomHex();
    let b = getRandomHex();
    return "rgb(" + r + "," + g + "," + b + ")";
}

function createMultiStones() {
    for (let i = 0; i <= 100; i += 18) {
        let arr = [];
        for (let j = 0; j < gameArea_Width; j += 38){
            let stone = new Stone(j, i, 34, 15, getRandomColor());
            arr.push(stone);
        }
        arrStone.push(arr);
    }
}
function drawMultiStones() {
    for (let i = 0; i < arrStone.length; i++) {
        for (let j = 0; j < arrStone[i].length; j++) {
            if (arrStone[i][j].notDestroy)
                arrStone[i][j].draw();
        }
    }
}
function checkBallCollisionBorder() {
    if (ball.top <= 0) {
        ball.speedY = -ball.speedY;
    }
    if (ball.bottom >= myGameArea.canvas.height) {
        alert("GAME OVER");
        clearInterval(interval);
        level = 0;
        document.location.reload();
    }
    if (ball.right >= myGameArea.canvas.width || ball.left <= 0) {
        ball.speedX = -ball.speedX;
    }
}
function checkBallCollisionBar() {
    if (ball.bottom === bar.y && ball.right > bar.x && ball.left < bar.x + bar.width) {
        ball.speedY = -ball.speedY;
    }
    else if ((ball.right === bar.x || ball.left === bar.x + bar.width) && ball.bottom === bar.y) {
        ball.speedX = -ball.speedX;
    }
    else if (ball.bottom > bar.y && ball.bottom <= bar.y + bar.height &&
        ball.x >= bar.x && ball.x <= bar.x + bar.width && ball.speedY > 0) {
        ball.speedY = -ball.speedY;
    }
    else if (ball.bottom > bar.y && ball.bottom <= bar.y + bar.height &&
        ((ball.x < bar.x && bar.x - ball.x <= ball.radius) ||
            (ball.x > bar.x + bar.width && ball.x - bar.x - bar.width <= ball.radius))) {
        ball.speedX = -ball.speedX;
    }
    else if (ball.bottom > bar.y + bar.height && ball.top <= bar.y + bar.height &&
        (bar.x - ball.left <= ball.radius || ball.right - bar.x - bar.width <= ball.radius)){
        ball.speedX = -ball.speedX;
    }
}
function destroyStone() {
    for (let i = arrStone.length -1; i >= 0; i--) {
        for (let j = arrStone[i].length - 1; j >= 0; j--) {
            if (arrStone[i][j].notDestroy &&
                arrStone[i][j].y + arrStone[i][j].height >= ball.top && ball.top >= arrStone[i][j].y &&
                arrStone[i][j].x < ball.right && arrStone[i][j].x + arrStone[i][j].width > ball.left) {
                if (ball.speedY < 0) {
                    arrStone[i][j].notDestroy = false;
                    ball.speedY = -ball.speedY;
                    score++;
                } else {
                    arrStone[i][j].notDestroy = false;
                    score++;
                }
            }
            else if (arrStone[i][j].notDestroy && arrStone[i][j].y + arrStone[i][j].height >= ball.top &&
                arrStone[i][j].x + arrStone[i][j].width === ball.left && ball.bottom >= arrStone[i][j].y) {
                if (ball.speedX < 0) {
                    arrStone[i][j].notDestroy = false;
                    ball.speedX = -ball.speedX;
                    score++;
                } else {
                    arrStone[i][j].notDestroy = false;
                    score++;
                }
            }
            else if (arrStone[i][j].notDestroy && arrStone[i][j].y + arrStone[i][j].height >= ball.top &&
                arrStone[i][j].x === ball.right && ball.bottom >= arrStone[i][j].y) {
                if (ball.speedX > 0) {
                    arrStone[i][j].notDestroy = false;
                    ball.speedX = -ball.speedX;
                    score++;
                } else {
                    arrStone[i][j].notDestroy = false;
                    score++;
                }
            }
            else if (arrStone[i][j].notDestroy && arrStone[i][j].y <= ball.bottom &&
                ball.bottom <= arrStone[i][j].y + arrStone[i][j].height &&
                arrStone[i][j].x < ball.right && arrStone[i][j].x + arrStone[i][j].width > ball.left) {
                if (ball.speedY > 0) {
                    arrStone[i][j].notDestroy = false;
                    ball.speedY = -ball.speedY;
                    score++;
                } else {
                    arrStone[i][j].notDestroy = false;
                    score++;
                }
            }
            if (score === level) break;
        }
        if (score === level) break;
    }
    if (score === level) gameLevel();
}
function moveBar() {
    if (bar.isBegin) {
        window.addEventListener('keydown', function(event) {
            if(event.keyCode == 37 && bar.x > 0) {
                bar.x -= barSpeed;
            }
            else if(event.keyCode == 39 && bar.x + bar.width < gameArea_Width ) {
                bar.x += barSpeed;
            }
        });
        bar.isBegin = false;
    }
}
function updateGameArea() {
    myGameArea.clear();
    ball.updatePos();
    destroyStone();
    checkBallCollisionBar();
    checkBallCollisionBorder();
    ball.draw();
    bar.draw();
    drawMultiStones();
    displayScore();
}

function startGame() {
    if (!interval) {
        moveBar();
        bar.x = barX;
        bar.y = barY;
        interval = setInterval(updateGameArea, +timeoutOfInterval);
    }
}
function pauseGame() {
    if (interval) {
        clearInterval(interval);
        barX = bar.x;
        barY = bar.y;
        interval = undefined;
    }
}
function displayScore() {
    document.getElementById("score").innerHTML = "SCORE" +
        "<br>" + "<span style='color: red; text-align: center;'>" + score + "</span>"
}


function gameLevel() {
    if (timeoutOfInterval >= 10) {
        timeoutOfInterval -= 5;
        clearInterval(interval);
        interval = setInterval( updateGameArea, +timeoutOfInterval);
    } else {
        bar.y += 10;
    }
    if (score % 20 === 0) {
        insertStones();
    }
    level += 10;
}
function insertStones() {
    for (let i = 0; i < arrStone.length; i++) {
        for (let j = 0; j < arrStone[i].length; j++) {
            arrStone[i][j].y = arrStone[i][j].y + arrStone[i][j].height + 3;
        }
    }
    let arr = [];
    for (let i = 0; i < gameArea_Width; i += 38) {
        let stone = new Stone(i, 0, 34, 15, getRandomColor());
        arr.push(stone);
    }
    arrStone.unshift(arr);
}




