"use strict";

import co from "co";

import util from "./libs/util"
import YokohamaArena from "./libs/yokohama-arena"
const arena = new YokohamaArena();
import NissanStadium from "./libs/nissan-stadium"
const nissan = new NissanStadium();


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
  console.log(events_today);

}).catch(console.error);
