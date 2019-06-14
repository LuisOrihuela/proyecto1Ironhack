class Upgrade{
  constructor(x,y){
    this.x = x;
    this.y = y;    
    // this.width = 16;
    // this.height = 16;
    // this.radius = 8;
    this.loop = 0;
    this.currentloopIndex = 0;
    this.CYCLE_LOOP = [0,1,2,3];
    this.takeLife = false;
    this.lifeUp = 1;
    this.pistolImageIndex = 20;
  }

  drawFirstAid(){
    let firstAidWidth = 16;
    let firstAidHeight = 16;
    let firstAidradius = 8;
    this.updateFrame();
    if(this.detectCollision(firstAidradius)){
      this.increasePlayerLife(true);
      firstAid = undefined;
    }    
    ctx.drawImage(images[17],
      this.CYCLE_LOOP[this.currentloopIndex]*firstAidWidth, 0, firstAidWidth, firstAidHeight,
      this.x, this.y, firstAidWidth, firstAidHeight);
  }

  drawPistol(){     
    let pistolWidth = 10;
    let pistolHeight = 10;
    let pistolRadius = 5; 
    console.log(this.pistolImageIndex)   
    this.updateFrame();
    ctx.drawImage(images[this.pistolImageIndex],0,0,pistolWidth,pistolHeight,this.x, this.y,pistolWidth,pistolHeight);
    if(this.detectCollision(pistolRadius)){
      player.currentWeapon = 1;
      pistol = undefined;   
  }
  }
  updateFrame(){
    const FRAME_LIMIT = 10;
    this.loop++;
    if(this.loop >= FRAME_LIMIT){
      this.loop = 0;
      this.currentloopIndex++;  
      this.pistolImageIndex++;    
      if(this.currentloopIndex >= this.CYCLE_LOOP.length){
        this.currentloopIndex = 0;        
      }
      if(this.pistolImageIndex >= 24){
        this.pistolImageIndex = 20;
      }
    }    
  }

  getDistance(x1,y1,x2,y2){
    let xDistance = x1 -x2;
    let yDistance = y1 -y2;
    let hypot = Math.hypot(xDistance,yDistance);  
    return hypot;
  }

  increasePlayerLife(increaseLife){
    if(increaseLife){
      player.livesLeft += this.lifeUp;      
    }
  }

  detectCollision(radius){    
    let distance = this.getDistance(player.x+player.radius, player.y + player.radius, this.x + radius, this.y + radius);
    if(distance < player.radius + radius){
      console.log('colision');
      return true;
    }
  }
}