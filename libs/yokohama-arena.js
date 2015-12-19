"use strict";

import co from "co";
import request from "superagent";
import cheerio from "cheerio";
const debug = require("debug")("bot:yokohama-arena");

export default class YokohamaArena{

  constructor(){
    this.url = "http://www.yokohama-arena.co.jp"

    this.getScheduleToday = co.wrap(function *(){
      const html = yield this.getHtml();
      const schedule = this.parseHtml(html);
      debug(schedule);
      return schedule;
    });
  }

  getHtml(){
    debug(`get ${this.url}`);
    return new Promise((resolve, reject) => {
      request
        .get(this.url)
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
      title: title,
      where: "横浜アリーナ"
    };
  }

};

if(process.argv[1] === __filename){
  const arena = new YokohamaArena();
  co(function *(){
    console.log(yield arena.getSchedule());
  }).catch((err) => {
    console.error(err.stack)
  });
}
