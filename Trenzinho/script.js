const carinha = document.querySelector('.carinha');
const alvo = document.querySelector('.alvo');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.querySelector('.game-over');

let carinhaX = 375; // posição inicial do jogador
let carinhaY = 0; // posição vertical do jogador
let alvoX = 800; // posição inicial do obstáculo
let score = 0;
let isJumping = false;
let isFalling = false;
let isGameOver = false;

document.addEventListener('keydown', movecarinha);
document.addEventListener('keydown', jump);

function movecarinha(e) {
    const speed = 10;

    if (e.key === 'ArrowLeft' && carinhaX > 0) {
        carinhaX -= speed;
    } else if (e.key === 'ArrowRight' && carinhaX < 750) {
        carinhaX += speed;
    }

    carinha.style.left = carinhaX + 'px';

    // Verificar colisão
    if (checkCollision()) {
        gameOver();
    }
}

function jump(e) {
    if (e.key === ' ' && !isJumping && !isFalling) { // Barra de espaço
        isJumping = true;
        jumpAnimation();
    }
}

function jumpAnimation() {
    carinhaY = 0;
    carinha.style.bottom = carinhaY + 'px';

    let jumpHeight = 490; // Alt. máx. do pulo
    let jumpDuration = 1000; // Duração do pulo em milissegundos

    const jumpStartTime = Date.now();

    function updateJump() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - jumpStartTime;
        const progress = Math.min(1, elapsedTime / jumpDuration);

        carinhaY = jumpHeight * (1 - progress);
        carinha.style.bottom = carinhaY + 'px';

        if (progress < 1) {
            requestAnimationFrame(updateJump);
        } else {
            isJumping = false;
            fallAnimation();
        }
    }

    requestAnimationFrame(updateJump);
}

function fallAnimation() {
    let fallHeight = 0; // Alt. máx. da queda
    let fallDuration = 500; // Duração da queda em milissegundos

    const fallStartTime = Date.now();

    function updateFall() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - fallStartTime;
        const progress = Math.min(1, elapsedTime / fallDuration);

        carinhaY = progress * fallHeight;
        carinha.style.bottom = carinhaY + 'px';

        if (progress < 1) {
            requestAnimationFrame(updateFall);
        } else {
            isFalling = false;
        }
    }

    requestAnimationFrame(updateFall);
}

function movealvo() {
    const alvoSpeed = 5;

    if (alvoX < -30) {
        alvoX = 800;
        score++;
        scoreDisplay.textContent = score;
    }

    alvoX -= alvoSpeed;
    alvo.style.left = alvoX + 'px';

    // Verificar colisão
    if (checkCollision()) {
        gameOver();
    }

    if (!isGameOver) {
        requestAnimationFrame(movealvo);
    }
}

function checkCollision() {
    const carinhaRect = carinha.getBoundingClientRect();
    const alvoRect = alvo.getBoundingClientRect();

    return (
        carinhaRect.left < alvoRect.right &&
        carinhaRect.right > alvoRect.left &&
        carinhaRect.top < alvoRect.bottom &&
        carinhaRect.bottom > alvoRect.top
    );
}

function gameOver() {
    isGameOver = true;
    gameOverDisplay.style.display = 'block';
}

function restartGame() {
    isGameOver = false;
    gameOverDisplay.style.display = 'none';
    alvoX = 800; // Reinicia a posição do obstáculo
    score = 0;
    scoreDisplay.textContent = score;
    carinhaX = 375; // Reinicia a posição do jogador
    carinha.style.left = carinhaX + 'px';
    carinhaY = 0; // Reinicia a posição vertical do jogador
    carinha.style.bottom = carinhaY + 'px';
    requestAnimationFrame(movealvo); // Reinicia o movimento do obstáculo
}

movealvo();