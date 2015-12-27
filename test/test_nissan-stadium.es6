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

    it("should return Event Array", function(done){
      this.timeout(10000);
      nissan
        .getMajorEvents()
        .then((events) => {
          assert.equal(events instanceof Array, true);
          assert.equal(events[0] instanceof Event, true);
          done();
        });

    });
  });

});
