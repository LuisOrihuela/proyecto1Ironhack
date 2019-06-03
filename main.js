let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let aimX;
let aimY;
let player = new Player(50, 50);
let keypressed = new Keys();
let enemy = new Enemy(100,150);

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
  player.shoot();
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
  player.drawPlayer(aimX,aimY,keypressed,enemy); 
  enemy.drawEnemey(player);
  
  
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);




// generateEnemy();
  // for(let i=0; i<enemysArray.length && enemysArray.length <10;i++){
  //   let currentEnemy = enemysArray[i];
  //   currentEnemy.drawEnemey();
  //   currentEnemy.enemyAim();
  //   console.log(enemysArray)
  // }

  // enemyDelay === 100 ? enemyDelay = 0 : enemyDelay++; 