"use strict";

const debug = require("debug")("bot");
import co from "co";

import util from "./libs/util"
import YokohamaArena from "./libs/yokohama-arena"
const arena = new YokohamaArena();
import NissanStadium from "./libs/nissan-stadium"
const nissan = new NissanStadium();
import twitterClient from "./libs/twitter-client";

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

  let msgs = [ "本日のイベントは" ];
  msgs = msgs.concat(
    events_today.map((event) => { return `${event.title}(${event.where})`})
  );
  const tweetText = msgs.join("\n");
  debug(tweetText);
  const result = yield twitterClient.update(tweetText);
  console.log(result);

}).catch(console.error);
