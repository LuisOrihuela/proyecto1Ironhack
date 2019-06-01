class Player{
  constructor(x, y){
    this.playerXPosition = x;
    this.playerYPosition = y;    
    this.gunAngle;
    this.bulletsShot = [];
    this.playerSpeed = 3;
  }

  drawPlayer(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(this.playerXPosition, this.playerYPosition);
    ctx.rotate(this.gunAngle);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0,0,30,Math.PI*2,false);
    ctx.fill();        

    ctx.fillStyle = 'red';
    ctx.fillRect(0,-5,40,10);

    ctx.restore();   
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
  

 
}