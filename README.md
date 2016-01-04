# neoyokohama-bot

- https://twitter.com/neoyokohama
- https://github.com/shokai/neoyokohama-bot

[![Circle CI](https://circleci.com/gh/shokai/neoyokohama-bot.svg?style=svg)](https://circleci.com/gh/shokai/neoyokohama-bot)


## Setup

    % npm install

### twitter config

    % cp sample.env .env

edit `.env` file


## Run

    % npm run build
    # or
    % npm run watch

    % npm start

### Dry Run

    % DRY=true npm start

## Deploy to AWS Lambda

    % npm run zip

generate `bundle.zip`


## Note

- [橋本商会 » 新横浜Twitter botをAWS Lambdaとcoで作った](http://shokai.org/blog/archives/10465)
