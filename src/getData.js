const request = require("request");
const cheerio = require("cheerio");

const baseUrl = "https://web.metro.taipei/c/payparkinginfo.asp?stationID=";

//var parsed = ["R17", "汽車"];

module.exports = function(parsed) {
    return new Promise(function (resolve, reject) {
        
        request({
            url: baseUrl + parsed[0],
            followRedirect: false
            }, (error, response, body) => {
            
            var replyMsg = "";
            
            console.log("##### response.statusCode: " + response.statusCode);
            if(response.statusCode == 302) {
                replyMsg = "無停車場資訊\n";
            } else {
                var $ = cheerio.load(body);
                
                var content = {};
                var cnt = 0;
                $("td").each(function(){
                    content[cnt] = $(this).text();
                    cnt++;
                });
                
                for(var i = 0 ; i < Object.keys(content).length ; i++){
                    if(content[i].includes("[" + parsed[1] +"]")) {
                        replyMsg += content[i] + "剩餘: " + content[i + 1] + "位 (" + content[i + 2] + ")\n";
                    }
                }
                if(replyMsg == ""){
                    replyMsg = "無車位資料或車位已滿\n";
                }
            }
            console.log("##### replyMsg: " + replyMsg);
            resolve(replyMsg.slice(0, -1));
        });
        
    })
    
}