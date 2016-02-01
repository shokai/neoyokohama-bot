/* global it describe */
"use strict";

import "./test_helper";
import {assert} from "chai";
import Event from "../src/event";
import "../src/util";

describe("class Event", function(){

  const event = new Event({
    title: "party",
    where: "kazusuke",
    note: "酒池肉林",
    date: new Date()
  });

  it("should have title, where and note", function(){
    assert.equal(event.title, "party");
    assert.equal(event.where, "kazusuke");
    assert.equal(event.note, "酒池肉林");
  });

  it("should be today", function(){
    assert(event.date.isToday());
  });
});
