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
let timer = 0;
let minutes = 0;
let Upgrades = [];
let firstAid;
let pistol;
let shotgun;
let rocketLauncher;
let enemySizeIncrement = 0;
let enemyLives = 5;
let damageToPlayer = 1;

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
        '/assets/powerup.png',
        '/assets/bulleta.png',
        '/assets/bullet_tomato.png',
        '/assets/p_down.png',
        '/assets/p_diagdown.png',
        '/assets/p_side.png',
        '/assets/p_diagup.png',
        '/assets/p_up.png',
        '/assets/shot_down.png',
        '/assets/shot_diagdown.png',
        '/assets/shot_side.png',
        '/assets/shot_diagup.png',
        '/assets/shot_up.png',
        '/assets/rocket_down.png',
        '/assets/rocket_diagdown.png',
        '/assets/rocket_side.png',
        '/assets/rocket_diagup.png',
        '/assets/rocket_up.png',
        '/assets/rocketDown.png',
        '/assets/rocketUp.png',
        '/assets/rocketLeft.png',
        '/assets/rocketR.png'
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


function generateEnemy(){  
  enemyDelay++;  
  if(enemyDelay%250 === 0){
    if(timer % 20 === 0 /*|| timer === 59*/) {enemyLives++; enemySizeIncrement+=2; damageToPlayer++}     
    let enemy = new Enemy(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate,enemySizeIncrement,enemyLives,damageToPlayer);
    enemysArray.push(enemy);                
  }
}

function generateUpgrade(){
  let time = Math.floor(timer/60); 
  if(time === 20 && firstAid == undefined && player.livesLeft < 10){
    firstAid = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);    
  }
  if(time === 10 && pistol == undefined && player.currentWeapon != 1){
    pistol = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);    
  }
  if(time === 30 && shotgun == undefined ){
    shotgun = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);       
  }
  if(time === 8 && rocketLauncher == undefined){
    rocketLauncher = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);       
  }
  
}

function eraseUpgrade(){    
  let time = Math.floor(timer/60);
  let timeFrame = 5;
  if((time+timeFrame) % 10 === 0) return true; 
}

function drawUpgrade(){  
  generateUpgrade();  
  if(firstAid != undefined) {
    firstAid.drawFirstAid(); 
    if(eraseUpgrade()) firstAid = undefined;
  } 
  if(pistol != undefined){
    pistol.drawPistol();
    if(eraseUpgrade()) pistol = undefined;
  } 
  if(shotgun != undefined){
    shotgun.drawShotgun();
    if(eraseUpgrade()) shotgun = undefined;
  }
  if(rocketLauncher != undefined){
    rocketLauncher.drawRocketLauncher();
    if(eraseUpgrade()) rocketLauncher = undefined;
  }
}

function drawEnemies(){   
  generateEnemy();   
  enemysArray.forEach((enemy) => {
    enemy.drawEnemy();    
  });
}


function drawTime(){   
  ctx.fillStyle = 'yellow';
  ctx.strokeStyle = 'red'; 
  ctx.font = '40px Verdana';
  timer++;  
  let seconds = Math.floor(timer/60);
  if(seconds<10) seconds = '0'+seconds;  
  if(seconds === 59){minutes++; timer = 0}   
  if(minutes === 0){
    ctx.fillText(seconds,canvas.width/2, 50);
    ctx.strokeText(seconds,canvas.width/2, 50);
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
  drawUpgrade();
  animate = requestAnimationFrame(draw);
  //Stops animation when the player is out of livess
  if(player.livesLeft <= 0){
    cancelAnimationFrame(animate);
  }
  
}

draw();

