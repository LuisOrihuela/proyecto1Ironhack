class Bullet{
  constructor(x,y,bulletXmove,bulletYmove, currentDirection){
    this.x = x;
    this.y = y;
    this.width = 13;
    this.height = 10;
    this.bulletXmove = bulletXmove;
    this.bulletYmove = bulletYmove;
    this.bulletSpeed = 2;
    this.playerBullets = [];
    this.enemyBullets = [];    
    this.currentDirection = currentDirection;
  }

  drawBullet(){    
    this.playerShots();
    this.enemyShots();
  }
  
  playerShots(){
    ctx.drawImage(images[this.currentDirection],this.x,this.y);
  }

  enemyShots(){
    let sprtWidth = 13;
    let sprtHeight = 10;    
    let currentIndex = currentLoopIndex;
    currentIndex > 1 ? currentIndex = 0 : currentIndex;     
    ctx.drawImage(images[this.currentDirection],
      CYCLE_LOOP[currentIndex], 0, 13, sprtHeight,
      this.x, this.y, this.width, this.height);
  }

  updateBulletPosition(){
    this.x += this.bulletXmove * this.bulletSpeed;
    this.y += this.bulletYmove * this.bulletSpeed;
  }


  
}