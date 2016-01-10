/* global it describe */
"use strict";

import "./test_helper";
import assert from "assert";
import nissan from "../src/nissan-stadium";
import Event from "../src/event";


describe("crawler NissanStadium", function(){

  it("should have method \"getMajorEvents\"", function(){
    assert.equal(typeof nissan["getMajorEvents"], "function");
  });

  describe("method \"getMajorEvents\"", function(){

    it("should return Event Array", function(){
      this.timeout(10000);
      return nissan
        .getMajorEvents()
        .then((events) => {
          assert(events instanceof Array);
          assert(events[0] instanceof Event);
        });
    });

  });

});
