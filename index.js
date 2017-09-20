'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const request = require("request");
const cheerio = require("cheerio");

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

const baseUrl = 'http://web.metro.taipei/c/payparkinginfo.asp?stationID=';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var isValid = (input) => {
  if(
    input == '動物園機車' || 
    input == '木柵機車' || 
    input == '萬芳社區機車' || 
    input == '萬芳醫院機車' || 
    input == '辛亥機車' || 
    input == '麟光機車' || 
    input == '六張犁機車' || 
    input == '科技大樓機車' || 
    input == '大安機車' || 
    input == '忠孝復興機車' || 
    input == '南京復興機車' || 
    input == '中山國中機車' || 
    input == '松山機場機車' || 
    input == '大直機車' || 
    input == '劍南路機車' || 
    input == '西湖機車' || 
    input == '港墘機車' || 
    input == '文德機車' || 
    input == '內湖機車' || 
    input == '大湖公園機車' || 
    input == '葫洲機車' || 
    input == '東湖機車' || 
    input == '南港軟體園區機車' || 
    input == '南港展覽館機車' || 
    input == '象山機車' || 
    input == '台北101/世貿機車' || 
    input == '信義安和機車' || 
    input == '大安機車' || 
    input == '大安森林公園機車' || 
    input == '東門機車' || 
    input == '中正紀念堂機車' || 
    input == '台大醫院機車' || 
    input == '台北車站機車' || 
    input == '中山機車' || 
    input == '雙連機車' || 
    input == '民權西路機車' || 
    input == '圓山機車' || 
    input == '劍潭機車' || 
    input == '士林機車' || 
    input == '芝山機車' || 
    input == '明德機車' || 
    input == '石牌機車' || 
    input == '唭哩岸機車' || 
    input == '奇岩機車' || 
    input == '北投機車' || 
    input == '新北投機車' || 
    input == '復興崗機車' || 
    input == '忠義機車' || 
    input == '關渡機車' || 
    input == '竹圍機車' || 
    input == '紅樹林機車' || 
    input == '淡水機車' || 
    input == '新店機車' || 
    input == '新店區公所機車' || 
    input == '七張機車' || 
    input == '小碧潭機車' || 
    input == '大坪林機車' || 
    input == '景美機車' || 
    input == '萬隆機車' || 
    input == '公館機車' || 
    input == '台電大樓機車' || 
    input == '古亭機車' || 
    input == '中正紀念堂機車' || 
    input == '小南門機車' || 
    input == '西門機車' || 
    input == '北門機車' || 
    input == '中山機車' || 
    input == '松江南京機車' || 
    input == '南京復興機車' || 
    input == '台北小巨蛋機車' || 
    input == '南京三民機車' || 
    input == '松山機車' || 
    input == '南勢角機車' || 
    input == '景安機車' || 
    input == '永安市場機車' || 
    input == '頂溪機車' || 
    input == '古亭機車' || 
    input == '東門機車' || 
    input == '忠孝新生機車' || 
    input == '松江南京機車' || 
    input == '行天宮機車' || 
    input == '中山國小機車' || 
    input == '民權西路機車' || 
    input == '大橋頭機車' || 
    input == '台北橋機車' || 
    input == '菜寮機車' || 
    input == '三重機車' || 
    input == '先嗇宮機車' || 
    input == '頭前庄機車' || 
    input == '新莊機車' || 
    input == '輔大機車' || 
    input == '丹鳳機車' || 
    input == '迴龍機車' || 
    input == '三重國小機車' || 
    input == '三和國中機車' || 
    input == '徐匯中學機車' || 
    input == '三民高中機車' || 
    input == '蘆洲機車' || 
    input == '頂埔機車' || 
    input == '永寧機車' || 
    input == '土城機車' || 
    input == '海山機車' || 
    input == '亞東醫院機車' || 
    input == '府中機車' || 
    input == '板橋機車' || 
    input == '新埔機車' || 
    input == '江子翠機車' || 
    input == '龍山寺機車' || 
    input == '西門機車' || 
    input == '台北車站機車' || 
    input == '善導寺機車' || 
    input == '忠孝新生機車' || 
    input == '忠孝復興機車' || 
    input == '忠孝敦化機車' || 
    input == '國父紀念館機車' || 
    input == '市政府機車' || 
    input == '永春機車' || 
    input == '後山埤機車' || 
    input == '昆陽機車' || 
    input == '南港機車' || 
    input == '南港展覽館機車' || 
    input == '動物園汽車' || 
    input == '木柵汽車' || 
    input == '萬芳社區汽車' || 
    input == '萬芳醫院汽車' || 
    input == '辛亥汽車' || 
    input == '麟光汽車' || 
    input == '六張犁汽車' || 
    input == '科技大樓汽車' || 
    input == '大安汽車' || 
    input == '忠孝復興汽車' || 
    input == '南京復興汽車' || 
    input == '中山國中汽車' || 
    input == '松山機場汽車' || 
    input == '大直汽車' || 
    input == '劍南路汽車' || 
    input == '西湖汽車' || 
    input == '港墘汽車' || 
    input == '文德汽車' || 
    input == '內湖汽車' || 
    input == '大湖公園汽車' || 
    input == '葫洲汽車' || 
    input == '東湖汽車' || 
    input == '南港軟體園區汽車' || 
    input == '南港展覽館汽車' || 
    input == '象山汽車' || 
    input == '台北101/世貿汽車' || 
    input == '信義安和汽車' || 
    input == '大安汽車' || 
    input == '大安森林公園汽車' || 
    input == '東門汽車' || 
    input == '中正紀念堂汽車' || 
    input == '台大醫院汽車' || 
    input == '台北車站汽車' || 
    input == '中山汽車' || 
    input == '雙連汽車' || 
    input == '民權西路汽車' || 
    input == '圓山汽車' || 
    input == '劍潭汽車' || 
    input == '士林汽車' || 
    input == '芝山汽車' || 
    input == '明德汽車' || 
    input == '石牌汽車' || 
    input == '唭哩岸汽車' || 
    input == '奇岩汽車' || 
    input == '北投汽車' || 
    input == '新北投汽車' || 
    input == '復興崗汽車' || 
    input == '忠義汽車' || 
    input == '關渡汽車' || 
    input == '竹圍汽車' || 
    input == '紅樹林汽車' || 
    input == '淡水汽車' || 
    input == '新店汽車' || 
    input == '新店區公所汽車' || 
    input == '七張汽車' || 
    input == '小碧潭汽車' || 
    input == '大坪林汽車' || 
    input == '景美汽車' || 
    input == '萬隆汽車' || 
    input == '公館汽車' || 
    input == '台電大樓汽車' || 
    input == '古亭汽車' || 
    input == '中正紀念堂汽車' || 
    input == '小南門汽車' || 
    input == '西門汽車' || 
    input == '北門汽車' || 
    input == '中山汽車' || 
    input == '松江南京汽車' || 
    input == '南京復興汽車' || 
    input == '台北小巨蛋汽車' || 
    input == '南京三民汽車' || 
    input == '松山汽車' || 
    input == '南勢角汽車' || 
    input == '景安汽車' || 
    input == '永安市場汽車' || 
    input == '頂溪汽車' || 
    input == '古亭汽車' || 
    input == '東門汽車' || 
    input == '忠孝新生汽車' || 
    input == '松江南京汽車' || 
    input == '行天宮汽車' || 
    input == '中山國小汽車' || 
    input == '民權西路汽車' || 
    input == '大橋頭汽車' || 
    input == '台北橋汽車' || 
    input == '菜寮汽車' || 
    input == '三重汽車' || 
    input == '先嗇宮汽車' || 
    input == '頭前庄汽車' || 
    input == '新莊汽車' || 
    input == '輔大汽車' || 
    input == '丹鳳汽車' || 
    input == '迴龍汽車' || 
    input == '三重國小汽車' || 
    input == '三和國中汽車' || 
    input == '徐匯中學汽車' || 
    input == '三民高中汽車' || 
    input == '蘆洲汽車' || 
    input == '頂埔汽車' || 
    input == '永寧汽車' || 
    input == '土城汽車' || 
    input == '海山汽車' || 
    input == '亞東醫院汽車' || 
    input == '府中汽車' || 
    input == '板橋汽車' || 
    input == '新埔汽車' || 
    input == '江子翠汽車' || 
    input == '龍山寺汽車' || 
    input == '西門汽車' || 
    input == '台北車站汽車' || 
    input == '善導寺汽車' || 
    input == '忠孝新生汽車' || 
    input == '忠孝復興汽車' || 
    input == '忠孝敦化汽車' || 
    input == '國父紀念館汽車' || 
    input == '市政府汽車' || 
    input == '永春汽車' || 
    input == '後山埤汽車' || 
    input == '昆陽汽車' || 
    input == '南港汽車' || 
    input == '南港展覽館汽車'
  ) {
    return true;
  } else {
    return false;
  }
};

