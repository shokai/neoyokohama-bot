# shinyokohama-bot

- https://github.com/shokai/shinyokohama-bot

[![Circle CI](https://circleci.com/gh/shokai/shinyokohama-bot.svg?style=svg)](https://circleci.com/gh/shokai/shinyokohama-bot)


## Setup

    % npm install

### twitter config

    % cp sample.env .env

edit `.env` file


## Run

    % npm run build
    # or
    % npm run watch

    % DEBUG=bot* node run.js


## Deploy to AWS Lambda

    % npm run zip

generate `bundle.zip`

