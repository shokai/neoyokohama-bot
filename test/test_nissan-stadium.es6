/* global it describe */
"use strict";

import "./test_helper";
import {assert} from "chai";
import nissan from "../src/nissan-stadium";
import Event from "../src/event";


describe("crawler NissanStadium", function(){

  it("should have method \"getMajorEvents\"", function(){
    assert.isFunction(nissan.getMajorEvents);
  });

  describe("method \"getMajorEvents\"", function(){

    it("should return Event Array", function(){
      this.timeout(10000);
      return nissan
        .getMajorEvents()
        .then((events) => {
          assert.isArray(events);
          for(let event of events){
            assert.instanceOf(event, Event);
          }
        });
    });

  });

});
