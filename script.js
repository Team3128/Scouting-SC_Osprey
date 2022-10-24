let state = "init", matchNum, scoutNum, teamNum, teamPos, timer = 150, delay = true, rowContent = [], notesToggled = false, matchInfo = [], allianceColor = "n";

let timeInt = 1000; // Time Interval, SHOULD BE 1000!!!!!!!
let testing = false; // DISABLES INTRO PAGE CHECKS IF TRUE

let startAudio = new Audio("sfx/start.wav")
var img = new Image(); 
img.src = 'img/field.png';
var canvas = document.getElementById('fieldCanvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0);

window.onscroll = () => { window.scroll(0, 0); }; //stops scrolling, hacky bugfix

//code for search qr popup
var modal = document.getElementById("myModal");
var btn = document.getElementById("searchBtn");
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x) or clicks anywhere outside of the modal, close the modal
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById("fieldCanvas").addEventListener("click", ()=>{
    canvasClicked()
})
document.getElementById("initBtn").addEventListener("click", ()=>{
    transition(0);
})
document.getElementById("initHeader").addEventListener("click", ()=>{
    switchColor()
    console.log("color clicked")
})

function clearStorage() {
    console.log("CLEARING DATA");
    localStorage.clear()
    return;
}

function getStorage() {
    console.log("GETTING DATA")
    let allData = "";
    for(var i in localStorage) {
        if (typeof localStorage[i] == "string") {
            allData += localStorage[i] + "\n"
        }
    }
    console.log(allData)
    return;
}

function setColor(col) {
    allianceColor = col;
    console.log("Alliance color set to: " + allianceColor)
    return;
}

function switchColor() {
    if (allianceColor == "b") {
        console.log("red")
        allianceColor = "r"
        document.getElementById("initHeader").style.color = "var(--r)";
    } else {
        console.log("blue")
        allianceColor = "b"
        document.getElementById("initHeader").style.color = "var(--b)";
    }
}

//search function
document.getElementById("searchBtn").addEventListener("click", ()=>{
    searchTerm = document.getElementById("initSearchForm").value        
    value = localStorage.getItem(searchTerm)
    if (value == null || searchTerm == null || searchTerm == '') {
        document.getElementById('qrOutput').innerHTML = "";
        console.log("No data found")
        return
    }

    console.log("Search term: " + searchTerm)
    console.log("Data: " + value)

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(value);
    qr.make();
    /*
    var mod = qr.getModuleCount();
    var length = 8 + 2 * mod
    document.getElementById('qrOutput').style.width = length;
    document.getElementById('qrOutput').style.height = length;
    */

    document.getElementById('qrOutput').innerHTML = qr.createImgTag();
    console.log("Data found for match " + searchTerm + ": ");
    console.log(value);
    modal.style.display = "block";
})

