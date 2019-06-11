class Enemy{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.radius = 16;
    this.gunAngle;
    this.bulletsShot = [];
    this.bulletDelay = 0;
    this.currentDirection = 0;
    this.livesLeft = 5;
  }  

  drawEnemy(){   
     
    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.rotate(this.gunAngle);

    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(0,0,this.radius,Math.PI*2,false);
    // ctx.fill();        

    // ctx.fillStyle = 'green';
    // ctx.fillRect(0,-5,40,10);

    // ctx.restore();    
    
    this.drawFrame(images[this.currentDirection], CYCLE_LOOP[currentLoopIndex],this.x,this.y);
    this.changeDirection(player.x+player.width/2,player.y+player.height/2)
    this.drawBullet();
    this.detectCollision();
    this.move();
    this.drawHealthBar();

    this.bulletDelay === 100 ? this.bulletDelay= 0 : this.bulletDelay++;          
  }   

  drawFrame(img,frameX,canvasX,canvasY){
    let spriteWidth = 16;
    let spriteHeight = 16;
     
    ctx.drawImage(img,
      frameX * spriteWidth, 0, spriteWidth, spriteHeight,
      canvasX, canvasY, this.width, this.height);
  }

  changeDirection(playerX, playerY){
    //calculates the angle were the player is located based on the mouse position
    let catetoAdyacente = playerX - this.x;
    let catetoOpuesto = playerY - this.y;    
    this.gunAngle = Math.atan2(catetoOpuesto,catetoAdyacente); 
    let angleDeg = this.gunAngle *180/Math.PI;  
    const FACING_DOWN = 4;
    const FACING_UP = 5;
    const FACING_LEFT = 6;
    const FACING_RIGHT = 7;  
    //console.log(angleDeg);
    if(angleDeg > -60 && angleDeg < 60){
      this.currentDirection = FACING_RIGHT;      
      console.log(images[this.currentDirection]);
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

  move(){
    let moveX = Math.cos(this.gunAngle) * 0.8;
    let moveY = Math.sin(this.gunAngle) * 0.8;    
    this.x += moveX;    
    this.y += moveY;     
  }
  

  shoot(bulletDelay){    
    if(bulletDelay === 100){
      let bulletXmove = Math.cos(this.gunAngle);
      let bulletYmove = Math.sin(this.gunAngle);    
      let bullet = new Bullet(this.x,this.y,bulletXmove,bulletYmove,this.currentDirection+8);
      this.bulletsShot.push(bullet);         
    }
  }

  getDistance(x1,y1,x2,y2){
    let xDistance = x2 -x1;
    let yDistance = y2 -y1;
    let hypot = Math.hypot(xDistance,yDistance);  
    return hypot;
  }

  detectCollision(){
    this.bulletsShot.forEach((bullet,index)=>{
      let distanceBetween = this.getDistance(player.x+player.width/2,player.y+player.height/2,bullet.x,bullet.y);
      if(distanceBetween < player.radius + bullet.width){
        this.bulletsShot.splice(index,1);
        player.livesLeft--;
      }
    });

    player.bulletsShot.forEach((bullet,index)=>{
      let distanceBetween = this.getDistance(this.x+this.width/2,this.y+this.height/2,bullet.x,bullet.y);
      if(distanceBetween < this.radius + bullet.width){
        player.bulletsShot.splice(index,1);
      }
    })
    
  }

  drawBullet(){
    this.shoot(this.bulletDelay);
    this.bulletsShot.forEach((bullet,index)=>{
      bullet.drawBullet();
      bullet.updateBulletPosition();
      if(bullet.x > canvas.width || bullet.x < 0 || bullet.y >canvas.height || bullet.y < 0){      
        this.bulletsShot.splice(index,1);
      } 
      
    })
  }
  
  drawHealthBar(){ 
    let x = this.x +1;
    let y = this.y -10;   
    ctx.strokeRect(x, y,30,5);
    ctx.fillStyle = 'red';
    ctx.fillRect(x,y,this.livesLeft * 6,5);
  }
}