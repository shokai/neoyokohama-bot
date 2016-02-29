export default class Event{
  constructor(params){
    this.title = "";
    this.where = "";
    this.date = new Date();
    this.note = "";
    this.set(params);
  }

  set(params){
    if(!params) return;
    if(params.title){
      if(typeof params.title !== "string") throw "invalid title";
      this.title = params.title;
    }
    if(params.where){
      if(typeof params.where !== "string") throw "invalid place name";
      this.where = params.where;
    }
    if(params.date){
      if(!(params.date instanceof Date)) throw "invalid date";
      this.date = params.date;
    }
    if(params.note){
      if(typeof params.note !== "string") throw "invalid note";
      this.note = params.note;
    }
  }
}
