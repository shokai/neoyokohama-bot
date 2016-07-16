import axios from "axios";
import cheerio from "cheerio";
import Event from "./event";
const debug = require("debug")("bot:nissan-stadium");

class NissanStadium{

  constructor(){
    this.url = "http://www.nissan-stadium.jp/calendar/index.php";
  }

  async getEvents(){
    const html = await this.getHtml();
    return this.parseHtml(html);
  }

  async getMajorEvents(){
    const events = await this.getEvents();
    return events.filter((i) => { return /(スタジアム|競技場|フィールド)/.test(i.where) });
  }

  async getHtml(){
    debug(`get ${this.url}`);
    return (await axios.get(this.url)).data;
  }

  parseHtml(html){
    const $ = cheerio.load(html);
    const m = $("#areatitle01 h3").text().match(/(\d{4})年(\d?\d)月/);
    if(!m){
      throw new Error("cannot parse Year and Month");
    }
    const year  = m[1] - 0;
    const month = m[2] - 0;
    const trs = $("#areacontents01 table tr");
    const events = [];
    var date;
    trs.each((i, el) => {
      let $$ = cheerio.load(el);
      let _date = $$("th").eq(0).text() - 0;
      if(_date > 0) date = _date;
      let title = $$("td").eq(0).text().trim();
      let where = $$("td").eq(1).text().trim();
      if(title && where){
        let event = new Event({title, where});
        event.date = new Date(year, month-1, date);
        debug(event);
        events.push(event);
      }
    });
    return events;
  }

}

export default new NissanStadium;

if(process.argv[1] === __filename){
  const nissan = new NissanStadium();
  (async function(){
    console.log(await nissan.getEvents());
  })().catch((err) => {
    console.error(err.stack || err);
  });
}