var nameToCode = (input) => {
  if(input == '動物園') { return 'BR01'; }
  else if(input == '木柵') { return 'BR02'; }
  else if(input == '萬芳社區') { return 'BR03'; }
  else if(input == '萬芳醫院') { return 'BR04'; }
  else if(input == '辛亥') { return 'BR05'; }
  else if(input == '麟光') { return 'BR06'; }
  else if(input == '六張犁') { return 'BR07'; }
  else if(input == '科技大樓') { return 'BR08'; }
  else if(input == '大安') { return 'BR09'; }
  else if(input == '忠孝復興') { return 'BR10'; }
  else if(input == '南京復興') { return 'BR11'; }
  else if(input == '中山國中') { return 'BR12'; }
  else if(input == '松山機場') { return 'BR13'; }
  else if(input == '大直') { return 'BR14'; }
  else if(input == '劍南路') { return 'BR15'; }
  else if(input == '西湖') { return 'BR16'; }
  else if(input == '港墘') { return 'BR17'; }
  else if(input == '文德') { return 'BR18'; }
  else if(input == '內湖') { return 'BR19'; }
  else if(input == '大湖公園') { return 'BR20'; }
  else if(input == '葫洲') { return 'BR21'; }
  else if(input == '東湖') { return 'BR22'; }
  else if(input == '南港軟體園區') { return 'BR23'; }
  else if(input == '南港展覽館') { return 'BR24'; }
  else if(input == '象山') { return 'R02'; }
  else if(input == '台北101/世貿') { return 'R03'; }
  else if(input == '信義安和') { return 'R04'; }
  else if(input == '大安') { return 'R05'; }
  else if(input == '大安森林公園') { return 'R06'; }
  else if(input == '東門') { return 'R07'; }
  else if(input == '中正紀念堂') { return 'R08'; }
  else if(input == '台大醫院') { return 'R09'; }
  else if(input == '台北車站') { return 'R10'; }
  else if(input == '中山') { return 'R11'; }
  else if(input == '雙連') { return 'R12'; }
  else if(input == '民權西路') { return 'R13'; }
  else if(input == '圓山') { return 'R14'; }
  else if(input == '劍潭') { return 'R15'; }
  else if(input == '士林') { return 'R16'; }
  else if(input == '芝山') { return 'R17'; }
  else if(input == '明德') { return 'R18'; }
  else if(input == '石牌') { return 'R19'; }
  else if(input == '唭哩岸') { return 'R20'; }
  else if(input == '奇岩') { return 'R21'; }
  else if(input == '北投') { return 'R22'; }
  else if(input == '新北投') { return 'R22A'; }
  else if(input == '復興崗') { return 'R23'; }
  else if(input == '忠義') { return 'R24'; }
  else if(input == '關渡') { return 'R25'; }
  else if(input == '竹圍') { return 'R26'; }
  else if(input == '紅樹林') { return 'R27'; }
  else if(input == '淡水') { return 'R28'; }
  else if(input == '新店') { return 'G01'; }
  else if(input == '新店區公所') { return 'G02'; }
  else if(input == '七張') { return 'G03'; }
  else if(input == '小碧潭') { return 'G03A'; }
  else if(input == '大坪林') { return 'G04'; }
  else if(input == '景美') { return 'G05'; }
  else if(input == '萬隆') { return 'G06'; }
  else if(input == '公館') { return 'G07'; }
  else if(input == '台電大樓') { return 'G08'; }
  else if(input == '古亭') { return 'G09'; }
  else if(input == '中正紀念堂') { return 'G10'; }
  else if(input == '小南門') { return 'G11'; }
  else if(input == '西門') { return 'G12'; }
  else if(input == '北門') { return 'G13'; }
  else if(input == '中山') { return 'G14'; }
  else if(input == '松江南京') { return 'G15'; }
  else if(input == '南京復興') { return 'G16'; }
  else if(input == '台北小巨蛋') { return 'G17'; }
  else if(input == '南京三民') { return 'G18'; }
  else if(input == '松山') { return 'G19'; }
  else if(input == '南勢角') { return 'O01'; }
  else if(input == '景安') { return 'O02'; }
  else if(input == '永安市場') { return 'O03'; }
  else if(input == '頂溪') { return 'O04'; }
  else if(input == '古亭') { return 'O05'; }
  else if(input == '東門') { return 'O06'; }
  else if(input == '忠孝新生') { return 'O07'; }
  else if(input == '松江南京') { return 'O08'; }
  else if(input == '行天宮') { return 'O09'; }
  else if(input == '中山國小') { return 'O10'; }
  else if(input == '民權西路') { return 'O11'; }
  else if(input == '大橋頭') { return 'O12'; }
  else if(input == '台北橋') { return 'O13'; }
  else if(input == '菜寮') { return 'O14'; }
  else if(input == '三重') { return 'O15'; }
  else if(input == '先嗇宮') { return 'O16'; }
  else if(input == '頭前庄') { return 'O17'; }
  else if(input == '新莊') { return 'O18'; }
  else if(input == '輔大') { return 'O19'; }
  else if(input == '丹鳳') { return 'O20'; }
  else if(input == '迴龍') { return 'O21'; }
  else if(input == '三重國小') { return 'O50'; }
  else if(input == '三和國中') { return 'O51'; }
  else if(input == '徐匯中學') { return 'O52'; }
  else if(input == '三民高中') { return 'O53'; }
  else if(input == '蘆洲') { return 'O54'; }
  else if(input == '頂埔') { return 'BL01'; }
  else if(input == '永寧') { return 'BL02'; }
  else if(input == '土城') { return 'BL03'; }
  else if(input == '海山') { return 'BL04'; }
  else if(input == '亞東醫院') { return 'BL05'; }
  else if(input == '府中') { return 'BL06'; }
  else if(input == '板橋') { return 'BL07'; }
  else if(input == '新埔') { return 'BL08'; }
  else if(input == '江子翠') { return 'BL09'; }
  else if(input == '龍山寺') { return 'BL10'; }
  else if(input == '西門') { return 'BL11'; }
  else if(input == '台北車站') { return 'BL12'; }
  else if(input == '善導寺') { return 'BL13'; }
  else if(input == '忠孝新生') { return 'BL14'; }
  else if(input == '忠孝復興') { return 'BL15'; }
  else if(input == '忠孝敦化') { return 'BL16'; }
  else if(input == '國父紀念館') { return 'BL17'; }
  else if(input == '市政府') { return 'BL18'; }
  else if(input == '永春') { return 'BL19'; }
  else if(input == '後山埤') { return 'BL20'; }
  else if(input == '昆陽') { return 'BL21'; }
  else if(input == '南港') { return 'BL22'; }
  else if(input == '南港展覽館') { return 'BL23'; }
};

