require("dotenv").load({silent: true});
const debug = require("debug")("bot:twitter-client");
import Twitter from "twitter";

const client = new Twitter({
  consumer_key:        process.env.CONSUMER_KEY,
  consumer_secret:     process.env.CONSUMER_SECRET,
  access_token_key:    process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const ignoreUsers = [
    /yokohama/i,
    /sh?inyoko/i,
    /sh?inkansen/i,
    /railway/i,
    /kikuna/i,
    /bot/i,
    /deli/i,
    /kanto/i,
    /新横浜/,
    /新幹線/
];

export default {

  client: client,

  update: function(params){
    debug(`update tweet "${params.status}" (${params.status.length} chars)`);
    return new Promise((resolve, reject) => {
      if(process.env.DRY) return resolve("dry-run");
      client.post("statuses/update", params, (err, tweet, res) => {
        if(err) return reject(err);
        debug(`update: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
        return resolve(tweet);
      });
    });
  },

  search: function(params){
    debug(`search tweets by word "${params.q}"`);
    return new Promise((resolve, reject) => {
      if(!params.q) return reject("invalid query");
      client.get("search/tweets", params, (err, tweets, res) =>{
        if(err) return reject(err);
        debug(`${tweets.statuses.length} tweets found`);
        return resolve(tweets);
      })
    });
  },

  searchCongestion: async function(word){
    debug(`search congestion: ${word}`);
    const tweets = await this.search({
      q: word,
      count: 100,
      include_entities: false
    });
    const now = new Date();
    const congestion = tweets.statuses.filter((tw) => {
      for(let ignore of ignoreUsers){
        if(ignore.test(tw.user.screen_name)) return false;
        if(ignore.test(tw.user.name)) return false;
      }
      return (now - Date.parse(tw.created_at))/1000 < 60*60;
    }).length;
    debug(`congestion: ${congestion}`);
    return congestion;
  }

}
