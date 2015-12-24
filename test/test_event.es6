"use strict";

import helper from "./test_helper";
import assert from "assert";
import Event from "../src/event";
import util from "../src/util";

describe("class Event", function(){

  const event = new Event({
    title: "party",
    where: "kazusuke",
    date: new Date()
  });

  it("should have title and where", function(){
    assert.equal(event.title, "party");
    assert.equal(event.where, "kazusuke")
  });

  it("should be today", function(){
    assert.equal(event.date.isToday(), true);
  });
});
