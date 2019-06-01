class Enemy{
  constructor(x,y){
    this.enemyX = x;
    this.enemyY = y;
    this.gunAngle;
    this.bulletsShot = [];
  }

  drawEnemey(){    
    ctx.save();
    ctx.translate(this.enemyX, this.enemyY);
    ctx.rotate(this.gunAngle);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(0,0,30,Math.PI*2,false);
    ctx.fill();        

    ctx.fillStyle = 'green';
    ctx.fillRect(0,-5,40,10);

    ctx.restore();
  }

  enemyAim(playerX, playerY){
    //calculates the angle that were the player is looking based on the mouse position
    let catetoAdyacente = playerX - this.enemyX;
    let catetoOpuesto = playerY - this.enemyY;
    this.gunAngle = Math.atan2(catetoOpuesto,catetoAdyacente);
  }

  shoot(bulletDelay){    
    if(bulletDelay === 30){
      let bulletXmove = Math.cos(this.gunAngle);
      let bulletYmove = Math.sin(this.gunAngle);    
      let bullet = new Bullet(this.enemyX,this.enemyY,bulletXmove,bulletYmove);
      this.bulletsShot.push(bullet);         
    }
  }
}