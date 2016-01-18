"use strict";

if(!process.env.DEBUG) process.env.DEBUG = "bot*,weather*";
process.env.TZ = "Asia/Tokyo";

module.exports.handler = require("./dist/main").handler;
