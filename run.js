"use strict";

require("babel-register");
var bot = require("./src/main");
module.exports.handler = bot.handler;

if(process.argv[1] === __filename){
  bot.handler();
}
