/* eslint-env mocha */

import "./helper";
import {assert} from "chai";
import arena from "../src/yokohama-arena";
import Event from "../src/event";

describe("crawler YokohamaArena", function(){

  it("should have method \"getMajorEvents\"", function(){
    assert.isFunction(arena.getMajorEvents);
  });

  describe("method \"getMajorEvent\"", function(){

    it("should return Event Array", async function () {
      this.timeout(10000);
      const events = await arena.getMajorEvents()
      assert.isArray(events);
      for(let event of events){
        assert.instanceOf(event, Event);
      }
    });
  });

});
