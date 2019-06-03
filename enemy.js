class Enemy{
  constructor(x,y){
    this.enemyX = x;
    this.enemyY = y;
    this.radius = 30;
    this.gunAngle;
    this.bulletsShot = [];
    this.bulletDelay = 0;  
    this.playerX;
    this.playerY;
    this.hit = false;  
  }

  
  drawEnemey(player){   
     
    ctx.save();
    ctx.translate(this.enemyX, this.enemyY);
    ctx.rotate(this.gunAngle);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(0,0,this.radius,Math.PI*2,false);
    ctx.fill();        

    ctx.fillStyle = 'green';
    ctx.fillRect(0,-5,40,10);

    ctx.restore();

    this.enemyAim(player.playerXPosition,player.playerYPosition)
    this.drawBullet();

    this.bulletDelay === 50 ? this.bulletDelay= 0 : this.bulletDelay++;      
    
  }



  enemyAim(playerX, playerY){
    //calculates the angle that were the player is looking based on the mouse position
    let catetoAdyacente = playerX - this.enemyX;
    let catetoOpuesto = playerY - this.enemyY;    
    this.gunAngle = Math.atan2(catetoOpuesto,catetoAdyacente);
    this.playerX = playerX;
    this.playerY = playerY;
  }

  shoot(bulletDelay){    
    if(bulletDelay === 50){
      let bulletXmove = Math.cos(this.gunAngle);
      let bulletYmove = Math.sin(this.gunAngle);    
      let bullet = new Bullet(this.enemyX,this.enemyY,bulletXmove,bulletYmove);
      this.bulletsShot.push(bullet);         
    }
  }

  drawBullet(){
    this.shoot(this.bulletDelay);
    this.bulletsShot.forEach((bullet,index)=>{
      bullet.drawBullet();
      bullet.updateBulletPosition();
      if(bullet.x > canvas.width || bullet.x < 0 || bullet.y >canvas.height || bullet.y < 0){      
        this.bulletsShot.splice(index,1);
      }   
      this.checkCollision(bullet,index);  
    })
  }

  

  checkCollision(bullet,index){
    let xDistance = this.playerX - bullet.x;
    let yDistance = this.playerY - bullet.y;
    let distanceBetween = Math.hypot(xDistance,yDistance);

    if(distanceBetween < bullet.width + player.radius ){
      this.bulletsShot.splice(index,1);
    }
  }
}