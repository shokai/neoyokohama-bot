"use strict";

import helper from "./test_helper";
import assert from "assert";
import YokohamaArena from "../src/yokohama-arena";

describe("crawler YokohamaArena", function(){

  const arena = new YokohamaArena();

  it("should have method \"getTodaySchedule\"", function(){
    assert.equal(typeof arena["getTodaySchedule"], "function");
  });

  describe("method \"getTodaySchedule\"", function(){

    it("should return schedule", function(done){
      arena
        .getTodaySchedule()
        .then((schedule) => {
          assert.equal(typeof schedule.title, "string");
          assert.equal(typeof schedule.where, "string");
          assert.equal(typeof schedule.year, "number");
          assert.equal(typeof schedule.month, "number");
          assert.equal(typeof schedule.date, "number");
          done();
        });

    });
  });

});
