"use strict";

import co from "co";
import request from "superagent";
import cheerio from "cheerio";
import Event from "./event";
const debug = require("debug")("bot:yokohama-arena");

export default class YokohamaArena{

  constructor(){
    this.url = "http://www.yokohama-arena.co.jp"

    this.getTodayEvent = co.wrap(function *(){
      const html = yield this.getHtml();
      const event = this.parseHtml(html);
      debug(event);
      return event;
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
    const title = $("div#main-today h3").text();
    let event = new Event({title: title, where: "横浜アリーナ"});
    event.date.setYear($("div#main-today .year").text() - 0);
    event.date.setMonth($("div#main-today .month").text() - 1);
    event.date.setDate($("div#main-today .day").text() - 0);
    return event;
  }

};

if(process.argv[1] === __filename){
  const arena = new YokohamaArena();
  co(function *(){
    console.log(yield arena.getTodayEvent());
  }).catch((err) => {
    console.error(err.stack)
  });
}
