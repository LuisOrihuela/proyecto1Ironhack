class Bullet{
  constructor(x,y,bulletXmove,bulletYmove){
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 3;
    this.bulletXmove = bulletXmove;
    this.bulletYmove = bulletYmove;
    this.bulletSpeed = 5;
    this.playerBullets = [];
    this.enemyBullets = [];
  }

  drawBullet(){
    ctx.fillStyle = "red"
    ctx.fillRect(this.x,this.y, this.width,this.height);    
  }

  updateBulletPosition(){
    this.x += this.bulletXmove * this.bulletSpeed;
    this.y += this.bulletYmove * this.bulletSpeed;
  }
  
}