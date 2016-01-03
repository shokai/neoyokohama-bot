"use strict";

if(!process.env.DEBUG) process.env.DEBUG = "bot*";
process.env.TZ = "Asia/Tokyo";

module.exports.handler = require("./dist/main").handler;
