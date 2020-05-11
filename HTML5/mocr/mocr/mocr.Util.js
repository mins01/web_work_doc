"use strict";
if(!mocr){
  var mocr = {};
}

mocr.Util = function(mocr){
  var Util = {
    uint8ArrayToHex:function(uint8Arr) {
      return Array.prototype.map.call(uint8Arr, x => ('0' + x.toString(16)).slice(-2)).join('');
    },
    // unit8Array 에서
    bitSumForUint8Array:function(uint8Arr){
      var s = 0;
      var t = 0;
      for(var i=0,m=uint8Arr.length;i<m;i++){
        t = uint8Arr[i];
        while(t > 0){
          if((t & 1) == 1) s++;
          t = t>1
        }
      }
      return s;
    },
    uint8ArrayToBin:function(uint8Arr) {
      return Array.prototype.map.call(uint8Arr, x => ('00000000' + x.toString(2)).slice(-8)).join('');
    },
    intToBin:function(intV){
      return ('00000000' + Number(intV).toString(2)).slice(-8)
    },
    dotFromBins:function(w,bin1,bin2,bin3){
      var parr = new Array();
      bin1 = bin1.replace(/0/g,'-');
      var arr = bin1.split('');
      if(bin2){
        for(var i=0,m=bin2.length;i<m;i++){
          if(bin2[i]=='1') arr[i]='2'
        }
      }
      if(bin3){
        for(var i=0,m=bin3.length;i<m;i++){
          if(bin3[i]=='1') arr[i]='3'
        }
      }
      bin1 = arr.join('');
      for(var i=0,m=bin1.length;i<m;i+=w){
        parr.push(bin1.substr(i,w));
      }
      return parr.join("\n");
    },
  }
  return Util;
}(mocr)
