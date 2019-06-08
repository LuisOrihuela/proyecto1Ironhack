class Player{
  constructor(x, y){
    this.x = x;
    this.y = y;    
    this.radius = 18;    
    this.bulletsShot = [];
    this.playerSpeed = 2;    
    this.livesLeft = 10;
    this.img = new Image();
    this.width = 24;
    this.height = 33;   
    this.frameCount = 0;
    this.currentLoopIndex = 0; 
    this.FRAME_LIMIT = 12;
    this.CYCLE_LOOP = [0, 1, 2, 3];
    this.currentDirection = 0;
    this.currentLoopIndex = 0;
  }  

  drawPlayer(aimX, aimY, keyPressed){       
    this.drawFrame(img[this.currentDirection],this.CYCLE_LOOP[this.currentLoopIndex],this.x,this.y);
    this.drawBullets();
    this.movePlayer(keyPressed);
    this.playerAim(aimX,aimY);    
  } 

  drawFrame(img,frameX,canvasX,canvasY){
    let spriteWidth = 16;
    let spriteHeight = 22;
    ctx.drawImage(img,
      frameX * spriteWidth, 0, spriteWidth, spriteHeight,
      canvasX, canvasY, this.width, this.height);
  }

  movePlayer(keyPressed){
    const FACING_DOWN = 0;
    const FACING_UP = 1;
    const FACING_LEFT = 2;
    const FACING_RIGHT = 3;    
    //update players coordinates
    if(keyPressed.moveLeft){
      this.x -= this.playerSpeed;
      this.currentDirection = FACING_LEFT;
      this.frameIteration(true);
    } 
    if(keyPressed.moveUp){
      this.y -=  this.playerSpeed;
      this.currentDirection = FACING_UP;
      this.frameIteration(true);
    } 
    if (keyPressed.moveRight){
      this.x += this.playerSpeed;
      this.currentDirection = FACING_RIGHT;
      this.frameIteration(true);
    }     
    if(keyPressed.moveDown){
      this.y += this.playerSpeed;
      this.currentDirection = FACING_DOWN;
      this.frameIteration(true);
    }     
  }

  frameIteration(hasMoved){
    if (hasMoved) {
      this.frameCount++;
      if (this.frameCount >= this.FRAME_LIMIT) {
        this.frameCount = 0;
        this.currentLoopIndex++;
        if (this.currentLoopIndex >= this.CYCLE_LOOP.length) {
          this.currentLoopIndex = 0;
        }
      }
  }
}

  playerAim(mouseX, mouseY){
    let catetoAdyacente = mouseX - this.x;
    let catetoOpuesto = mouseY - this.y;
    this.gunAngle = Math.atan2(catetoOpuesto,catetoAdyacente);
  }

  shoot(){    
    let bulletXmove = Math.cos(this.gunAngle);
    let bulletYmove = Math.sin(this.gunAngle);    
    let bullet = new Bullet(this.x+this.width/2,this.y+this.height/2,bulletXmove,bulletYmove);
    this.bulletsShot.push(bullet);    
  }

  drawBullets(){
    this.bulletsShot.forEach((bullet,index)=>{
      bullet.drawBullet();
      bullet.updateBulletPosition();
      if(bullet.x > canvas.width || bullet.x < 0 || bullet.y >canvas.height || bullet.y < 0){      
        this.bulletsShot.splice(index,1);
      }      
    });  
  }

  getDistance(x1,y1,x2,y2){
    let xDistance = x2 -x1;
    let yDistance = y2 -y1;
    let hypot = Math.hypot(xDistance,yDistance);  
    return hypot;
  }

  detectCollision(enemy,index){
    this.bulletsShot.forEach((bullet,bulletIndex)=>{
      let distanceBetween = this.getDistance(enemy.x,enemy.y,bullet.x,bullet.y);
      if(distanceBetween < enemy.radius + bullet.width){
        enemysArray.splice(index,1);
        this.bulletsShot.splice(bulletIndex,1);
      }
    })
  }

}