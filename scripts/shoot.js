class Bullet{
  constructor(x,y,bulletXmove,bulletYmove, currentDirection){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.bulletXmove = bulletXmove;
    this.bulletYmove = bulletYmove;
    this.bulletSpeed = 2;
    this.playerBullets = [];
    this.enemyBullets = [];    
    this.currentDirection = currentDirection;
    this.currentLoopIndex = 0;
    this.loop = 0;
    this.CYCLE_LOOP = [0,1];
  }

  drawBullet(){    
    this.playerShots();
    this.enemyShots();
    this.updateFrame();
  }

  updateFrame(){
    this.loop++;
    if(this.loop >= 10){
      this.loop = 0;
      this.currentloopIndex++;
      if(this.currentloopIndex >= this.CYCLE_LOOP.length){
        this.currentloopIndex = 0;
      }
    }    
  }
  
  playerShots(){
    ctx.drawImage(images[this.currentDirection],this.x,this.y);
  }

  enemyShots(){
    this.updateFrame();
    
    let sprtWidth = 13;
    let sprtHeight = 13;           
    ctx.drawImage(images[this.currentDirection],
      this.CYCLE_LOOP[this.currentLoopIndex], 0, sprtWidth, sprtHeight,
      this.x, this.y, sprtWidth, sprtHeight);
  }

  updateBulletPosition(){
    this.x += this.bulletXmove * this.bulletSpeed;
    this.y += this.bulletYmove * this.bulletSpeed;
  }


  
}