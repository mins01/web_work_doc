"use strict";
if(!mocr){
  var mocr = {};
}

mocr.LetterPackage = function(mocr){
  var LetterPackage = function(fontFamily,fontWeight){
    this.init(fontFamily,fontWeight);
  }
  LetterPackage.prototype = {
    mih:null,
    name:'', //외부에서 지정
    width:32,
    fontWidth:-1, //나중에 자동 설정
    fontFamily:'',
    fontWeight:'',
    letters:null,
    init:function(fontFamily,fontWeight){
      this.fontFamily = fontFamily;
      this.fontWeight = fontWeight;
      this.fontWidth = fontWidth;
      this.letters = [];
    },
    clear:function(){
      this.letters = [];
    },
    add:function(letter){
      this.letters.push(letter);
    },
    toJson:function(){
      var res = {
        width:this.width,
        letters:null
      }
      var arr = new Array(this.letters.length);
      for(var i=0,m=this.letters.length;i<m;i++){
        var obj = this.letters[i].toObj();
        delete obj.fontWidth;
        arr[i] = obj;
      }
      res.letters = arr;
      return JSON.stringify(arr,null,2);
    },
    search:function(letter,searchedCount){
      if(!searchedCount) searchedCount = 5;
      var searched = [];
      var df = null;
      for(var i=0,m=this.letters.length;i<m;i++){
        searched.push(this.letters[i].diffBin(letter));
      }
      searched.sort(function(a,b){
        return b.matched - a.matched
      })
      return searched.slice(0,10);
    }
  }
  return LetterPackage;
}(mocr);
