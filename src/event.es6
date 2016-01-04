"use strict";

export default class Event{
  constructor(params){
    this.date = new Date();
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
  }
}
