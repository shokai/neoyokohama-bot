import "babel-polyfill";
import "date-utils";
const debug = require("debug")("bot");
import {forecast} from "weather-yahoo-jp";

import "./util";
import arena from "./yokohama-arena";
import nissan from "./nissan-stadium";
import twitterClient from "./twitter-client";

module.exports.handler = function(_event, _context){
  (async function(){
    const data = {
      events: {
        arena: await arena.getMajorEvents(),
        nissan: await nissan.getEvents()
      },
      twitter: {
        congestion: await twitterClient.searchCongestion("新横浜")
      },
      forecast: await forecast.get("横浜")
    };
    const events_today = [];
    for(let where in data.events){
      for(let event of data.events[where]){
        if(event.date.isToday()){
          events_today.push(event);
        }
      }
    }

    var today = new Date();
    var tweetText = `新横浜 ${today.toFormat("M/D")}(${today.getDayJP()}) ${data.forecast.today.text} 気温${data.forecast.today.temperature.low}度〜${data.forecast.today.temperature.high}度`;
    if(events_today.length < 1){
      tweetText += `\n本日は特に何もありません`;
    }
    else{
      let msgs = [ `本日のイベントは` ];
      msgs = msgs.concat(
        events_today.map((event) => {
          let text = `${event.where} ${event.title}`.trim();
          if(event.note) text += " " + event.note;
          return text;
        })
      );
      tweetText += "\n" + msgs.join("\n");
    }
    tweetText += `\n予想混雑度 ${data.twitter.congestion}`

    debug(tweetText);
    const res = await Promise.all(
      tweetText.split140chars().map((status) => {
        return twitterClient.update({status: status});
      })
    );

    console.log(res);

    if(_context) _context.done(null, "done");
  })().catch((err) => {
    console.error(err.stack || err);
    if(_context) _context.fail('failed');
  });
}
