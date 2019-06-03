class Player{
  constructor(x, y){
    this.playerXPosition = x;
    this.playerYPosition = y;    
    this.radius =  30;
    this.gunAngle;
    this.bulletsShot = [];
    this.playerSpeed = 3;
  }

  drawPlayer(aimX, aimY, keyPressed,enemy){    
    ctx.save();
    ctx.translate(this.playerXPosition, this.playerYPosition);
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
  } 

  movePlayer(keyPressed){
    //update players coordinates
    if(keyPressed.moveLeft) this.playerXPosition -= this.playerSpeed;
    if(keyPressed.moveUp) this.playerYPosition -=  this.playerSpeed;
    if (keyPressed.moveRight) this.playerXPosition += this.playerSpeed;    
    if(keyPressed.moveDown) this.playerYPosition += this.playerSpeed;    
  }

  playerAim(mouseX, mouseY){
    let catetoAdyacente = mouseX - this.playerXPosition;
    let catetoOpuesto = mouseY - this.playerYPosition;
    this.gunAngle = Math.atan2(catetoOpuesto,catetoAdyacente);
  }

  shoot(){    
    let bulletXmove = Math.cos(this.gunAngle);
    let bulletYmove = Math.sin(this.gunAngle);    
    let bullet = new Bullet(this.playerXPosition,this.playerYPosition,bulletXmove,bulletYmove);
    this.bulletsShot.push(bullet);   
  }

  drawBullets(){
    this.bulletsShot.forEach((bullet,index)=>{
      bullet.drawBullet();
      bullet.updateBulletPosition();
      if(bullet.x > canvas.width || bullet.x < 0 || bullet.y >canvas.height || bullet.y < 0){      
        this.bulletsShot.splice(index,1);
      }
      this.checkCollision(bullet,index);
    });  
  }

  checkCollision(bullet,index){
    let xDistance = enemy.enemyX - bullet.x;
    let yDistance = enemy.enemyY - bullet.y;
    let distanceBetween = Math.hypot(xDistance,yDistance);

    if(distanceBetween < bullet.width + enemy.radius ){
      this.bulletsShot.splice(index,1);   
      
    }  
           
  } 
}