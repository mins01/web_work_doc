"use strict";
if(!mocr){
  var mocr = {};
}

mocr.LetterPackage = function(mocr){
  var LetterPackage = function(){
    this.init();
  }
  LetterPackage.prototype = {
    mih:null,
    width:32,
    data:[],
    init:function(){
      this.mih = new mocr.ImageHandler();
    },
    "generate":function(){
      var stCode = '가'.codePointAt(0);
      var edCode = '힣'.codePointAt(0);
      // console.log(stCode,edCode);
      this.data = [];
      for(var i=stCode,m=stCode+10;i<=m;i++){
        var char = String.fromCodePoint(i);
        console.log(char,i);
        var letter = this.getLetter(char);
        console.log(letter.valueOf());
      }

    },
    getLetter:function(char){
      this.mih.loadFromChar(char);
      this.mih.simplify(this.width);
      return this.mih.getLetter();
    }
  }
  return LetterPackage;
}(mocr);
