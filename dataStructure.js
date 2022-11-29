class dataStructure {

    dataValues = [0       , 0       , ""        , ""      , false    , 0          , 0         , 0            , 0          , 0         , 0            , false            , 0             , 0           , 0             , false    , 0         , ""      , ""];
    dataLabels = ["Match" , "Team"  , "Position", "Scout" , "Taxi"   , "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Points", "Climb Time", "Defense Time", "Penalty", "Oof Time", "Yeet"  , "QATA"];
    dataTypes  = ["number", "number", "string"  , "string", "boolean", "number"   , "number"  , "number"     , "number"   , "number"  , "number"     , "boolean"        , "number"      , "number"    , "number"      , "boolean", "number"  , "string", "string"];

    pitscoutLabels = ["Timestamp", "Team Number", "Pitscout Name", "Drivetrain Type", "Robot Weight", "Number of DT Motors", "Motor Type", "Vision", "Auto", "Endgame", "Aluminum Assistance", "Miscellaneous"];

    constructor() {}

    getDataValues() {
        return this.dataValues;
    }
    getDataValue(i) {
        return this.dataValues[i];
    }
    getDataLabels() {
        return this.dataLabels;
    }
    getDataLabel(i) {
        return this.dataLabels[i];
    }
    getDataTypes() {
        return this.dataTypes;
    }
    getDataType(i) {
        return this.dataTypes[i];
    }
    getPitscoutLabels() {
        return this.pitscoutLabels;
    }
    getPitscoutLabel(i) {
        return this.pitscoutLabels[i];
    }

    setDataValues(arr) {
        this.dataValues = arr;
    }
    setDataValues(i, val) {
        this.dataValues[i] = val;
    }

    validateValues() {

    }

}