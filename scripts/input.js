class Keys{
  constructor(){
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    this.keyPressed = true;
  }

  keyDown(event){
    switch(event.key){
      case 'a': this.moveLeft = this.keyPressed; break;
      case 'w': this.moveUp = this.keyPressed; break;
      case 'd': this.moveRight = this.keyPressed; break;
      case 's': this.moveDown = this.keyPressed; break;
    }
  }

  keyUp(event){
    switch(event.key){
      case 'a': this.moveLeft = !this.keyPressed; break;
      case 'w': this.moveUp = !this.keyPressed; break;
      case 'd': this.moveRight = !this.keyPressed; break;
      case 's': this.moveDown = !this.keyPressed; break;
    }
  }

  
  }