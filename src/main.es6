"use strict";

import "babel-polyfill";
import "date-utils";
const debug = require("debug")("bot");
import co from "co";

import "./util";
import weather from "./weather";
import arena from "./yokohama-arena";
import nissan from "./nissan-stadium";
import twitterClient from "./twitter-client";

module.exports.handler = function(_event, _context){
  co(function *(){

    const events = yield {
      arena: arena.getMajorEvents(),
      nissan: nissan.getEvents()
    };
    const events_today = [];
    for(let where in events){
      for(let event of events[where]){
        if(event.date.isToday()){
          events_today.push(event);
        }
      }
    }

    let tweetText = "";
    if(events_today.length < 1){
      tweetText = `新横浜 ${new Date().toFormat("M月D日")} 本日は特に何もありません`;
    }
    else{
      let msgs = [ `新横浜 ${new Date().toFormat("M月D日")}のイベントは` ];
      msgs = msgs.concat(
        events_today.map((event) => {
          let text = `${event.where} : ${event.title}`;
          if(event.note) text += " " + event.note;
          return text;
        })
      );
      tweetText = msgs.join("\n");
    }
    debug(tweetText);
    const [tweet, forecast] = yield [
      twitterClient.update({status: tweetText}),
      weather.getForecast()
    ];

    tweetText = `${new Date().toFormat("M月D日")}の天気は ${forecast}`
    yield twitterClient.update({
      status: tweetText,
      in_reply_to_status_id: tweet.id
    });

    if(_context) _context.done(null, "done");
  }).catch((err) => {
    console.error(err.stack || err);
    if(_context) _context.fail('failed');
  });
}
