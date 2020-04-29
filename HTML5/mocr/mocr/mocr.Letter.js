"use strict";
if(!mocr){
  var mocr = {};
}

mocr.Letter = function(mocr){
  var Letter = function(){
    this.init();
  }
  Letter.prototype = {
    letter:"",
    hex:"",
    width:-1,
    init:function(){

    },
    toBin:function(){
      return mocr.ImageTool.hex2bin(this.hex);
    },
    toDot:function(){
      return mocr.ImageTool.dot4Bin(this.toBin(),this.width);
    }
  }
  return Letter;
}(mocr);
