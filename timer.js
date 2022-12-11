class Timer {
    constructor() {
      this.counting = false;
      this.timerInterval = null;
      this.elapsedTime = 0;
    }
  
    start() {
      this.counting = true;
      this.timerInterval = setInterval(() => {
        this.elapsedTime++;
      }, 1000);
    }
  
    pause() {
      clearInterval(this.timerInterval);
      this.counting = false;
    }
  
    toggle() {
      this.counting ? this.pause() : this.start();
      return this.elapsedTime;
    }

    update(element) {
      element.innerHTML = this.elapsedTime;
    }

    getValue() {
      return this.elapsedTime;
    }

    getState() {
      return (this.counting);
    }
  }