let keys = [];
for(let i = 0; i < settings.auto.length; i++){
    keys.push(settings.auto[i].trigger);
}
for(let i=0; i<settings.tele.length; i++){
    keys.push(settings.tele[i].trigger);
}
let uniqueKeys = keys.filter((i, index) => {
    return keys.indexOf(i) === index;
});
let qrRefresh = setInterval(()=>{ if(state == "after") updateQr() }, 1000);
window.addEventListener('keydown', function (keystroke) {
    

    if(keystroke.key == "Alt"){
        if(state == "init" || state == "after"){
            return;
        }
        console.log("toggled")
        document.getElementById("notes").classList.remove("notesAnim")
        document.getElementById("notes").classList.remove("notesAnimR")
        document.getElementById("notesPage").classList.remove("notesPageAnim")
        document.getElementById("notesPage").classList.remove("notesPageAnimR")

        if(!notesToggled){
            document.getElementById('notesPage').classList.add("notesPageAnim")
            document.getElementById('notes').classList.add("notesAnim")
            document.getElementById('notes').focus()
            notesToggled = true;
            if (dataValues[14] == null) {
                document.getElementById("notes").innerHTML = "";
            } else {
                document.getElementById("notes").innerHTML = dataValues[14];
            }
        }
        else{
            document.getElementById('notes').blur()

            document.getElementById('notesPage').classList.add("notesPageAnimR")
            document.getElementById('notes').classList.add("notesAnimR")
            dataValues[14] = document.getElementById("notes").value
            notesToggled = false;
        }

    }
    if(notesToggled){
        return;
    }

    console.log(keystroke.key)

    if(state == "after"){
       updateQr();
    }



    if(keystroke.key == " " && state == "standby"){
        transition(1)
    }

    for(let i=0; i<uniqueKeys.length; i++){
        
        if(state == "auto"){
            if(settings.auto[i].trigger == keystroke.key){
                clickEvt(settings.auto[i].writeType, settings.auto[i].writeLoc);
            }
            if(settings.auto[i].trigger.toUpperCase() == keystroke.key){
                clickEvt(settings.auto[i].writeType, settings.auto[i].writeLoc, true);
                console.log("reverse")
            }
        }
        if(state == "tele"){
            if(settings.tele[i].trigger == keystroke.key){
                clickEvt(settings.tele[i].writeType, settings.tele[i].writeLoc);
            }
            if(settings.tele[i].trigger.toUpperCase() == keystroke.key){
                clickEvt(settings.tele[i].writeType, settings.tele[i].writeLoc, true);
                console.log("reverse")
            }
        }
    }
    
    
}
)

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
function canvasClicked(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    var pos = getMousePos(canvas, event);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    console.log("canvas clicked, x: " + Math.round(pos.x) + ", y: " + Math.round(pos.y));
}

