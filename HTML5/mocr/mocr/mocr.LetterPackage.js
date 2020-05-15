"use strict";
if(!mocr){
  var mocr = {};
}

mocr.LetterPackage = function(mocr){
  var LetterPackage = function(fontFamily,fontWeight,width){
    this.init(fontFamily,fontWeight,width);
  }
  LetterPackage.prototype = {
    name:'', //외부에서 지정
    width:32,
    fontWidth:-1, //나중에 자동 설정
    fontFamily:'',
    fontWeight:'',
    letters:null,
    init:function(fontFamily,fontWeight,width){
      if(width === undefined) width = 32;
      this.name = "";
      this.width = width;
      this.fontFamily = fontFamily;
      this.fontWeight = fontWeight;
      this.letters = [];
    },
    loadFromObj:function(obj){
      this.name = obj.name;
      this.width = obj.width;
      this.fontFamily = obj.fontFamily;
      this.fontWeight = obj.fontWeight;
    },
    clear:function(){
      this.letters = [];
    },
    add:function(letter){
      letter.letterPackage = this;
      this.letters.push(letter);
    },

    toJson:function(){
      return JSON.stringify(this,null,1);
      var res = {
        fontFamily:this.fontFamily,
        fontWeight:this.fontWeight,
        width:this.width,
        letters:null
      }
      res.letters = new Array(this.letters.length);
      for(var i=0,m=this.letters.length;i<m;i++){
        var obj = this.letters[i].toObj();
        delete obj.fontWidth;
        res.letters[i] = obj;
      }
      return JSON.stringify(res,null,2);
    },
    search:function(letter,searchedCount){
      if(!searchedCount) searchedCount = 5;
      var searched = [];
      var diffRes = null;
      for(var i=0,m=this.letters.length;i<m;i++){
        if(letter.width != this.letters[i].width){ continue; } //글자 width 가 다르면 무시한다.
        if(Math.abs(letter.aspectRatio - this.letters[i].aspectRatio) > 0.2 ){ continue; } //글자 크기비율의 차이가 크면 무시한다
        diffRes = this.letters[i].diff(letter);
        if(diffRes.matched < 0.4){ continue; } //너무 차이가 크면 무시한다.
        searched.push(diffRes);
        if(searched.length > searchedCount){
          searched.sort(function(a,b){
            return b.matched - a.matched
          })
          searched = searched.slice(0,searchedCount);
        }
      }
      searched.sort(function(a,b){
        return b.matched - a.matched
      })
      return searched.slice(0,searchedCount);
    }
  }
  return LetterPackage;
}(mocr);
