"use strict";

import co from "co";
import request from "superagent";
import cheerio from "cheerio";
const debug = require("debug")("bot:weather");

export default new class Weather{

  constructor(){
    this.url = "http://www.jma.go.jp/jp/yoho/320.html";

    this.getForecast = co.wrap(function *(){
      const html = yield this.getHtml();
      return this.parseHtml(html);
    });
  }

  getHtml(){
    debug(`get ${this.url}`);
    return new Promise((resolve, reject) => {
      request
        .get(this.url)
        .end((err, res) =>{
          if(err) return reject(err);
          return resolve(res.text);
        });
    });
  }

  parseHtml(html){
    const $ = cheerio.load(html);
    return $("table.forecast td").eq(0).text();
  }

}


if(process.argv[1] === __filename){
  const weather = new Weather();
  co(function *(){
    const forecast = yield weather.getForecast();
    console.log(forecast);
  });
}
