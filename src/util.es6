"use strict";

export default {
  isScheduleToday: function(schedule){
    const today = new Date();
    return today.getFullYear() === schedule.year &&
      today.getMonth()+1 === schedule.month &&
      today.getDate() === schedule.date;
  }
}
