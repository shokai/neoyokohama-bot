"use strict";

Date.prototype.isToday = function(){
  const today = new Date();
  return this.getYear() === today.getYear() &&
    this.getMonth() === today.getMonth() &&
    this.getDate() === today.getDate();
};

export default {
  isScheduleToday: function(schedule){
    const today = new Date();
    return today.getFullYear() === schedule.year &&
      today.getMonth()+1 === schedule.month &&
      today.getDate() === schedule.date;
  }
}
