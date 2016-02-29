/* global it describe */

import "./test_helper";
import {assert} from "chai";
import twitter from "../src/twitter-client";

describe("Twitter Client", function(){

  it("should have method \"update\"", function(){
    assert.isFunction(twitter.update);
  });

  it("should have method \"search\"", function(){
    assert.isFunction(twitter.search);
  });

  it("should have method \"searchCongestion\"", function(){
    assert.isFunction(twitter.searchCongestion);
  });

  describe("method \"searchCongestion\"", function(){

    it("should return number", function(){
      this.timeout(10000);
      return twitter
        .searchCongestion("新横浜")
        .then((congestion) => {
          assert.isNumber(congestion);
        });
    });

  });
});
