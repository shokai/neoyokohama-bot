import axios from "axios";
import cheerio from "cheerio";
import Event from "./event";
const debug = require("debug")("bot:yokohama-arena");

class YokohamaArena{

  constructor(){
    this.url = "http://www.yokohama-arena.co.jp/event/"
  }

  async getEvents(){
    const html = await this.getHtml();
    return this.parseHtml(html);
  }

  async getMajorEvents(){
    const events = await this.getEvents();
    return events.filter((i) => { return !(/設営日/.test(i.title)) });
  }

  async getHtml(){
    debug(`get ${this.url}`);
    return (await axios.get(this.url)).data;
  }

  parseHtml(html){
    const $ = cheerio.load(html, {decodeEntities: false});
    const year = parseInt($("#event-header .year").eq(0).text());
    const month = parseInt($("#event-header .month").eq(0).text());
    if(!year && !month) throw new Error("cannot get Year and Month");
    const tds = $("table#event-cal td");
    const events = [];
    var event;
    tds.each((i, el) => {
      switch(i % 6){
      case 0: {
        event = null;
        const date = parseInt($(el).text());
        if(!date) break;
        event = new Event();
        event.date = new Date(year, month - 1, date);
        break;
      }
      case 1: {
        if(!event) break;
        const title = $(el).text().trim();
        if(!title) break;
        event.set({title: title, where: "横浜アリーナ"});
        break;
      }
      case 2: {
        if(!event) break;
        const openAt = $(el).html().trim().replace(/<br>/g, " ");
        if(!openAt) break;
        event.note += `開場${openAt}`
        break;
      }
      case 3: {
        if(!event) break;
        const startAt = $(el).html().trim().replace(/<br>/g, " ");
        if(startAt){
          event.note += ` 開演${startAt}`
        }
        if(!event.title) break;
        events.push(event);
        debug(event);
        break;
      }
      }
    });
    return events;
  }

}

export default new YokohamaArena;

if(process.argv[1] === __filename){
  const arena = new YokohamaArena();
  (async function(){
    console.log(await arena.getMajorEvents());
  })().catch((err) => {
    console.error(err.stack || err)
  });
}
