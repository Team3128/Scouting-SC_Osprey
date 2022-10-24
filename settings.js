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
      "writeLoc": 1,
      "writeType": "int"
    },
    {
      "label": "Low Goal",
      "trigger": "j", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 1,
      "rowEnd": 3,
      "writeLoc": 2,
      "writeType": "int"
    }, 
    {
      "label": "Missed Goal",
      "trigger": "d", 
      "columnStart": 1,
      "columnEnd": 3,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 3,
      "writeType": "int"
    }, 
    {
      "label": "Taxi",
      "trigger": "k", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 0,
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
      "writeLoc": 4,
      "writeType": "int"
    },
    {
      "label": "Low Goal",
      "trigger": "j", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 1,
      "rowEnd": 3,
      "writeLoc": 5,
      "writeType": "int"
    }, 
    {
      "label": "Missed Goal",
      "trigger": "d", 
      "columnStart": 1,
      "columnEnd": 3,
      "rowStart": 3,
      "rowEnd": 5,
      "writeLoc": 6,
      "writeType": "int"
    }, 
    {
      "label": "Defense Timer",
      "trigger": "k", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 3,
      "rowEnd": 4,
      "writeLoc": 10,
      "writeType": "inc"
    },
    {
      "label": "Climb Timer",
      "trigger": "l", 
      "columnStart": 3,
      "columnEnd": 5,
      "rowStart": 4,
      "rowEnd": 5,
      "writeLoc": 9,
      "writeType": "inc"
    }
  ], 
  "after":[
    {
      "label":"Climb Level",
      "writeLoc": 8,
      "writeType": "cyc",
      "cycOptions": ["N","L", "M", "H", "T"],
      "writeCycOptions": 5
    },
    {
      "label":"Penalty",
      "writeLoc": 11,
      "writeType": "bool",
    }, 
    {
      "label":"Oof", 
      "writeLoc": 13,
      "writeType": "bool"
    },
    {
      "label": "Drive Train",
      "writeLoc": 15,
      "writeType": "str",
      "placeholder": "e.g. tank, swerve"
    },
    {
      "label": "Shooting Distance",
      "writeLoc": 12,
      "writeType": "str",
      "placeholder": "e.g. tarmac, bumper"
    },
    {
      "label": "Shooter", 
      "writeLoc": 16, 
      "writeType": "str",
      "placeholder": "e.g. hood, turret, other"
    },
    {
      "label": "Other Qata",
      "writeLoc": 14,
      "writeType": "str",
      "placeholder": "e.g. defence, penalties, speed"
    }

  ]
  
}

let dataValues = [false, 0, 0, 0, 0, 0, 0, false, null, 0, 0, false, "", false, "", "", ""];
let dataLabels = ["Taxi", "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Level", "Climb Time", "Defence Time", "Penalty", "Yeet", "Oof", "QATA", "Drivetrain Type", "Shooter Type"];

let tempFix = [{
  "label": "Attempted Climb",
  "writeLoc": 7,
  "writeType": "bool"
}]