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
let playerImages = {
  left: new Image(),
  right: new Image(),
  up: new Image(),
  down: new Image()
}
playerImages.left.src = "/assets/3_left.png"
playerImages.right.src= "assets/3_right.png"
playerImages.up.src = "assets/3_north.png"
playerImages.down.src = "assets/3_south.png"



let enemyImages = {
  left: new Image(),
  right: new Image(),
  up: new Image(),
  down: new Image()
}

let img = [playerImages.down, playerImages.up, playerImages.left, playerImages.right];
let imgEnemy = [enemyImages.down, enemyImages.up, enemyImages.left, enemyImages.right];



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


  enemyImages.left.src = 'assets/slime1_sideLeft.png';
  enemyImages.left.onload = () =>{window.requestAnimationFrame(draw)}; 
  // enemyImages.right.src = 'assets/slime1_sideRight.png';
  // enemyImages.right.onload = () =>{};
  // enemyImages.up.src = 'assets/slime1_back.png';
  // enemyImages.up.onload = () =>{}; 
  // enemyImages.down.src = 'assets/slime1_front.png';
  // enemyImages.down.onload = () =>{}; 
 

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
      let enemy = new Enemy(generateRandomCoordinates().xCoordinate, generateRandomCoordinates().yCoordinate, enemyImages);
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


player.loadImage();

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

//draw();

