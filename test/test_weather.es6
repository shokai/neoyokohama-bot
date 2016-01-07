"use strict";

import "./test_helper";
import assert from "assert";
import weather from "../src/weather";

describe("crawler Weather", function(){

  if("should have method \"getForecast\"", function(){
    assert.equal(typeof weather["getForecast"], "function");
  });

  describe("method \"getForecast\"", function(){

    it("should return forecast", function(done){
      this.timeout(10000);
      weather
        .getForecast()
        .then((forecast) => {
          assert.equal(typeof forecast.text, "string");
          assert.equal(typeof forecast.temperature.high, "number");
          assert.equal(typeof forecast.temperature.low, "number");
          assert.equal(forecast.temperature.high >= forecast.temperature.low, true);
          done();
        });
    });

  });
});
