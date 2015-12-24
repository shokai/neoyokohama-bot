"use strict";

import helper from "./test_helper";
import assert from "assert";
import NissanStadium from "../src/nissan-stadium";
import Event from "../src/event";


describe("crawler NissanStadium", function(){

  const nissan = new NissanStadium();

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
