"use strict";

import co from "co";

import YokohamaArena from "./libs/yokohama-arena"
const arena = new YokohamaArena();
import util from "./libs/util"

co(function *(){

  const schedules = yield {arena: arena.getSchedule()};
  for(let where in schedules){
    let schedule = schedules[where];
    if(util.isScheduleToday(schedule)){
      console.log(`${where} is today`);
    }
    else{
      console.log(`${where} is not today`);
    }
    console.log(schedule);
  }

}).catch(console.error);
