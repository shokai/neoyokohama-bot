"use strict";

export default class Event{
  constructor(params){
    this._date = new Date();
    if(!params) return;
    if(params.title) this.title = params.title;
    if(params.where) this.where = params.where;
    if(params.date) this.date = params.date;
  }

  set title(title){
    if(typeof title !== "string") throw "invalid title";
    this._title = title;
  }

  get title(){
    return this._title;
  }

  set date(date){
    if(!(date instanceof Date)) throw "invalid date";
    this._date = date;
  }

  get date(){
    return this._date;
  }

  set where(where){
    if(typeof where !== "string") throw "invalid place name";
    this._where = where;
  }

  get where(){
    return this._where;
  }
}
