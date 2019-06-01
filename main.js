let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let aimX;
let aimY;
let player = new Player(50, 50);
let keypressed = new Keys();
let bulletsShot = [];
let enemy = new Enemy(100,150);
let bulletDelay = 0;
let enemyDelay = 0;
let enemysArray = [];



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
  let bulletXmove = Math.cos(player.gunAngle);
  let bulletYmove = Math.sin(player.gunAngle);
  let bullet = new Bullet(player.playerXPosition,player.playerYPosition, bulletXmove,bulletYmove);
  bulletsShot.push(bullet);
});

function generateRandomCoordinates(){
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  return {
    xCoordinate: x,
    yCoordinate: y 
  }
}

function generateEnemy(){
  if(enemyDelay === 100){
    
    let enemy = new Enemy(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);
    enemysArray.push(enemy);
    enemyDelay = 0;
  }
  
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawPlayer();
  player.playerAim( aimX, aimY);
  player.movePlayer(keypressed);
  enemy.drawEnemey();
  enemy.enemyAim(player.playerXPosition, player.playerYPosition);  

  generateEnemy();
  for(let i=0; i<enemysArray.length && enemysArray.length <10;i++){
    let currentEnemy = enemysArray[i];
    currentEnemy.drawEnemey();
    currentEnemy.enemyAim();
    console.log(enemysArray)
  }
  enemyDelay === 100 ? enemyDelay = 0 : enemyDelay++;

  //This for draws every bullet that has been shot by the player
  for(let i = 0; i < bulletsShot.length; i++){
   let currentBullet = bulletsShot[i];
   currentBullet.drawBullet();
   currentBullet.updateBulletPosition(); 
  } 
  enemy.shoot(bulletDelay);    
  //Counter is used to shoot every 30 frames, itś reset when it getś to 30
  bulletDelay === 50 ? bulletDelay=0 : bulletDelay++;  
  //This for draws every bullet that has been shot by the enemy
  for(let i = 0; i < enemy.bulletsShot.length; i++){
    enemy.bulletsShot[i].drawBullet();
    enemy.bulletsShot[i].updateBulletPosition();
  }   
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);