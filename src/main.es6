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

function tweetEventInfo(){
  return co(function *(){
    const data = yield {
      events: {
        arena: arena.getMajorEvents(),
        nissan: nissan.getEvents()
      },
      twitter: {
        congestion: twitterClient.searchCongestion("新横浜")
      }
    };
    const events_today = [];
    for(let where in data.events){
      for(let event of data.events[where]){
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
    tweetText += `\n予想混雑度 : ${data.twitter.congestion}`
    debug(tweetText);
    return tweetText.split140chars().map((status) => {
      return twitterClient.update({status: status});
    });
  });
}

function tweetWeatherForecast(){
  return co(function *(){
    const forecast = yield weather.getForecast();
    let tweetText = `新横浜 ${new Date().toFormat("M月D日")}の天気は ${forecast.text} 気温${forecast.temperature.high}度〜${forecast.temperature.low}度`;
    return twitterClient.update({status: tweetText});
  });
}

module.exports.handler = function(_event, _context){
  co(function *(){
    const res = yield {
      event: tweetEventInfo(),
      weather: tweetWeatherForecast()
    };
    console.log(res);

    if(_context) _context.done(null, "done");
  }).catch((err) => {
    console.error(err.stack || err);
    if(_context) _context.fail('failed');
  });
}
