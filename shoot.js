class Bullet{
  constructor(x,y,bulletXmove,bulletYmove){
    this.x = x;
    this.y = y;
    this.bulletXmove = bulletXmove;
    this.bulletYmove = bulletYmove;
    this.bulletSpeed = 5;
  }

  drawBullet(){
    ctx.fillStyle = "red"
    ctx.fillRect(this.x,this.y, 3,3);    
  }

  updateBulletPosition(){
    this.x += this.bulletXmove * this.bulletSpeed;
    this.y += this.bulletYmove * this.bulletSpeed;
  }
}