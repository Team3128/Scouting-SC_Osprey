let settings = {
  "imported":{
    "transitionMode": "auto"
  },
  "auto": [
    {
      "label": "High Goal",
      "trigger": "f", 
      "columnStart": 1,
      "columnEnd": 3,
      "rowStart": 1,
      "rowEnd": 3,
      "writeLoc": 5,
      "writeType": "int"
    },
    {
      "label": "Low Goal",
      "trigger": "j", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 1,
      "rowEnd": 3,
      "writeLoc": 6,
      "writeType": "int"
    }, 
    {
      "label": "Missed Goal",
      "trigger": "d", 
      "columnStart": 1,
      "columnEnd": 3,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 7,
      "writeType": "int"
    }, 
    {
      "label": "Taxi",
      "trigger": "k", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 4,
      "writeType": "bool"
    }
  ],

  "tele":[
    {
      "label": "High Goal",
      "trigger": "f", 
      "columnStart": 1,
      "columnEnd": 3,
      "rowStart": 1,
      "rowEnd": 3,
      "writeLoc": 8,
      "writeType": "int"
    },
    {
      "label": "Low Goal",
      "trigger": "j", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 1,
      "rowEnd": 3,
      "writeLoc": 9,
      "writeType": "int"
    }, 
    {
      "label": "Missed Goal",
      "trigger": "d", 
      "columnStart": 1,
      "columnEnd": 3,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 10,
      "writeType": "int"
    }, 
    {
      "label": "Defense Timer",
      "trigger": "k", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 14,
      "writeType": "inc"
    },
    {
      "label": "Climb Timer",
      "trigger": "l", 
      "columnStart": 3,
      "columnEnd": 4,
      "rowStart": 4,
      "rowEnd": 5,
      "writeLoc": 13,
      "writeType": "inc"
    },
    {
      "label":"Oof Timer", 
      "trigger": ";", 
      "columnStart": 4,
      "columnEnd": 5,
      "rowStart": 4,
      "rowEnd": 5,
      "writeLoc": 16,
      "writeType": "inc"
    }
  ], 
  "after":[
    {
      "label":"Climb Level",
      "writeLoc": 12,
      "writeType": "cyc",
      "cycOptions": ["N","L", "M", "H", "T"],
      "writeCycOptions": 5
    },
    {
      "label":"Penalty",
      "writeLoc": 15,
      "writeType": "bool",
    }, 
    {
      "label": "Shooting Distance",
      "writeLoc": 17,
      "writeType": "str",
      "placeholder": "e.g. tarmac, bumper"
    },
    {
      "label": "Other Qata",
      "writeLoc": 18,
      "writeType": "str",
      "placeholder": "e.g. defence, penalties, speed"
    }

  ]
  
}

//let dataValues = [false, 0, 0, 0, 0, 0, 0, false, null, 0, 0, false, "", false, "", "", ""];
//let dataLabels = ["Taxi", "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Level", "Climb Time", "Defence Time", "Penalty", "Yeet", "Oof", "QATA", "Drivetrain Type", "Shooter Type"];

data = new dataStructure();
let dataValues = data.getDataValues();
let dataLabels = data.getDataLabels();


// let tempFix = [{
//   "label": "Attempted Climb",
//   "writeLoc": 7,
//   "writeType": "bool"
// }]