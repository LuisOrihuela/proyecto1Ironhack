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

function getDistance(x1,y1,x2,y2){
  let xDistance = x2 -x1;
  let yDistance = y2 -y1;
  let hypot = Math.hypot(xDistance,yDistance);  
  return hypot;
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

function generateEnemy(){
  if(enemyDelay === 0){        
      let enemy = new Enemy(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);
      enemysArray.push(enemy);
      //if number of enemies = 5 stop generating more
      if(enemysArray.length === 5) getNewEnemy = false;             
  }
  enemyDelay === 250 ? enemyDelay = 0 : enemyDelay++;   
}

function drawEnemies(){  
  //Stops generating more enemys if this is false(when enemies = 5)
  if(getNewEnemy) generateEnemy();  
  enemysArray.forEach((enemy) => {
    enemy.drawEnemy();    
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  player.drawPlayer(aimX,aimY,keypressed); 
  detectCollision();  
  drawEnemies(); 
  animate = requestAnimationFrame(draw);
  //Stops animation when the player is out of livess
  if(player.livesLeft <= 0){
    cancelAnimationFrame(animate);
  }
  
}

  


draw();

