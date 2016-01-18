"use strict";

import co from "co";
import superagent from "superagent";
import cheerio from "cheerio";
import Event from "./event";
const debug = require("debug")("bot:nissan-stadium");

class NissanStadium{

  constructor(){
    this.url = "http://www.nissan-stadium.jp/calendar/index.php";
  }

  getEvents(){
    return co.wrap(function *(){
      const html = yield this.getHtml();
      return this.parseHtml(html);
    }).call(this);
  }

  getMajorEvents(){
    return co.wrap(function *(){
      const events = yield this.getEvents();
      return events.filter((i) => { return /(スタジアム|競技場)/.test(i.where) });
    }).call(this);
  }

  getHtml(){
    debug(`get ${this.url}`);
    return new Promise((resolve, reject) => {
      superagent
        .get(this.url)
        .end((err, res) => {
          if(err) return reject(err);
          return resolve(res.text);
        });
    });
  }

  parseHtml(html){
    const $ = cheerio.load(html);
    const m = $("#areatitle01 h3").text().match(/(\d{4})年(\d?\d)月/);
    if(!m){
      return null;
    }
    const year  = m[1] - 0;
    const month = m[2] - 0;
    const tds = $("#areacontents01 table td");
    const events = [];
    var date, title;
    tds.each((i, el) => {
      switch(i % 4){
      case 0:
        date = ($(el).text() || date) - 0;
        break;
      case 2:
        title = $(el).text().trim() || null;
        break;
      case 3:
        let where = $(el).text().trim() || null;
        if(title){
          let event = new Event({
            title: title,
            where: where
          });
          event.date.setYear(year);
          event.date.setMonth(month - 1);
          event.date.setDate(date);
          debug(event);
          events.push(event);
          title = null;
        }
        break;
      }
    });
    return events;
  }

}

export default new NissanStadium;

if(process.argv[1] === __filename){
  const nissan = new NissanStadium();
  co(function *(){
    console.log(yield nissan.getEvents());
  }).catch((err) => {
    console.error(err.stack);
  });
}
