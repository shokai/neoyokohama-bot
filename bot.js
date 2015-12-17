"use strict";

import co from "co";

import YokohamaArena from "./libs/yokohama-arena"
const arena = new YokohamaArena();

co(function *(){

  const schedules = yield {arena: arena.getToday()};
  console.log(schedules);

}).catch(console.error);
