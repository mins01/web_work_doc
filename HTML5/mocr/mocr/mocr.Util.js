"use strict";
if(!mocr){
  var mocr = {};
}

mocr.Util = function(mocr){
  var Util = {
    uint8ToHex:function(uint8) {
      return Array.prototype.map.call(uint8, x => ('0' + x.toString(16)).slice(-2)).join('');
    },
    uint8ToBin:function(uint8) {
      return Array.prototype.map.call(uint8, x => ('00000000' + x.toString(2)).slice(-8)).join('');
    },
  }
  return Util;
}(mocr)
