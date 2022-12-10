class Timer {
    constructor() {
      this.startTime = null;
      this.timerInterval = null;
      this.elapsedTime = 0;
    }
  
    start() {
      this.startTime = Date.now();
      this.timerInterval = setInterval(() => {
        this.elapsedTime++;
      }, 1000);
    }
  
    pause() {
      clearInterval(this.timerInterval);
      this.startTime = null;
    }
  
    toggle() {
      if (this.startTime === null) {
        this.start();
      } else {
        this.pause();
      }
      return this.elapsedTime;
    }

    getValue() {
      return this.elapsedTime;
    }

    getState() {
      return !(this.startTime === null);
    }
  }