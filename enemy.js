class Enemy{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.radius = 30;
    this.gunAngle;
    this.bulletsShot = [];
    this.bulletDelay = 0;      
    this.hitPlayer = false;  
    this.beenHit = false;
  }

  
  drawEnemy(){   
     
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.gunAngle);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(0,0,this.radius,Math.PI*2,false);
    ctx.fill();        

    ctx.fillStyle = 'green';
    ctx.fillRect(0,-5,40,10);

    ctx.restore();

    this.enemyAim(player.x+player.width/2,player.y+player.height/2)
    this.drawBullet();
    this.detectCollision();

    this.bulletDelay === 100 ? this.bulletDelay= 0 : this.bulletDelay++;      
    
  }



  enemyAim(playerX, playerY){
    //calculates the angle were the player is located based on the mouse position
    let catetoAdyacente = playerX - this.x;
    let catetoOpuesto = playerY - this.y;    
    this.gunAngle = Math.atan2(catetoOpuesto,catetoAdyacente);    
  }

  shoot(bulletDelay){    
    if(bulletDelay === 100){
      let bulletXmove = Math.cos(this.gunAngle);
      let bulletYmove = Math.sin(this.gunAngle);    
      let bullet = new Bullet(this.x,this.y,bulletXmove,bulletYmove);
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
      let distanceBetween = getDistance(player.x+player.width/2,player.y+player.height/2,bullet.x,bullet.y);
      if(distanceBetween < player.radius + bullet.width){
        this.bulletsShot.splice(index,1);
        player.livesLeft--;
      }
    });

    player.bulletsShot.forEach((bullet,index)=>{
      let distanceBetween = getDistance(this.x,this.y,bullet.x,bullet.y);
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
}