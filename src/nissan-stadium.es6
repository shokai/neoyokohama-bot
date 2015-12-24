"use strict";

import co from "co";
import request from "superagent";
import cheerio from "cheerio"
const debug = require("debug")("bot:nissan-stadium");

export default class NissanStadium{

  constructor(){
    this.url = "http://www.nissan-stadium.jp/calendar/index.php";

    this.getSchedules = co.wrap(function *(){
      const html = yield this.getHtml();
      const schedules = this.parseHtml(html);
      debug(schedules);
      return schedules;
    });

    this.getMajorSchedules = co.wrap(function *(){
      const schedules = yield this.getSchedules();
      return schedules.filter((i) => { return /(スタジアム|競技場)/.test(i.where) });
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
    const schedules = [];
    let date, title;
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
          let _date = new Date(0);
          _date.setYear(year);
          _date.setMonth(month - 1);
          _date.setDate(date);
          let schedule = {
            title: title,
            where: where,
            date: _date
          };
          debug(schedule);
          schedules.push(schedule);
          title = null;
        }
        break;
      }
    });
    return schedules;
  }

}

if(process.argv[1] === __filename){
  const nissan = new NissanStadium();
  co(function *(){
    console.log(yield nissan.getSchedules());
  }).catch((err) => {
    console.error(err.stack);
  });
}
