"use strict";

import co from "co";
import superagent from "superagent";
import cheerio from "cheerio";
const debug = require("debug")("bot:weather");

class Weather{

  constructor(){
    this.url = "http://www.jma.go.jp/jp/yoho/320.html";
  }

  getForecast(){
    return co.wrap(function *(){
      const html = yield this.getHtml();
      const forecast = this.parseHtml(html);
      debug(forecast);
      return forecast;
    }).call(this);
  }

  getHtml(){
    debug(`get ${this.url}`);
    return new Promise((resolve, reject) => {
      superagent
        .get(this.url)
        .end((err, res) =>{
          if(err) return reject(err);
          return resolve(res.text);
        });
    });
  }

  parseHtml(html){
    const $ = cheerio.load(html, {decodeEntities: false});
    return $("table.forecast td.info").eq(0).html().replace(/(<br>|　)/g, ' ');
  }

}

export default new Weather;


if(process.argv[1] === __filename){
  const weather = new Weather();
  co(function *(){
    const forecast = yield weather.getForecast();
    console.log(forecast);
  }).catch(err => {
    console.error(err.stack || err);
  });
}
