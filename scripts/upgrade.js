class Upgrade{
  constructor(x,y){
    this.x = x;
    this.y = y;    
    this.loop = 0;
    this.currentloopIndex = 0;
    this.CYCLE_LOOP = [0,1,2,3];
    this.takeLife = false;
    this.lifeUp = 1;
    this.pistolImageIndex = 19;
    this.shotgunImageIndex = 24;   
    this.rocketImageIndex = 29;
  }

  drawFirstAid(){
    let firstAidWidth = 16;
    let firstAidHeight = 16;
    let firstAidradius = 8;
    let increaseSize = 1.5;
    let imageIndex = 16;
    this.updateFrame();
    if(this.detectCollision(firstAidradius)){
      this.increasePlayerLife(true);
      firstAid = undefined;
    }    
    ctx.drawImage(images[imageIndex],
      this.CYCLE_LOOP[this.currentloopIndex]*firstAidWidth, 0, firstAidWidth, firstAidHeight,
      this.x, this.y, firstAidWidth*increaseSize, firstAidHeight*increaseSize);
  }

  drawPistol(){     
    let pistolWidth = 10;
    let pistolHeight = 10;
    let increaseSize = 1.5;
    let pistolRadius = 10;           
    this.updateFrame();
    ctx.drawImage(images[this.pistolImageIndex],0,0,pistolWidth,pistolHeight,
      this.x, this.y,pistolWidth*increaseSize,pistolHeight*increaseSize);
    if(this.detectCollision(pistolRadius)){
      player.currentWeapon = 1;
      player.ammo = 100;
      pistol = undefined;   
    }
  }

  drawShotgun(){
    let shotgunWidth = 18;
    let shotgunHeight = 18;
    let increaseSize = 1.2;
    let shotgunRadius = 10;
    this.updateFrame();
    ctx.drawImage(images[this.shotgunImageIndex],0,0,shotgunWidth,shotgunHeight,
      this.x, this.y,shotgunWidth*increaseSize,shotgunHeight*increaseSize);
      if(this.detectCollision(shotgunRadius)){
        player.currentWeapon = 2;
        player.ammo = 50;
        shotgun = undefined;   
      }
  }

  drawRocketLauncher(){
    let rocketWidth = 19;
    let rocketHeight = 15;
    let increaseSize = 1.2;
    let rocketRadius = 9;
    ctx.drawImage(images[this.rocketImageIndex],0,0,rocketWidth,rocketHeight,
      this.x, this.y,rocketWidth*increaseSize,rocketHeight*increaseSize);
      if(this.detectCollision(rocketRadius)){
        player.currentWeapon = 3;
        player.ammo = 40;
        rocketLauncher = undefined;   
      }
    this.updateFrame();
  }

  drawCrystal(){
    let crystalWidth = 10;
    let crystalHeight = 24;
    let crystalRadius = 7;  
    let imageIndex = 38;  
    ctx.drawImage(images[imageIndex],
      this.CYCLE_LOOP[this.currentloopIndex]*crystalWidth, 0, crystalWidth, crystalHeight,
      this.x, this.y, crystalWidth, crystalHeight);
      if(this.detectCollision(crystalRadius)){        
        player.playerSpeed = 4;
        crystal = undefined;
      }
      this.updateFrame();
  }

  updateFrame(){
    const FRAME_LIMIT = 10;
    this.loop++;
    if(this.loop >= FRAME_LIMIT){
      this.loop = 0;
      this.currentloopIndex++;  
      this.pistolImageIndex++;    
      this.shotgunImageIndex++;
      this.rocketImageIndex++;
      if(this.currentloopIndex >= this.CYCLE_LOOP.length){
        this.currentloopIndex = 0;        
      }
      if(this.pistolImageIndex >= 23){
        this.pistolImageIndex = 20;
      }
      if(this.shotgunImageIndex >= 28){
        this.shotgunImageIndex = 24;
      }
      if(this.rocketImageIndex >= 33){
        this.rocketImageIndex = 29;
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
      return true;
    }
  }
}