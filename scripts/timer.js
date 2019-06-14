class Chronometer{
  constructor(){
    this.time = 0;
    this.seconds = 0;
  }

  startTicking(){
    this.time++;    
    this.seconds = Math.floor(this.time/60);
  }

  getSeconds(){
    return this.seconds;
  }
  timerReset(){
    this.time = 0;
    this.seconds = 0;
  }
}