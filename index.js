"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const getData = require("./src/getData.js");
const parsekInput = require("./src/parseInput.js");

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

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/webhook", line.middleware(config), (req, res) => {
  console.log("##### someone talk at " + Date());
  console.log("##### req.body.events: " + JSON.stringify(req.body.events));
  
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => {
      console.log("result: " + JSON.stringify(result));
      res.json(result)
    }).catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
async function handleEvent(event) {
  console.log("##### handleEvent: " + JSON.stringify(event));
  
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  
  var parsed = parsekInput(event.message.text);
  console.log("##### parsed: " + parsed);
  if(parsed[0] == ""){
    return Promise.resolve(null);
  }
  
  var result = await getData(parsed);
  return client.replyMessage(event.replyToken, { type: "text", text: result });
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
