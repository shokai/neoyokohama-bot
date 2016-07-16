import axios from "axios";
import cheerio from "cheerio";
import Event from "./event";
const debug = require("debug")("bot:yokohama-arena");

class YokohamaArena{

  constructor(){
    this.url = "https://www.yokohama-arena.co.jp"
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

  parseHtml (html) {
    const $ = cheerio.load(html);
    const lis = $('.event_scheduleArea li');
    const events = []
    lis.each((i, el) => {
      let event = new Event()
      let $ = cheerio.load(el);
      event.title = $('strong').text().trim();
      if (!event.title) throw new Error('cannot get title');
      event.where = '横浜アリーナ';
      let [, year, month, date] = $('.date-display-single').text().match(/(\d{4})\.(\d{2})\.(\d{2})/) || [];
      if (!year || !month || !date) throw new Error('cannot get Date');
      event.date = new Date(year, month - 1, date);
      let [, openAt] = $('p').text().match(/開場：([^\s]+)/m) || [];
      if (openAt) event.note += `開場${openAt}`
      let [, startAt] = $('p').text().match(/開演：([^\s]+)/m) || [];
      if (startAt) event.note += ` 開演${startAt}`
      events.push(event);
      debug(event);
    })
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
