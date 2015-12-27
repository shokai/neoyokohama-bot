"use strict";

import "./test_helper";
import assert from "assert";
import YokohamaArena from "../src/yokohama-arena";
import Event from "../src/event";

describe("crawler YokohamaArena", function(){

  const arena = new YokohamaArena();

  it("should have method \"getMajorEvents\"", function(){
    assert.equal(typeof arena["getMajorEvents"], "function");
  });

  describe("method \"getMajorEvent\"", function(){

    it("should return Event Array", function(done){
      this.timeout(10000);
      arena
        .getMajorEvents()
        .then((events) => {
          assert.equal(events instanceof Array, true);
          assert.equal(events[0] instanceof Event, true);
          done();
        });

    });
  });

});
