class Player{
  constructor(x, y){
    this.x = x;
    this.y = y;    
    this.radius = 14;    
    this.bulletsShot = [];
    this.playerSpeed = 2;    
    this.livesLeft = 10;    
    this.width = 28;
    this.height = 32;       
    this.currentDirection = 0;    
    this.damage = 1;
    this.frameCount = 0;
    this.FRAME_LIMIT = 10;
    this.currentLoopIndex = 0;
    this.CYCLE_LOOP = [0,1,2,3];
    this.currentWeapon = 0;
  }  

  drawPlayer(aimX, aimY, keyPressed){  
    
    this.drawFrame(images[this.currentDirection],this.CYCLE_LOOP[this.currentLoopIndex],this.x,this.y);
    this.drawBullets();
    this.movePlayer(keyPressed);
    this.playerAim(aimX,aimY);   
    this.drawHealthBar(); 
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
    const FACING_DOWN = 0;
    const FACING_UP = 1;
    const FACING_LEFT = 2;
    const FACING_RIGHT = 3;   
    let catetoAdyacente = mouseX - this.x;
    let catetoOpuesto = mouseY - this.y;
    this.gunAngle = Math.atan2(catetoOpuesto,catetoAdyacente);
    let angleDeg = this.gunAngle *180/Math.PI;

    if(angleDeg > -60 && angleDeg < 60){
      this.currentDirection = FACING_RIGHT;           
    }
    if(angleDeg > 120 || angleDeg < -120){      
      this.currentDirection = FACING_LEFT;    
    }  
    if(angleDeg < -60 && angleDeg > -120){      
      this.currentDirection = FACING_UP;
    }
    if(angleDeg > 60 && angleDeg <120){      
      this.currentDirection = FACING_DOWN;
    }
  }

  shoot(){    
    let bulletXmove = Math.cos(this.gunAngle);
    let bulletYmove = Math.sin(this.gunAngle);    
    let bullet = new Bullet(this.x+this.width/2,this.y+this.height/2,bulletXmove,bulletYmove, this.currentDirection, this.currentWeapon);
    this.bulletsShot.push(bullet);    
  }

  drawBullets(){
    this.bulletsShot.forEach((bullet,index)=>{      
      bullet.draw();
      bullet.updateBulletPosition();
      if(bullet.x > canvas.width || bullet.x < 0 || bullet.y >canvas.height || bullet.y < 0){      
        this.bulletsShot.splice(index,1);
      }      
    });  
  }

  getDistance(x1,y1,x2,y2){
    let xDistance = x1 -x2;
    let yDistance = y1 -y2;
    let hypot = Math.hypot(xDistance,yDistance);  
    return hypot;
  }

  causeDamage(enemy){
    enemy.livesLeft -= this.damage;
  }

  detectCollision(enemy,index){    
    this.bulletsShot.forEach((bullet,bulletIndex)=>{
      let distanceBetween = this.getDistance(enemy.x+enemy.radius,enemy.y+enemy.radius,bullet.x+bullet.width,bullet.y+bullet.height);
      if(distanceBetween < enemy.radius +bullet.width/2){
        this.causeDamage(enemy);
        if(enemy.livesLeft <= 0){
          enemysArray.splice(index,1);
        }    
        this.bulletsShot.splice(bulletIndex,1);
      }
    })
  }

  drawHealthBar(){ 
    let x = this.x -3;
    let y = this.y -10;   
    ctx.strokeStyle='black'; 
    ctx.strokeRect(x, y,30,5);
    if(this.livesLeft >=8) ctx.fillStyle = 'blue';
    else if(this.livesLeft < 8 && this.livesLeft > 3) ctx.fillStyle = 'yellow';
    else if(this.livesLeft <= 3) ctx.fillStyle = 'red';
    ctx.fillRect(x,y,this.livesLeft * 3,5);
  }

}