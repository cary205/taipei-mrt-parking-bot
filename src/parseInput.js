const stationsNameMap = require("../src/stationsNameMap.js");

module.exports = function(input) {
    var stationName = input.substr(0, input.length - 2);
    var vehicleType = input.substr(-2);

    var isValidStationName = stationsNameMap.has(stationName)? true: false;
    var isValidVehicleType = ["汽車", "機車"].includes(vehicleType)? true: false;
    
    
    if(isValidStationName && isValidVehicleType) {
        return [stationsNameMap.get(stationName), vehicleType]
    } else {
        return ["", ""];
    }
}