"use strict";

Date.prototype.isToday = function(){
  const today = new Date();
  return this.getYear() === today.getYear() &&
    this.getMonth() === today.getMonth() &&
    this.getDate() === today.getDate();
};

export default {

}
