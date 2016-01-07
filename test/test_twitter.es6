"use strict";

import "./test_helper";
import assert from "assert";
import twitter from "../src/twitter-client";

describe("Twitter Client", function(){

  it("should have method \"update\"", function(){
    assert.equal(typeof twitter["update"], "function");
  });

  it("should have method \"search\"", function(){
    assert.equal(typeof twitter["search"], "function");
  });

  it("should have method \"searchCongestion\"", function(){
    assert.equal(typeof twitter["searchCongestion"], "function");
  });

  describe("method \"searchCongestion\"", function(){

    it("should return number", function(){
      this.timeout(10000);
      return twitter
        .searchCongestion("新横浜")
        .then((congestion) => {
          assert.equal(typeof congestion, "number");
        });
    });

  });
});
