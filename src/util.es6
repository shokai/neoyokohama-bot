/* global Promise */

Date.prototype.isToday = function(){
  const today = new Date();
  return this.getYear() === today.getYear() &&
    this.getMonth() === today.getMonth() &&
    this.getDate() === today.getDate();
};

Date.prototype.getDayJP = function(){
  return "日月火水木金土"[this.getDay()];
};

String.prototype.split140chars = function(){
  const results = [ "" ];
  for(let line of this.split(/[\r\n]/)){
    if(results[0].length + line.length + 1 > 140){
      results.unshift("");
    }
    if(results[0].length > 0) results[0] += "\n";
    results[0] += line;
  }
  return results.reverse();
};

export default {
  delay: function(msec){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, msec);
    });
  }
}
