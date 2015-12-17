"use strict";

import co from "co";
import request from "superagent";
import cheerio from "cheerio";
const debug = require("debug")("bot:yokohama-arena");

export default class YokohamaArena{

  constructor(){
    this.base_url = "http://www.yokohama-arena.co.jp"

    this.getSchedule = co.wrap(function *(){
      const html = yield this.getHtml();
      const schedule = this.parseHtml(html);
      debug(schedule);
      return schedule;
    });

    this.getToday = co.wrap(function *(){
      const schedule = yield this.getSchedule();
      if(this.isScheduleToday(schedule)){
        return schedule;
      }
      return null;
    });
  }

  getHtml(){
    return new Promise((resolve, reject) => {
      request
        .get(this.base_url)
        .end((err, res) => {
          if(err) return reject(err);
          return resolve(res.text);
        })
    });
  }

  parseHtml(html){
    const $ = cheerio.load(html);
    const year  = $("div#main-today .year").text() - 0;
    const month = $("div#main-today .month").text() - 0;
    const date  = $("div#main-today .day").text() - 0;
    const title = $("div#main-today h3").text();
    return {
      year: year,
      month: month,
      date: date,
      title: title
    };
  }

  isScheduleToday(schedule){
    const today = new Date();
    return today.getFullYear() === schedule.year &&
      today.getMonth() === schedule.month &&
      today.getDate() === schedule.date;
  }

};

if(process.argv[1] === __filename){
  const arena = new YokohamaArena();
  co(function *(){
    console.log(yield arena.getSchedule());
  }).catch(console.error);
}
