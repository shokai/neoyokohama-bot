"use strict";

import "./test_helper";
import assert from "assert";
import arena from "../src/yokohama-arena";
import Event from "../src/event";

describe("crawler YokohamaArena", function(){

  it("should have method \"getMajorEvents\"", function(){
    assert.equal(typeof arena["getMajorEvents"], "function");
  });

  describe("method \"getMajorEvent\"", function(){

    it("should return Event Array", function(){
      this.timeout(10000);
      return arena
        .getMajorEvents()
        .then((events) => {
          assert.equal(events instanceof Array, true);
          assert.equal(events[0] instanceof Event, true);
        });

    });
  });

});
