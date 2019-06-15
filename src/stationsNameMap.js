const stations = require("./stations.js");

/*
duplicate:

民權西路 *R13 O11
中山 R11 G14
台北車站 R10 BL12
中正紀念堂 R08 G10
東門 O06 R07
大安 BR09 R05

西門 G12 BL11
忠孝新生 O07 BL14
忠孝復興 BR10 BL15
南港展覽館 BR24 *BL23

古亭 G09 O05
松江南京 G15 O08
南京復興 BR11 G16

*/
let codeSkip = ["O11", "G14", "BL12", "G10", "R07", "R05", "BL11", "BL14", "BL15", "BR24", "O05", "O08", "G16"];

let resultMap = new Map();

for(let key of Object.keys(stations)) {
    
    if (codeSkip.includes(stations[key]["id"]))
        continue;
    
    resultMap.set(stations[key]["name"], stations[key]["id"]);
}

module.exports = resultMap;