class Bullet{
  constructor(x,y,bulletXmove,bulletYmove, currentDirection, currentWeapon){
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
    this.weapon = currentWeapon;    
  }
  
  draw(){
    if(this.weapon === 0){
      this.tomatoeShot();
    }
    else if(this.weapon === 1){
      this.pistolShot();
    }
    else if(this.weapon === 2){
      this.shutgunShot();
    }
    else if(this.weapon === 3){
      this.rocketShot();
    }

  }

  tomatoeShot(){
    player.damage = 0.5;
    let imageIndex = 18;
    let sprtWidth = 22;
    let sprtHeight = 22;
    ctx.drawImage(images[imageIndex],
      0, 0, sprtWidth, sprtHeight,
      this.x, this.y, sprtWidth, sprtHeight);
  }

  shutgunShot(){    
    player.damage = 2;
    let imageIndex = this.currentDirection + 8;    
    ctx.drawImage(images[imageIndex],this.x,this.y);    
  }
  
  pistolShot(){
    player.damage = 1;
    let imageIndex = 17;
    ctx.drawImage(images[imageIndex],this.x,this.y);
  }

  rocketShot(){
    player.damage = 3;    
    let imageIndex = this.currentDirection + 34;    
    ctx.drawImage(images[imageIndex],this.x,this.y);
  }

  enemyShots(){     
    let sprtWidth = 13;
    let sprtHeight = 13;           
    ctx.drawImage(images[this.currentDirection],
      0, 0, sprtWidth, sprtHeight,
      this.x, this.y, sprtWidth, sprtHeight);
  }

  updateBulletPosition(){
    this.x += this.bulletXmove * this.bulletSpeed;
    this.y += this.bulletYmove * this.bulletSpeed;
  }


  
}