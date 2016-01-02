"use strict";

import co from "co";
import request from "superagent";
import cheerio from "cheerio";
import Event from "./event";
const debug = require("debug")("bot:yokohama-arena");

class YokohamaArena{

  constructor(){
    this.url = "http://www.yokohama-arena.co.jp/event/"
  }

  getEvents(){
    return co.wrap(function *(){
      const html = yield this.getHtml();
      const events = this.parseHtml(html);
      return events;
    }).call(this);
  }

  getMajorEvents(){
    return co.wrap(function *(){
      const events = yield this.getEvents();
      return events.filter((i) => { return !(/設営日/.test(i.title)) });
    }).call(this);
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
    const year = $(".year").eq(0).text() - 0;
    debug(year);
    const month = $(".month").eq(0).text() - 0;
    const tds = $("table#event-cal td");
    const events = [];
    let date;
    tds.each((i, el) => {
      switch(i % 6){
      case 0:
        date = Number.parseInt($(el).text());
        break;
      case 1:
        let title;
        if(title = $(el).text().trim()){
          let event = new Event({
            title: title,
            where: "横浜アリーナ"
          });
          event.date.setYear(year);
          event.date.setMonth(month - 1);
          event.date.setDate(date);
          debug(event);
          events.push(event);
          title = null;
        }
        break;
      case 2:
        break;
      case 3:
        break;
      }
    });
    return events;
  }

};

export default new YokohamaArena;

if(process.argv[1] === __filename){
  const arena = new YokohamaArena();
  co(function *(){
    console.log(yield arena.getMajorEvents());
  }).catch((err) => {
    console.error(err.stack || err)
  });
}
