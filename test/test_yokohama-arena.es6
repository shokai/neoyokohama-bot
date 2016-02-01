/* global it describe */
"use strict";

import "./test_helper";
import {assert} from "chai";
import arena from "../src/yokohama-arena";
import Event from "../src/event";

describe("crawler YokohamaArena", function(){

  it("should have method \"getMajorEvents\"", function(){
    assert.isFunction(arena.getMajorEvents);
  });

  describe("method \"getMajorEvent\"", function(){

    it("should return Event Array", function(){
      this.timeout(10000);
      return arena
        .getMajorEvents()
        .then((events) => {
          assert.isArray(events);
          for(let event of events){
            assert.innstanceOf(event, Event);
          }
        });

    });
  });

});
