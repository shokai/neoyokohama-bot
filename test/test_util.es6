"use strict";

import helper from "./test_helper";
import assert from "assert";
import util from "../src/util";

describe("Date polyfill", function(){

  describe("Date.prototype.isToday()", function(){

    it("should return true if today", function(){
      const date = new Date();
      assert.equal(date.isToday(), true);
    });

    it("should return false if 1900", function(){
      let date = new Date();
      date.setYear(1900);
      assert.equal(date.isToday(), false);
    });
  });

});
