let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let aimX;
let aimY;
let player = new Player(50, 50);
let keypressed = new Keys();
let getNewEnemy = true;
let enemyDelay = 0;
let enemysArray = [];
let animate;
let frameCount = 0;   
let FRAME_LIMIT = 10;
let CYCLE_LOOP = [0, 1, 2, 3];
let currentLoopIndex = 0;
let timer = 0;
let minutes = 0;
let firstAid;

var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
			preload(
        "/assets/3_south.png",
        "/assets/3_north.png",
        "/assets/3_left.png",
        "/assets/3_right.png",   
        '/assets/slime1_front.png',
        '/assets/slime1_back.png',     
        '/assets/slime1_sideLeft.png',
        '/assets/slime1_sideRight.png',
        '/assets/bulletDown.png',
        '/assets/bulletUp.png', 
        '/assets/bulletLeft.png',
        '/assets/bulletRight.png',     
        '/assets/flamethrower_bulletDown.png',
        '/assets/flamethrower_bulletUp.png',
        '/assets/flamethrower_bulletLeft.png',
        '/assets/flamethrower_bulletRight.png',
        '/assets/shot_side.png',
        '/assets/powerup.png'   
      )      


document.addEventListener("keydown", event => {
  keypressed.keyDown(event);
});

document.addEventListener("keyup", event => {
  keypressed.keyUp(event);
});

document.addEventListener("mousemove", event =>{
  aimX = event.clientX;
  aimY = event.clientY;
});

document.addEventListener("mousedown", () =>{  
  player.shoot();
});

function getPowerUp(){  
    let spriteWidth = 16;
    let spriteHeight = 16;
    ctx.drawImage(images[17], CYCLE_LOOP[currentLoopIndex],0,spriteWidth,spriteHeight,
    50,50,spriteWidth,spriteHeight);
  
}
  
 

function detectCollision(){
  enemysArray.forEach((enemy,index)=>{
    player.detectCollision(enemy,index);
  }) 
}

function generateRandomCoordinates(){
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  return {
    xCoordinate: x,
    yCoordinate: y 
  }
}

let sizeIncrement = 0;
let enemyLives = 5;
function generateEnemy(){  
  enemyDelay++;  
  if(enemyDelay%250 === 0){
    if(timer % 20 === 0 /*|| timer === 59*/) {enemyLives++; sizeIncrement+=2}     
    let enemy = new Enemy(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate,sizeIncrement,enemyLives);
    enemysArray.push(enemy);                
  }
}

function drawEnemies(){   
  generateEnemy();   
  enemysArray.forEach((enemy) => {
    enemy.drawEnemy();    
  });
}

function frameIteration(hasMoved){
  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
}
}

function drawTime(){  
  timer++;  
  let seconds = Math.floor(timer/60);
  if(seconds<10) seconds = '0'+seconds;
  
  if(seconds === 59){minutes++; timer = 0} 
  ctx.font = '40px Verdana';
  if(minutes === 0){
    ctx.fillText(seconds,canvas.width/2, 50);
  }else if(minutes > 0){
    ctx.fillText(minutes+':'+seconds,canvas.width/2, 50);
  }
 
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.fillStyle = 'green';
  ctx.fillRect(0,0,canvas.width,canvas.height); 
  player.drawPlayer(aimX,aimY,keypressed); 
  drawTime();
  detectCollision();  
  drawEnemies();     
  getPowerUp();
  animate = requestAnimationFrame(draw);
  //Stops animation when the player is out of livess
  if(player.livesLeft <= 0){
    cancelAnimationFrame(animate);
  }
  
}

draw();