function generateMainPage(stage){
    document.getElementById("display-match").innerHTML = "Match:  " + matchNum;
    document.getElementById("display-team").innerHTML = "Team: " + teamNum;
    if(stage == "auto"){
        for(i=0; i<settings.auto.length; i++){
            const box = document.createElement("div")
            box.innerHTML = settings.auto[i].label;
            box.classList.add("mainPageBox");
            box.style.gridColumnStart = settings.auto[i].columnStart;
            box.style.gridColumnEnd = settings.auto[i].columnEnd;
            box.style.gridRowStart = settings.auto[i].rowStart;
            box.style.gridRowEnd = settings.auto[i].rowEnd;
            let wType = settings.auto[i].writeType;
            let wLoc = settings.auto[i].writeLoc;
            box.id = "box" + wLoc
            box.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(box);

            const boxLabel = document.createElement("div");
            boxLabel.classList.add("mainPageLabel");
            boxLabel.style.gridColumn = (settings.auto[i].columnEnd-1) + "/" + (settings.auto[i].columnEnd-1);
            boxLabel.style.gridRow = (settings.auto[i].rowEnd-1) + "/" + (settings.auto[i].rowEnd-1);
            boxLabel.innerHTML = settings.auto[i].trigger.toUpperCase()
            boxLabel.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(boxLabel);

            const boxCount = document.createElement("div");
            boxCount.classList.add("mainPageCounter");
            boxCount.id = "label" + wLoc;
            boxCount.innerHTML = dataValues[wLoc];
            boxCount.style.gridColumn = settings.auto[i].columnStart + "/" + settings.auto[i].columnStart;
            boxCount.style.gridRow = (settings.auto[i].rowEnd-1) + "/" + (settings.auto[i].rowEnd-1);
            boxCount.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(boxCount);
            
        }
    }
    if(stage == "tele"){
        for(i=0; i<settings.tele.length; i++){
            const box = document.createElement("div")
            box.innerHTML = settings.tele[i].label;
            box.classList.add("mainPageBox");
            box.style.gridColumnStart = settings.tele[i].columnStart;
            box.style.gridColumnEnd = settings.tele[i].columnEnd;
            box.style.gridRowStart = settings.tele[i].rowStart;
            box.style.gridRowEnd = settings.tele[i].rowEnd;
            let wType = settings.tele[i].writeType;
            let wLoc = settings.tele[i].writeLoc;
            box.id = "box" + wLoc
            box.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(box);

            const boxLabel = document.createElement("div");
            boxLabel.classList.add("mainPageLabel");
            boxLabel.style.gridColumn = (settings.tele[i].columnEnd-1) + "/" + (settings.tele[i].columnEnd-1);
            boxLabel.style.gridRow = (settings.tele[i].rowEnd-1) + "/" + (settings.tele[i].rowEnd-1);
            boxLabel.innerHTML = settings.tele[i].trigger.toUpperCase()
            boxLabel.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(boxLabel);

            const boxCount = document.createElement("div");
            boxCount.classList.add("mainPageCounter");
            boxCount.id = "label" + wLoc;
            boxCount.innerHTML = dataValues[wLoc];
            boxCount.style.gridColumn = settings.tele[i].columnStart + "/" + settings.tele[i].columnStart;
            boxCount.style.gridRow = (settings.tele[i].rowEnd-1) + "/" + (settings.tele[i].rowEnd-1);
            boxCount.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(boxCount);
        }
        console.log("tele generated");
    }
    if(stage == "after"){
        document.getElementById("displayBar").style.display = "none"

        //close notes box if it is open
        document.getElementById('notes').blur()
        dataValues[14] = document.getElementById("notes").value
        document.getElementById("notes").classList.remove("notesAnim")
        document.getElementById("notes").classList.remove("notesAnimR")
        document.getElementById("notesPage").classList.remove("notesPageAnim")
        document.getElementById("notesPage").classList.remove("notesPageAnimR")

        let mainPage = document.getElementById("mainPage");
        mainPage.style.display = "flex"
        mainPage.classList.remove("mainPage");
        mainPage.classList.add("afterPageContainer");
        let qataBox = document.createElement("div");
        qataBox.classList.add("afterPageQata");
        mainPage.appendChild(qataBox);


        for(let i=0; i<settings.after.length; i++){
            if(settings.after[i].writeType == "cyc"){
                const container = document.createElement("div");
                container.classList.add("cycContainer");
                qataBox.appendChild(container);

                const label = document.createElement("div");
                label.classList.add("qataLabel");
                label.innerHTML = settings.after[i].label;
                container.appendChild(label);

                const bar = document.createElement("div");
                bar.classList.add("qataCycContainer");
                container.appendChild(bar);

                for(let b=0; b<settings.after[i].cycOptions.length; b++){
                    const option = document.createElement("div");
                    option.classList.add("qataCyc");
                    option.setAttribute("id", (settings.after[i].writeLoc + "cyc" + settings.after[i].cycOptions[b]))
                    option.innerHTML = settings.after[i].cycOptions[b]
                    option.addEventListener("click", ()=> clickEvt("cyc", settings.after[i].writeLoc, settings.after[i].cycOptions[b]))
                    bar.appendChild(option);
                }
                //set default value
                dataValues[settings.after[i].writeLoc] = settings.after[i].cycOptions[0];
                
            }
            if(settings.after[i].writeType == "bool"){
                const container = document.createElement("div");
                container.classList.add("switchContainer");
                qataBox.appendChild(container);

                const labelText = document.createElement("div");
                labelText.classList.add("qataLabel");
                labelText.innerHTML = settings.after[i].label;
                container.appendChild(labelText);

                const labelElem = document.createElement("label");
                labelElem.classList.add("switch")

                
                container.appendChild(labelElem)

                const input = document.createElement("input");
                input.type = "checkbox";
                input.addEventListener("click", ()=>clickEvt("afterBool", settings.after[i].writeLoc))
                input.setAttribute("id", ("switch" + settings.after[i].writeLoc))
                labelElem.appendChild(input);

                const span = document.createElement("span");
                span.classList.add("slider");
                span.classList.add("round");
                labelElem.appendChild(span);
            }
            if(settings.after[i].writeType == "str"){
                
                const container = document.createElement("div");
                container.classList.add("textContainer");
                if(settings.after[i].label == "Other Qata"){
                    container.style.height = "20vh"
                }
                qataBox.appendChild(container);

                const labelText = document.createElement("div");
                labelText.classList.add("qataLabel");
                labelText.innerHTML = settings.after[i].label;
                container.appendChild(labelText);


                if(settings.after[i].label == "Other Qata"){
                    const textbox = document.createElement("textarea");
                    textbox.classList.add("afterTextBox");
                    textbox.setAttribute("id", ("str" + settings.after[i].writeLoc));
                    textbox.setAttribute("placeholder", settings.after[i].placeholder)
                    textbox.style.height = "14vh";
                    textbox.style.paddingTop = "7px";
                    textbox.style.resize = "none";
                    textbox.innerHTML = dataValues[14];
                    container.appendChild(textbox)
                }
                else{
                    const textbox = document.createElement("input");
                    textbox.type = "text";
                    textbox.classList.add("afterTextBox");
                    textbox.setAttribute("id", ("str" + settings.after[i].writeLoc));
                    textbox.setAttribute("placeholder", settings.after[i].placeholder)
                    container.appendChild(textbox)
                }
            }
            
        }


        let editBox = document.createElement("div");
        editBox.classList.add("afterPageEdit");
        mainPage.appendChild(editBox);

        let mainTable = document.createElement("table");
        mainTable.setAttribute("id", "mainTable")
        let tableBody = document.createElement("tbody");

        
        
        for(i=0; i<settings.auto.length; i++){
            rowContent.push(settings.auto[i])
        }
        for(i=0; i<settings.tele.length; i++){
            rowContent.push(settings.tele[i])
        }
        rowContent.push(tempFix[0])

        console.log(rowContent.length)
        

        for(let i=0; i<rowContent.length; i++){
            var row = document.createElement("tr");
            row.addEventListener("click", ()=> clickEvt("edit", i))
            row.setAttribute('id', ("tr" + i))
            row.setAttribute('class', "editTableRow")
            
            for(let b=0; b<2; b++){
                let content;
                if(b%2 == 0){
                    content = rowContent[i].label
                }
                if(b%2 == 1){
                    content = dataValues[rowContent[i].writeLoc]
                }
                var cell = document.createElement("td");
                var cellText = document.createTextNode(content);
                cell.appendChild(cellText);
                if (b%2 == 0) {
                    cell.setAttribute('id', 'qataPageCellID' + i + '')
                    cell.setAttribute('class', 'qataPageCellID')
                }
                if (b%2 == 1) {
                    cell.setAttribute('id', 'qataPageCellNumber' + i + '')
                    cell.setAttribute('class', 'qataPageCellNumber')
                }
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }
        mainTable.appendChild(tableBody)
        editBox.appendChild(mainTable)

        let header = mainTable.createTHead();
        let hRow = header.insertRow(0);
        let hCell = hRow.insertCell(0);
        hCell.innerText = "item";
        hCell.classList.add("qataPageCellID")
        let hCell2 = hRow.insertCell(1);
        hCell2.innerText = "value"; 
        hCell2.classList.add("qataPageCellNumber")

        //buttons that user selects while editing
        let editor = document.createElement("div");
        editor.classList.add("afterEditor")
        editBox.appendChild(editor);

        let btn = document.createElement("button");
        btn.setAttribute("id", "editMinusBtn");
        btn.setAttribute("class", "editBtn");
        btn.innerHTML = "-"
        editor.appendChild(btn);
        document.getElementById("editMinusBtn").addEventListener("click", ()=> clickEvt("editBtn", null, "minus"));

        const textbox = document.createElement("input");
        textbox.type = "text";
        textbox.setAttribute("id", "editTextBox");
        textbox.disabled = true;
        textbox.addEventListener("change", ()=> clickEvt("editBtn", null, "value"))
        editor.appendChild(textbox)

        let btn2 = document.createElement("button");
        btn2.setAttribute("id", "editPlusBtn");
        btn2.setAttribute("class", "editBtn");
        btn2.innerHTML = "+"
        editor.appendChild(btn2);
        document.getElementById("editPlusBtn").addEventListener("click", ()=> clickEvt("editBtn", null, "plus")); 



        let qrBox = document.createElement("div");
        qrBox.classList.add("afterPageQr");
        mainPage.appendChild(qrBox);

        let qrContainer = document.createElement("div");
        qrContainer.classList.add("qrContainer");
        qrContainer.setAttribute('id', "qrContainer");
        qrBox.appendChild(qrContainer);

        let qrText = document.createElement("div");
        qrText.setAttribute("id", "qrText");
        qrText.addEventListener("click", ()=>{
            navigator.clipboard.writeText(document.getElementById("qrText").innerHTML);
            alert("String copied to clipboard")
        })
        qrBox.appendChild(qrText);

        let qrBtn = document.createElement("button");
        qrBtn.setAttribute("id", "qrBtn");
        qrBtn.innerHTML = "continue";
        qrBtn.addEventListener("click", ()=>clickEvt("transition", null, null))
        qrBox.appendChild(qrBtn);

        updateQr()

    }
}
function timerStart(i){
    timer = 150;
    delay = true;
    updateTimer();

    window.timerFunction = setInterval(updateTimer, timeInt)
    
    console.log("started")
}
function updateTimer(){
    document.getElementById("display-timer").innerHTML = timer;

    if(settings.imported.transitionMode == "manual"){
        timer--;
    }
    if(settings.imported.transitionMode == "auto"){
        if (timer == 135 && delay) {
            timer = 136; //136??? check delay
            delay = !delay
          }
          if (timer == 135 && !delay) {
            state = "tele"
            transition(2)
          }
          if(timer == 30){
            //state = "end"
            //transition(3)
          }
          if(timer == 0) {
            console.log("Game over");
            timer -= 1;
            state = "after";
            transition(4)
          }
          if (timer > 0) {
            timer --;
          }
    }
    if(timer == 0) {
        console.log("Game over");
        timer -= 1;
        state = "after";
        transition(4)
    }

    
}

function updateQr(){


    for(let i=0; i<dataValues.length; i++){
        if(i == 8){ //scrappy code, should change later   
        }
        else if(typeof dataValues[i] == "boolean"){ //convert boolean to 0 or 1
            if(dataValues[i]){
                dataValues[i] = 1;
            }
            else if(!dataValues[i]){
                dataValues[i] = 0;
            }
        }
        else if(typeof dataValues[i] == "string"){ 
            let textValue = document.getElementById(("str" + i)).value;
            textValue = textValue.replace(/\n/g, ' ').replace(/\,/g, ';');
            if (textValue.length == 0) {
                dataValues[i] = "None";
            } else {
                dataValues[i] = textValue;
            }
        }
        
    }    //console.log(dataValues)

    //reference for qr gen: https://github.com/kazuhikoarase/qrcode-generator/blob/master/js/README.md

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(matchInfo.concat(dataValues).toString());
    qr.make();
    document.getElementById('qrContainer').innerHTML = qr.createImgTag();
    document.getElementById("qrText").innerHTML = matchInfo.concat(dataValues);

}

let incArr = []
let selected = -1;
function clickEvt(type, loc, rev = null){
    console.log(type + " " + loc);
    let clickAudio = new Audio("sfx/click.wav")
    clickAudio.play();
    //during game
    if(type == "int"){
        document.getElementById("box" + loc).classList.remove("clickAnim");
        void document.getElementById("box" + loc).offsetWidth;
        if(rev){
            dataValues[loc]--;
            document.getElementById("box" + loc).classList.add("clickAnim");
        }
        if(!rev){
            dataValues[loc]++;
            document.getElementById("box" + loc).classList.add("clickAnim");
        }
        document.getElementById("label" + loc).innerHTML = dataValues[loc];
    }
    if(type == "bool"){
        dataValues[loc] = !dataValues[loc];
        document.getElementById("label" + loc).innerHTML = dataValues[loc];
        if (dataValues[loc]) {
            document.getElementById("box" + loc).style.backgroundColor = "var(--accentColor)"
        } else {
            document.getElementById("box" + loc).style.backgroundColor = "var(--altBgColor)"
        }
    }
    if(type == "inc"){
        if(rev){
            return;
        }
        if(incArr.includes(loc)){
            incArr.splice(incArr.indexOf(loc), 1);
            document.getElementById("box" + loc).style.backgroundColor = "var(--altBgColor)"
        }
        else{
            incArr.push(loc);
            document.getElementById("box" + loc).style.backgroundColor = "var(--accentColor)"
        }
        document.getElementById("label" + loc).innerHTML = dataValues[loc];
    }
    //after game
    
    if(type == "cyc"){
        if(dataValues[loc]){
            dataValues[loc] = rev;
            for(let i = 0; i < settings.after[0].cycOptions.length; i++){
                document.getElementById((loc + "cyc" + settings.after[0].cycOptions[i])).style.border = "2px solid var(--highlightColor)";
            }
            document.getElementById((loc + "cyc" + rev)).style.border = "2px solid var(--accentColor)";
        }
        if(!dataValues[loc]){
            dataValues[loc] = rev;
            document.getElementById((loc + "cyc" + rev)).style.border = "2px solid var(--accentColor)";
        }
    }
    if(type == "afterBool"){
        dataValues[loc] = !dataValues[loc];
    }
    if(type == "edit"){

        for(let j=0; j<rowContent.length; j++){
            document.getElementById(("tr" + j)).classList.remove("editSelect")
        }
        document.getElementById(("tr" + loc)).classList.add("editSelect")
        selected = loc;
        if(rowContent[selected].writeType == "bool"){
            document.getElementById("editTextBox").disabled = true;
        }
        if(rowContent[selected].writeType != "bool"){
            document.getElementById("editTextBox").disabled = false;
        }
        document.getElementById("editTextBox").value = dataValues[rowContent[selected].writeLoc]
    }
    if(type == "editBtn"){
        if(selected == -1){
            alert("nothing selected")
            return;
        }

        if(rev == "value"){
            dataValues[rowContent[selected].writeLoc] = document.getElementById("editTextBox").value
            document.getElementById(("qataPageCellNumber" + selected)).innerHTML = dataValues[rowContent[selected].writeLoc]
            dataValues[rowContent[selected].writeLoc]++; //hacky bugfix 2: electric boogaloo (why does this work bro)
            dataValues[rowContent[selected].writeLoc]--;
        }

        if(rowContent[selected].writeType == "bool"){
            dataValues[rowContent[selected].writeLoc] = !dataValues[rowContent[selected].writeLoc]
        }
        if((rowContent[selected].writeType == "int") || (rowContent[selected].writeType == "inc")){
            if(rev == "plus"){
                dataValues[rowContent[selected].writeLoc]++;
            }
            if(rev == "minus"){
                dataValues[rowContent[selected].writeLoc]--;
            }
        }

        document.getElementById(("qataPageCellNumber" + selected)).innerHTML = dataValues[rowContent[selected].writeLoc]
        document.getElementById("editTextBox").value = dataValues[rowContent[selected].writeLoc]
        
    }
    if(state == "after"){
        updateQr();
    }

    if(type == "transition"){
        if(confirm("Resetting game... Are you sure you have been scanned and given OK?")){
            localStorage.setItem(matchNum, matchInfo.concat(dataValues));
            console.log("Final Data: " + matchInfo.concat(dataValues));
            resetGame()
        }
    }

    console.log(dataValues);
}

//def and climb timers
setInterval( ()=>{
    if((state == "after") || (state=="init")){
        return;
    }
    for(let i=0; i<incArr.length; i++){
        dataValues[incArr[i]]++
        document.getElementById("label" + incArr[i]).innerHTML = dataValues[incArr[i]];
    }
}, 1000)

function transition(i){
    if(i==0 && state == "init"){
        scoutNum = document.getElementById("initIdForm").value;
        matchNum = document.getElementById("initMatchForm").value;
        teamNum = document.getElementById("initNumberForm").value;
        teamPos = document.getElementById("initPositionForm").value;

        if (!testing) {
            if (!(allianceColor == 'b' || allianceColor == 'r')) { //check alliance color
                if (!confirm("Did you enter the alliance color by clicking eScouting?")) {
                return;
                }
            }
            if (scoutNum == "") { //check scout name
                if (!confirm("Did you enter your name in scout id?")) {
                return;
                }
            }
            if (!(/^\d+$/.test(teamNum))) { //check if team number is a number
                if (!confirm("Did you enter your team number correctly?")) {
                return;
                }
            }
            if (!(/^\d+$/.test(matchNum))) { //check if match number is a number
                if (!confirm("Did you enter the match number correctly?")) {
                return;
                }
            }
            if (!(teamPos == 1 || teamPos == 2 || teamPos == 3)) { //check if team position is 1, 2, or 3
                if (!confirm("Did you enter your team position correctly?")) {
                return;
                }
            }
        }

        combAllianceColor = allianceColor + teamPos;
        console.log("alliance color: " + combAllianceColor)
        matchInfo = [teamNum, matchNum, scoutNum, combAllianceColor];
        document.getElementById("infoBar").innerHTML = "Match: " + matchNum + ", Team: " + teamNum + ", Position: " + combAllianceColor

        document.getElementById("initFormContainer").classList.add("transitionEvent0");
        setTimeout(()=>{
            document.getElementById("initFormContainer").classList.add("hideClass");
        }, 100)
        document.getElementById("initDivLine").classList.add("transitionEvent1");
        document.getElementById("standbyContainer").classList.add("transitionEvent0Rev");
        setTimeout(()=>{
            document.getElementById("standbyContainer").style.display = "flex";
            canvasClicked()
        }, 1000)
        state = "standby"
        return;

    }
    if(i==1 && state == "standby"){
        timerStart()
        startAudio.play();
        document.getElementById("initPage").style.display = "none";
        document.getElementById("mainPage").style.display = "grid";
        generateMainPage("auto")
        state = "auto";
    }
    if(i==2){
        // document.getElementById("mainPage").textContent = '';
        let removeElem = (settings.auto.length)*3        
        for(let i=0; i<removeElem; i++){
            
            mainPageElem = document.getElementById("mainPage");
            mainPageElem.removeChild(mainPageElem.lastElementChild)
        }
        generateMainPage("tele")
        state = "tele"
    }
    if(i == 4  && state == "after"){
        let removeElem = (settings.tele.length)*3        
        for(let i=0; i<removeElem; i++){
            
            mainPageElem = document.getElementById("mainPage");
            mainPageElem.removeChild(mainPageElem.lastElementChild)
        }
        generateMainPage("after");
        
    }
}

function resetGame(){
    
    state="init";
    timer = 150;
    delay = true;
    rowContent = [];
    incArr = [];
    matchInfo = [];
    selected = -1;
    clearInterval(timerFunction);
    teamNum = null;
    notesToggled = false;

    dataValues = [false, 0, 0, 0, 0, 0, 0, false, null, 0, 0, false, "", false, "", "", ""]

    //clearing main page and generating the displaybar
    document.getElementById("mainPage").innerHTML = '';
    let displayBar = document.createElement("div");
    displayBar.setAttribute("id", "displayBar");
    mainPage.appendChild(displayBar);

    //clear infobar
    document.getElementById("infoBar").innerHTML = '';

    //resetting initial page values
    document.getElementById("initNumberForm").value = '';
    document.getElementById("initMatchForm").value++;
    document.getElementById("qrOutput").innerHTML = "";
    document.getElementById("initSearchForm").value = '';
    document.getElementById("notes").value = '';

    //close out of note box
    document.getElementById('notes').blur()
    
    let displayMatch = document.createElement("div");
    displayMatch.setAttribute("id", "display-match");
    displayBar.appendChild(displayMatch);
    let displayTimer = document.createElement("div");
    displayTimer.setAttribute("id", "display-timer");
    displayBar.appendChild(displayTimer);
    let displayTeam = document.createElement("div");
    displayTeam.setAttribute("id", "display-team");
    displayBar.appendChild(displayTeam);

    document.getElementById("mainPage").style.display = "none";

    document.getElementById("initPage").style.display = "flex";
    document.getElementById("standbyContainer").style.display = "none";
    document.getElementById("initDivLine").classList.remove("transitionEvent1")
    document.getElementById("initFormContainer").classList.remove("hideClass")
    document.getElementById("initFormContainer").classList.remove("transitionEvent0")

    document.getElementById("mainPage").classList.remove("afterPageContainer");
    document.getElementById("mainPage").classList.add("mainPage");
}

//buffers for phase switching
//manual vs auto phase switching
//hour logging?
//till next break>??
//custom keybinds
//custom colour themes
//custom sounds but its already implemented :shrug:



