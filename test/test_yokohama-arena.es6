"use strict";

import "./test_helper";
import assert from "assert";
import YokohamaArena from "../src/yokohama-arena";
import Event from "../src/event";

describe("crawler YokohamaArena", function(){

  const arena = new YokohamaArena();

  it("should have method \"getTodayEvent\"", function(){
    assert.equal(typeof arena["getTodayEvent"], "function");
  });

  describe("method \"getTodayEvent\"", function(){

    it("should return event", function(done){
      this.timeout(10000);
      arena
        .getTodayEvent()
        .then((event) => {
          assert.equal(event instanceof Event, true);
          done();
        });

    });
  });

});
