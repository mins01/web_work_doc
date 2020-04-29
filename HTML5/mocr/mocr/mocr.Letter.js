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
    width:-1,
    hex:"",
    init:function(){

    },
    toBin:function(){
      return mocr.ImageTool.hex2bin(this.hex);
    },
    toDot:function(){
      return mocr.ImageTool.dot4Bin(this.toBin(),this.width);
    },
    setObj:function(obj){
      this.letter=obj.letter;
      this.width=obj.width;
      this.hex=obj.hex;
    },
    toObj:function(){
      return {
        letter:this.letter,
        width:this.width,
        hex:this.hex,
      }
    },
    toString:function(){
      return this.toDot();
    }
    ,
    valueOf:function(){
      return this.toDot();
    }


  }
  return Letter;
}(mocr);
