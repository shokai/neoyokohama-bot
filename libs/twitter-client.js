"use strict";

require("dotenv").load({silent: true});
const debug = require("debug")("bot:twitter-client");
import Twitter from "twitter";

const client = new Twitter({
  consumer_key:        process.env.CONSUMER_KEY,
  consumer_secret:     process.env.CONSUMER_SECRET,
  access_token_key:    process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

export default {

  client: client,

  update: function(text){
    debug(`update tweet "${text}"`);
    return new Promise((resolve, reject) => {
      client.post("statuses/update", {status: text}, (err, tweet, response) => {
        if(err) return reject(err);
        return resolve(tweet);
      });
    });
  }

}

if(process.argv[1] === __filename){
  client.post("statuses/update", {status: "test"}, (err, tweet, response) => {
    if(err) return cosnole.error(err);
    console.log(tweet);
  });
}
