let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gameCover = document.getElementById('gamecover');
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
let crystal;
let timerPistol = new Chronometer();
let timerShotgun = new Chronometer();
let timerCyrstal = new Chronometer();
let timerFirstAid = new Chronometer();
let timerRocket = new Chronometer();
let pistolSound = document.getElementById('pistol');
let rocketSound = document.getElementById('rocket');
let shotgunSound = document.getElementById('shotgun');
let weaponSound = document.getElementById('weaponPickup');
let backmusic = document.getElementById('background');
let tomatoSound = document.getElementById('tomatoSound');
let crystalSound = document.getElementById('crystalSound');
let firstAidSound = document.getElementById('firstAidSound');

var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
			preload(
        "assets/3_south.png",
        "assets/3_north.png",
        "assets/3_left.png",
        "assets/3_right.png",   
        "assets/slime1_front.png",
        "assets/slime1_back.png",     
        "assets/slime1_sideLeft.png",
        "assets/slime1_sideRight.png",
        "assets/bulletDown.png",
        "assets/bulletUp.png", 
        "assets/bulletLeft.png",
        "assets/bulletRight.png",     
        "assets/flamethrower_bulletDown.png",
        "assets/flamethrower_bulletUp.png",
        "assets/flamethrower_bulletLeft.png",
        "assets/flamethrower_bulletRight.png",        
        "assets/powerup.png",
        "assets/bulleta.png",
        "assets/bullet_tomato.png", 
        "assets/p_down.png",
        "assets/p_diagdown.png",
        "assets/p_side.png",
        "assets/p_diagup.png",
        "assets/p_up.png",
        "assets/shot_down.png",
        "assets/shot_diagdown.png",
        "assets/shot_side.png",
        "assets/shot_diagup.png",
        "assets/shot_up.png",
        "assets/rocket_down.png",
        "assets/rocket_diagdown.png",
        "assets/rocket_side.png",
        "assets/rocket_diagup.png",
        "assets/rocket_up.png",
        "assets/rocketDown.png",
        "assets/rocketUp.png",
        "assets/rocketLeft.png",
        "assets/rocketR.png",
        "assets/crystal1.png"
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
  tomatoSound.load();
  pistolSound.load();  
  rocketSound.load();
  shotgunSound.load();
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
  let min 
  if(time === 30 && firstAid == undefined && player.livesLeft < 10){
    firstAid = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);    
  }
  if(time === 15 && pistol == undefined && player.currentWeapon != 1){
    pistol = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);    
  }
  if(time === 45 && shotgun == undefined ){
    shotgun = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);       
  }
  if(time === 55 && rocketLauncher == undefined){
    rocketLauncher = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);       
  }
  if(time === 55 && crystal == undefined){
    crystal = new Upgrade(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);
  }  
}

function eraseUpgrade(timer){ 
  timer.startTicking();    
  if(timer.getSeconds() == 10){    
    timer.timerReset();
    return true;
  }

}
function drawUpgrade(){     
  generateUpgrade();   
  if(firstAid != undefined) {
    firstAid.drawFirstAid();    
    if(eraseUpgrade(timerFirstAid)){
      firstAid = undefined;
    }
  } 
  if(pistol != undefined){
    pistol.drawPistol();    
    if(eraseUpgrade(timerPistol)) pistol = undefined;
  } 
  if(shotgun != undefined){
    shotgun.drawShotgun();    
    if(eraseUpgrade(timerShotgun)) shotgun = undefined;
  }
  if(rocketLauncher != undefined){    
    rocketLauncher.drawRocketLauncher();
    if(eraseUpgrade(timerRocket)){
      rocketLauncher = undefined;      
    } 
  }
  if(crystal != undefined){    
    crystal.drawCrystal();
    if(eraseUpgrade(timerCyrstal)){
      crystal = undefined;         
    } 
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
    ctx.fillText(seconds,canvas.width/2-50, 50);
    ctx.strokeText(seconds,canvas.width/2-50, 50);
  }else if(minutes > 0){
    ctx.fillText(minutes+':'+seconds,canvas.width/2-50, 50);    
  } 
}

function drawAmmo(){
  let width;
  let height;  
  let image;
  let multiplier;
  let weapon;
  if(player.currentWeapon === 0){
    weapon = 'tomatoe';
    image = images[18];
    width = 22;
    height = 22; 
    multiplier = 1.5;   
  } 
  if(player.currentWeapon === 1){
    weapon = 'pistol';
    image = images[21];
    width = 10;
    height = 6;
    multiplier = 1.6;
  } 
  if(player.currentWeapon === 2){
    weapon = 'shotgun';
    image = images[26];
    width = 18;
    height = 9;
    multiplier = 1.2;
  } 
  if(player.currentWeapon === 3){
    weapon = 'rocket launcher';
    image = images[31];
    width = 19;
    height = 10;
    multiplier = 1;
  } 
  ctx.fillStyle = 'white';
  ctx.font = '13px Verdana'; 
  if(weapon === 'tomatoe'){
    ctx.drawImage(image,
      0, 0, width, height,
      5, 2, width*multiplier, height*multiplier);     
  }else if(weapon === 'pistol'){
    ctx.drawImage(image,18,12, width * multiplier, height*multiplier);
  }
  else{
    ctx.drawImage(image,15,12);
  }  
  ctx.fillText(weapon +':   '+player.ammo,40,20);  
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height); 
  player.drawPlayer(aimX,aimY,keypressed); 
  backmusic.play();
  backmusic.loop;
  drawAmmo();
  drawTime();
  detectCollision();  
  drawEnemies();       
  drawUpgrade();
  animate = requestAnimationFrame(draw);
  //Stops animation when the player is out of livess
  if(player.livesLeft <= 0){
    cancelAnimationFrame(animate);
    location.reload();    
  }
  
}

function init(){
  player.livesLeft = 10;
  window.onload = draw();    
  gameCover.setAttribute('class','hide')
}



