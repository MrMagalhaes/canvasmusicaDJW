const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const musicaFundo = new Audio('audio/trem.mp3');

// Reproduzir a música de fundo
musicaFundo.play();

const jogador = {
    x: 50,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    velocityY: 1.0,
    gravity: 1.5,
    isJumping: false,
    jumpHeight: -20,
};

const obstaculos = [];
const obstaculosWidth = 5;
const obstaculosHeight = 5;
const obstaculosVelocityX = -5;

let pontuacao = 0;

function desenharJogador() {
    // Cabeça
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(jogador.x + jogador.width / 2, jogador.y - 20, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Corpo
    ctx.fillRect(jogador.x, jogador.y, jogador.width, jogador.height);

    // Pernas
    ctx.fillRect(jogador.x, jogador.y + jogador.height, 10, 20);
    ctx.fillRect(jogador.x + jogador.width - 10, jogador.y + jogador.height, 10, 20);
}


function desenharObstaculos() {
    ctx.fillStyle ='blue';
   
}

function atualizarJogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (jogador.isJumping) {
        jogador.velocityY += jogador.gravity;
        jogador.y += jogador.velocityY;
        if (jogador.y > canvas.height - jogador.height) {
            jogador.y = canvas.height - jogador.height;
            jogador.isJumping = false;
        }
    }

    if (obstaculos.length === 0 || obstaculos[0].x <= canvas.width - 200) {
        criarObstaculo();
    }

    for (let i = obstaculos.length - 1; i >= 0; i--) {
        obstaculos[i].x += obstaculosVelocityX;

        if (obstaculos[i].x + obstaculosWidth < 0) {
            obstaculos.splice(i, 1);
            pontuacao++;
        }
    }

    desenharJogador();
    desenharObstaculos();

    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 30);

    requestAnimationFrame(atualizarJogo);
}

function criarObstaculo() {
    const obstaculo = {
        x: canvas.width,
        y: canvas.height - obstaculosHeight,
    };
    obstaculos.push(obstaculo);
}

document.addEventListener('keydown', function (event) {
    if (event.key === ' ' && !jogador.isJumping) {
        jogador.velocityY = jogador.jumpHeight;
        jogador.isJumping = true;
    }
});

atualizarJogo();
