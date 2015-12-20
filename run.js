"use strict";

if(!process.env.DEBUG) process.env.DEBUG = "bot*";

require("babel-register");
var bot = require("./src/main");
module.exports.handler = bot.handler;

if(process.argv[1] === __filename){
  bot.handler();
}
