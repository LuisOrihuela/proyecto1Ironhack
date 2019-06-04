class Player{
  constructor(x, y){
    this.x = x;
    this.y = y;    
    this.radius =  30;
    this.gunAngle;
    this.bulletsShot = [];
    this.playerSpeed = 3;    
    this.livesLeft = 10;
  }

  drawPlayer(aimX, aimY, keyPressed){      
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.gunAngle);

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0,0,this.radius,Math.PI*2,false);
    ctx.fill();        

    ctx.fillStyle = 'red';
    ctx.fillRect(0,-5,40,10);

    ctx.restore();   

    this.drawBullets();
    this.movePlayer(keyPressed);
    this.playerAim(aimX,aimY);
    console.log(this.livesLeft);
  } 

  movePlayer(keyPressed){
    //update players coordinates
    if(keyPressed.moveLeft) this.x -= this.playerSpeed;
    if(keyPressed.moveUp) this.y -=  this.playerSpeed;
    if (keyPressed.moveRight) this.x += this.playerSpeed;    
    if(keyPressed.moveDown) this.y += this.playerSpeed;    
  }

  playerAim(mouseX, mouseY){
    let catetoAdyacente = mouseX - this.x;
    let catetoOpuesto = mouseY - this.y;
    this.gunAngle = Math.atan2(catetoOpuesto,catetoAdyacente);
  }

  shoot(){    
    let bulletXmove = Math.cos(this.gunAngle);
    let bulletYmove = Math.sin(this.gunAngle);    
    let bullet = new Bullet(this.x,this.y,bulletXmove,bulletYmove);
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
      let distanceBetween = getDistance(enemy.x,enemy.y,bullet.x,bullet.y);
      if(distanceBetween < enemy.radius + bullet.width){
        enemysArray.splice(index,1);
        this.bulletsShot.splice(bulletIndex,1);
      }
    })
  }
  
}