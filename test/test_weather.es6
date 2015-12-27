"use strict";

import "./test_helper";
import assert from "assert";
import weather from "../src/weather";

describe("crawler Weather", function(){

  if("should have method \"getForecast\"", function(){
    assert.equal(typeof weather["getForecast"], "function");
  });

  describe("method \"getForecast\"", function(){

    it("should return string", function(done){
      this.timeout(10000);
      weather
        .getForecast()
        .then((forecast) => {
          assert.equal(typeof forecast, "string");
          done();
        });
    });

  });
});