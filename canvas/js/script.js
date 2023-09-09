const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const jogador = {

    x:50,
    y:canvas.heigth - 50,
    width: 30,
    height:30,
    velocityY:0,
    gravity:1.5,
    isJumping:false,
    jumpHeight: -20,
};

const obstaculos =[];
const obstaculosWidth = 20;
const obstaculosHeight = 20;
const obstaculosVelocityX = -5;

let pontuacao = 0;

function desenharJogador() {

    ctx.fillStyle = 'blue';
    ctx.fillRect(jogador.x, jogador.y, jogador.width, jogador.height);

}

function desenharObstaculos(){

    ctx.fillStyle = 'red';
    for (const obstaculo of obstaculos){
        ctx.fillRect(obstaculo.x, obstaculo.y, obstaculoWidth, obstaculoHeight);
    }
}

function atualizarJogo(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    if(jogador.isJumping){
        jogador.velocityY += jogador.gravity;
        jogador.y += jogador.velocityY;
        if (jogador.y > canvas.height - jogador.heigth){
            jogador.y = canvas.heigth - jogador.heigth;
            jogador.isJumping = false;
        }
    }

    if (obstaculos.length === 0 || obstaculos[0].x <= canvas.width - 200){
        criarObstaculos();
    }

    for (let i = obstaculos.length - 1; i >= 0; i--){
        obstaculos[i].x += obstaculoVelocityX;

        if(obstaculos[i].x + obstaculoWidth < 0){
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
function criarObstaculo(){
    const obstaculo = {
        x:canvas.width,
        y:canvas.heigth - obstaculoHeight,
    };
    obstaculos.push(obstaculo);
}

document.addEventListener('keydown', function(event){
    if(event.keyCode === 32 && !jogador.isJumping){
        jogador.velocityY = jogador.jumpHeight;
        jogador.isJumping = true;
    }

});

atualizarJogo();