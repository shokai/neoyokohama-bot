/* eslint-env mocha */

import "./helper";
import {assert} from "chai";
import nissan from "../src/nissan-stadium";
import Event from "../src/event";


describe("crawler NissanStadium", function(){

  it("should have method \"getMajorEvents\"", function(){
    assert.isFunction(nissan.getMajorEvents);
  });

  describe("method \"getMajorEvents\"", function(){

    it("should return Event Array", async () => {
      this.timeout(10000);
      const events = await nissan.getMajorEvents();
      assert.isArray(events);
      for(let event of events){
        assert.instanceOf(event, Event);
      }
    });

  });

});
