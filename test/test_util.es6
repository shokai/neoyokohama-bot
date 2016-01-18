/* global it describe */
"use strict";

import "./test_helper";
import assert from "assert";
import "../src/util";

describe("Date polyfill", function(){

  describe("Date.prototype.isToday()", function(){

    it("should return true if today", function(){
      const date = new Date();
      assert(date.isToday());
    });

    it("should return false if 1900", function(){
      var date = new Date(0);
      date.setYear(1900);
      assert.equal(date.isToday(), false);
    });
  });

});

describe("String polyfill", function(){

  describe("String.prototype.split140chars", function(){

    it("should split less than 140 chars", function(){
      const src = "新横浜 1月11日のイベントは\n横浜アリーナ : 平成28年「成人の日」を祝うつどい 開場09:40 13:40 開演10:30 14:30\nしんよこフットボールパーク : 第18回日産スタジアム杯少年サッカー大会\n日産スタジアム : 第6回イイコトチャレンジin日産スタジアム\n予想混雑度 : 11";
      const res = src.split140chars();
      assert(res instanceof Array);
      for(let line of res){
        assert(line.length <= 140);
      }
      assert.equal(res.join("\n"), src);
    });

  });

});