var parsekInput = (input) => {
  if(isValid(input)) {
    return [nameToCode(input.substr(0, input.length - 2)), input.substr(input.length - 2, input.length)];
  } else {
    return ['', ''];
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  console.log("##### someone talk at " + Date());
  console.log('##### req.body.events: ' + JSON.stringify(req.body.events));
  
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  console.log('##### handleEvent: ' + JSON.stringify(event));
  
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  
  var parsed = parsekInput(event.message.text);
  console.log('##### parsed: ' + parsed);
  if(parsed[0] == ''){
    return Promise.resolve(null);
  }
  
  request(baseUrl + parsed[0], (error, response, body) => {
    var $ = cheerio.load(body);
    
    var content = {};
    var cnt = 0;
    $("td").each(function(){
      content[cnt] = $(this).text();
      cnt++;
    });
    //console.log('##### content: ' + JSON.stringify(content));
    
    var startCnt = 0;
    for(var i = 0 ; i < Object.keys(content).length ; i++){
      if(content[i] == '[' + parsed[1] + ']') {
        startCnt = i;
      }
    }
    console.log('##### startCnt: ' + startCnt);
    if(startCnt == 0){
      return client.replyMessage(event.replyToken, { type: 'text', text: '查無資料(無線上車位資料或車位已滿)' });
    }
    
    var replyMsg = content[startCnt] + "剩餘: " + content[startCnt + 1] + "位 (" + content[startCnt + 2] + ")";
    console.log('##### replyMsg: ' + replyMsg);
    
    return client.replyMessage(event.replyToken, { type: 'text', text: replyMsg });
  });

  // create a echoing text message
  //const echo = { type: 'text', text: event.message.text };

  // use reply API
  //return client.replyMessage(event.replyToken, event.message);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
