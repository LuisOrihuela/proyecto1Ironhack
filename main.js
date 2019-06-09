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
        'assets/slime1_front.png',
        'assets/slime1_back.png',     
        'assets/slime1_sideLeft.png',
        'assets/slime1_sideRight.png', 
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
  if(enemyDelay === 0){        
      let enemy = new Enemy(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate);
      enemysArray.push(enemy);      
      //if number of enemies = 5 stop generating more
      if(enemysArray.length === 1) getNewEnemy = false;             
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

