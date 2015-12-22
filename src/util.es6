"use strict";

export default {
  isScheduleToday: function(schedule){
    const today = new Date();
    return today.getFullYear() === schedule.year &&
      today.getMonth()+1 === schedule.month &&
      today.getDate() === schedule.date;
  },

  getDateString: function(date = new Date()){
    return `${date.getMonth()+1}月${date.getDate()}日`;
  }
}
