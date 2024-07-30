const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");
const backgroundMusic = document.getElementById("backgroundMusic");

let snake = [{x: 150, y: 150}];
let direction = {x: 10, y: 0};
let food = {x: 200, y: 200};
let score = 0;
let gameInterval;
let gameSpeed = 150;  // Уменьшено до 150 для уменьшения скорости

canvas.width = 400;
canvas.height = 400;

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        placeFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

    if (keyPressed === LEFT && direction.x === 0) {
        direction = {x: -10, y: 0};
    } else if (keyPressed === UP && direction.y === 0) {
        direction = {x: 0, y: -10};
    } else if (keyPressed === RIGHT && direction.x === 0) {
        direction = {x: 10, y: 0};
    } else if (keyPressed === DOWN && direction.y === 0) {
        direction = {x: 0, y: 10};
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * 40) * 10;
    food.y = Math.floor(Math.random() * 40) * 10;
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

function gameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function main() {
    if (gameOver()) {
        alert("Game Over! Click Restart to play again.");
        clearInterval(gameInterval);
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        return;
    }
    setTimeout(function onTick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, gameSpeed);
}

function startGame() {
    snake = [{x: 150, y: 150}];
    direction = {x: 10, y: 0};
    food = {x: 200, y: 200};
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    clearInterval(gameInterval);
    gameInterval = setInterval(main, gameSpeed);
    backgroundMusic.play();
}

document.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", startGame);

startGame();
