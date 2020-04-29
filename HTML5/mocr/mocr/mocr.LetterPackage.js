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
    width:16,
    letters:null,
    init:function(){
      this.width = 16;
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
        delete obj.width;
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
      return searched;
    }
  }
  return LetterPackage;
}(mocr);
