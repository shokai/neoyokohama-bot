"use strict";

if(!process.env.DEBUG) process.env.DEBUG = "bot*";

var bot = require("./dist/main");
module.exports.handler = bot.handler;

if(process.argv[1] === __filename){
  bot.handler();
}
