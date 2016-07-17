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
    const [arenaEvents, nissanEvents, twitterCongestion, weather] = await Promise.all([
      arena.getMajorEvents(),
      nissan.getEvents(),
      twitterClient.searchCongestion("新横浜"),
      forecast.get("横浜")
    ]);
    const events_today = [...arenaEvents, ...nissanEvents].filter(event => event.date.isToday())

    var today = new Date();
    var tweetText = `新横浜 ${today.toFormat("M/D")}(${today.getDayJP()}) ${weather.today.text} 気温${weather.today.temperature.low}度〜${weather.today.temperature.high}度`;
    if(events_today.length < 1){
      tweetText += `\n本日は特に何もありません`;
    }
    else{
      let msgs = [ `本日のイベントは` ];
      msgs = msgs.concat(
        events_today.map(event => {
          let text = `${event.where} ${event.title}`.trim();
          if(event.note) text += " " + event.note;
          return text;
        })
      );
      tweetText += "\n" + msgs.join("\n");
    }
    tweetText += `\n予想混雑度 ${twitterCongestion}`

    debug(tweetText);
    const res = await Promise.all(
      tweetText.split140chars().map(status => twitterClient.update({status}))
    );

    console.log(res);

    if(_context) _context.done(null, "done");
  })().catch(err => {
    console.error(err.stack || err);
    if(_context) _context.fail('failed');
  });
}
