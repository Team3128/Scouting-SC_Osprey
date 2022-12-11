class ModularButton {
    constructor(label, trigger, columnStart, columnEnd, rowStart, rowEnd, writeLoc, writeType) {
        this.label = label;
        this.hotkey = trigger;
        this.writeLoc = writeLoc;
        this.writeType = writeType;
        this.data = 0;

        //builds the HTML button element
        this.element = document.createElement("div");
        this.element.innerHTML = label;
        this.element.classList.add("mainPageBox");
        this.element.style.gridColumnStart = columnStart;
        this.element.style.gridColumnEnd = columnEnd;
        this.element.style.gridRowStart = rowStart;
        this.element.style.gridRowEnd = rowEnd;
        this.element.id = "box" + writeLoc;
        document.getElementById("mainPage").appendChild(this.element);

        //builds the label div for the button
        this.boxLabel = document.createElement("div");
        this.boxLabel.classList.add("mainPageLabel");
        this.boxLabel.style.gridColumn = (columnEnd-1) + "/" + (columnEnd-1);
        this.boxLabel.style.gridRow = (rowEnd-1) + "/" + (rowEnd-1);
        this.boxLabel.innerHTML = trigger.toUpperCase()
        document.getElementById("mainPage").appendChild(this.boxLabel);

        //builds the data output div for the button
        this.boxCount = document.createElement("div");
        this.boxCount.classList.add("mainPageCounter");
        this.boxCount.id = "label" + writeLoc;
        this.boxCount.innerHTML = this.data;
        this.boxCount.style.gridColumn = columnStart + "/" + columnStart;
        this.boxCount.style.gridRow = (rowEnd-1) + "/" + (rowEnd-1);
        document.getElementById("mainPage").appendChild(this.boxCount);
  
        // Bind the event handlers to the current instance
        this.onTrigger = this.onTrigger.bind(this);
        //this.onInput = this.onInput.bind(this);
    
        // Add event listeners to the element
        window.addEventListener('keydown', this.onTrigger);
        this.element.addEventListener('click', this.onTrigger);
        this.boxLabel.addEventListener('click', this.onTrigger);
        this.boxCount.addEventListener('click', this.onTrigger);

        if (writeType == "inc") {
            this.timer = new Timer();
            setInterval(() => {
                this.data = this.timer.getValue();
                this.timer.update(this.boxCount);
            }, 10);
        }
    }
  
    onTrigger(event) {
        // Check if the pressed key is the hotkey, or if the event is a click
        if ((event.type === "keydown" && event.key.toLowerCase() == this.hotkey) || event.type === 'click') {
            console.log(this.writeType + " " + this.writeLoc +": " + this.data);
            let clickAudio = new Audio("sfx/click.wav")
            clickAudio.play();
            // Handle the action based on the data type
            switch (this.writeType) {
                case 'int':
                    // Increment or decrement the integer value
                this.element.classList.remove("clickAnim");
                void this.element.offsetWidth;
                this.element.classList.add("clickAnim");
                    this.data += event.type === "keydown" ? (event.shiftKey ? -1 : 1) : 1;
                    break;
                case 'inc':
                    // Start or pause the timer
                    this.timer.toggle();
                    this.timer.getState() ? this.element.style.backgroundColor = "var(--accentColor)" : this.element.style.backgroundColor = "var(--altBgColor)"
                    break;
                case 'bool':
                    // Toggle the boolean value
                    this.data = !this.data;
                    this.data ? this.element.style.backgroundColor = "var(--accentColor)" : this.element.style.backgroundColor = "var(--altBgColor)"
                    break;
                case 'str':
                    // Get user input in a textbox
                    // TODO: add code for textbox input
                    break;
            }
          // Update the value output in the button
          this.boxCount.innerHTML = this.data;
        }
    }

    

}