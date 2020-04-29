"use strict";
if(!mocr){
  var mocr = {};
}

mocr.LetterPackageGenerator = function(mocr){
  var LetterPackageGenerator = function(){
    this.init();
  }
  LetterPackageGenerator.prototype = {
    mih:null,
    width:32,
    data:[],
    init:function(){
      this.mih = new mocr.ImageHandler();
    },
    getLetter:function(char,fontFamily){
      if(!fontFamily){
        fontFamily = 'Arial'; //serif
      }
      this.mih.loadFromChar(char,fontFamily);
      this.mih.simplify(this.width);
      var letter = this.mih.getLetter();
      letter.letter = char;
      $("#div_out").append("<img src='"+this.mih.canvas.toDataURL()+"'>");
      return letter;
    },
    generate:function(){
      var mlp = new mocr.LetterPackage();
      var stCode = '가'.codePointAt(0);
      var edCode = '힣'.codePointAt(0);
      var stCode = '하'.codePointAt(0);
      var edCode = '핳'.codePointAt(0);
      var stCode = '0'.codePointAt(0);
      var edCode = '9'.codePointAt(0);
      // console.log(stCode,edCode);
      this.data = [];
      for(var i=stCode,m=edCode;i<=m;i++){
        var char = String.fromCodePoint(i);
        // console.log(char,i);
        var letter = this.getLetter(char,"Arial");
        mlp.add(letter);
        var letter = this.getLetter(char,"serif");
        mlp.add(letter);
        var letter = this.getLetter(char,"batang");
        mlp.add(letter);
        var letter = this.getLetter(char,"Dotum");
        mlp.add(letter);

      }
      return mlp;
    },

  }
  return LetterPackageGenerator;
}(mocr);
