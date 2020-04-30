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
        fontFamily = 'Serif'; //serif
      }
      this.mih.loadFromChar(char,fontFamily,'bold');
      this.mih.simplify(this.width);
      var letter = this.mih.getLetter();
      letter.letter = char;
      $("#div_out").append("<div class='letter-width"+letter.width+"' style='font-family:"+fontFamily+";'>"+letter.letter+"</div><img title='"+letter.desc+"' src='"+this.mih.canvas.toDataURL()+"'>");
      return letter;
    },
    generate:function(){
      return new mocr.LetterPackage();
    },
    generate4Digit:function(mlp){
      this.addLetters(mlp,'0','9','Serif');
      this.addLetters(mlp,'0','9','Sans-Serif');
      this.addLetters(mlp,'0','9','Monospace');
    },
    generate4Alphabet:function(mlp){
      this.addLetters(mlp,'a','z','Serif');
      this.addLetters(mlp,'a','z','Sans-Serif');
      this.addLetters(mlp,'a','z','Monospace');
      this.addLetters(mlp,'A','Z','Serif');
      this.addLetters(mlp,'A','Z','Sans-Serif');
      this.addLetters(mlp,'A','Z','Monospace');
    },
    // Arial , serif , batang , Dotum
    addLetters:function(mlp,stChar,edChar,fontFamily){
      // var stCode = '가'.codePointAt(0);
      // var edCode = '힣'.codePointAt(0);
      // var stCode = '하'.codePointAt(0);
      // var edCode = '핳'.codePointAt(0);
      // var stCode = '0'.codePointAt(0);
      // var edCode = '9'.codePointAt(0);
      var stCode = stChar.codePointAt(0);
      var edCode = edChar.codePointAt(0);
      // console.log(stCode,edCode);
      for(var i=stCode,m=edCode;i<=m;i++){
        var char = String.fromCodePoint(i);
        // console.log(char,i);
        var letter = this.getLetter(char,fontFamily);
        mlp.add(letter);
      }
      return mlp;
    },

  }
  return LetterPackageGenerator;
}(mocr);
