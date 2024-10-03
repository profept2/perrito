const dog = document.getElementById('dog');
const obstacle = document.getElementById('obstacle');
const gameOverMessage = document.getElementById('gameOverMessage');
const restartButton = document.getElementById('restartButton');
const scoreElement = document.getElementById('score');
let isJumping = false;
let gameRunning = true;
let score = 0;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (!isJumping && gameRunning) {
            jump();
        } else if (!gameRunning) {
            restartGame();
        }
    }
});

restartButton.addEventListener('click', restartGame);

function jump() {
    isJumping = true;
    dog.classList.add('jump');
    setTimeout(() => {
        dog.classList.remove('jump');
        isJumping = false;
    }, 500);
}

function checkCollision() {
    const dogRect = dog.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dogRect.right > obstacleRect.left &&
        dogRect.left < obstacleRect.right &&
        dogRect.bottom > obstacleRect.top &&
        dogRect.top < obstacleRect.bottom
    ) {
        endGame();
    }
}

function updateScore() {
    const obstaclePosition = obstacle.getBoundingClientRect().right;
    if (obstaclePosition < 0) {
        score += 10;
        scoreElement.textContent = score;
    }
}

function endGame() {
    gameRunning = false;
    gameOverMessage.classList.add('show');
    restartButton.classList.add('show');
    obstacle.style.animationPlayState = 'paused';
}

function restartGame() {
    gameRunning = true;
    gameOverMessage.classList.remove('show');
    restartButton.classList.remove('show');
    obstacle.style.animation = 'move 2s infinite linear';
    score = 0;
    scoreElement.textContent = score;
}

setInterval(() => {
    if (gameRunning) {
        checkCollision();
        updateScore();
    }
}, 10);
