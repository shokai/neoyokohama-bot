"use strict";

require("babel-polyfill");
require("date-utils");
const debug = require("debug")("bot");
import co from "co";

import util from "./util"
import YokohamaArena from "./yokohama-arena"
const arena = new YokohamaArena();
import NissanStadium from "./nissan-stadium"
const nissan = new NissanStadium();
import twitterClient from "./twitter-client"

module.exports.handler = function(_event, _context){
  co(function *(){

    const schedules = yield {
      arena: [arena.getTodaySchedule()],
      nissan: nissan.getMajorSchedules()
    };
    const events_today = [];
    for(let where in schedules){
      for(let schedule of schedules[where]){
        if(util.isScheduleToday(schedule)){
          events_today.push(schedule);
        }
      }
    }

    let tweetText;
    if(events_today.length < 1){
      tweetText = `新横浜 ${new Date().toFormat("MM月DD日")} 本日は特に何もありません`;
    }
    else{
      let msgs = [ `新横浜 ${new Date().toFormat("MM月DD日")}のイベントは` ];
      msgs = msgs.concat(
        events_today.map((event) => { return `${event.where} : ${event.title}`})
      );
      tweetText = msgs.join("\n");
    }
    debug(tweetText);
    const result = yield twitterClient.update(tweetText);
    console.log(result);
    if(_context) _context.done(null, "done");
  }).catch((err) => {
    console.error(err.stack || err);
    if(_context) _context.fail('failed');
  });
}

if(process.argv[1] === __filename){
  module.exports.handler();
}
