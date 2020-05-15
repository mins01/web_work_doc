"use strict";
if(!mocr){
  var mocr = {};
}

mocr.Letter = function(mocr){
  var Letter = function(obj){
    this.init(obj);
  }
  Letter.prototype = {
    letter:"",
    width:-1,
    aspectRatio:null, // 글자의 너비/높이
    letterType:"",
    hex:"",
    uint8Arr:null,
    init:function(obj){
      this.uint8Arr = null;
      this.bgCount = -1;
      this.wgCount = -1;
      var _letterPackage = '';
      Object.defineProperty(this, 'letterPackage', {
    		value:null, //기본값 (get,set 과 같이 사용불가)
    		writable: true, //값 수정 가능여부 (get,set 과 같이 사용불가)
    		enumerable: false, //목록 열거시 표시여부
    		// configurable: true //삭제 가능여부. writable 속성 변경 가능 여부
    	});
      Object.defineProperty(this, 'uint8Arr', {
    		value:null, //기본값 (get,set 과 같이 사용불가)
    		writable: true, //값 수정 가능여부 (get,set 과 같이 사용불가)
    		enumerable: false, //목록 열거시 표시여부
    		// configurable: true //삭제 가능여부. writable 속성 변경 가능 여부
    	});
      Object.defineProperty(this, 'hex', {
        get:function(thisC){
          return function(){
            return mocr.Util.uint8ArrayToHex(thisC.uint8Arr);
          }
        }(this),
    		set:function(thisC){
    			return function(hex){
            thisC.uint8Arr = new Uint8Array(hex.length/2);
            for(var i=0,m=hex.length;i<m;i+=2){
              thisC.uint8Arr[i/2] = parseInt(hex.substr(i,2),16);
              // console.log(this.uint8Arr[i/2],hex.substr(i,2));
            }
    			}
    		}(this),
    		// value:null, //기본값 (get,set 과 같이 사용불가)
    		// writable: false, //값 수정 가능여부 (get,set 과 같이 사용불가)
    		enumerable: true, //목록 열거시 표시여부
    		// configurable: true //삭제 가능여부. writable 속성 변경 가능 여부
    	});
      if(obj){
        this.setObj(obj);
      }
    },
    toBin:function(){
      // return mocr.ImageTool.hex2bin(this.hex);
      return mocr.Util.uint8ArrayToBin(this.uint8Arr);

    },
    toDot:function(){
      return mocr.ImageTool.dot4Bin(this.toBin(),this.width);
    },
    setObj:function(obj){
      this.char = obj.char;
      this.width=obj.width;
      this.hex=obj.hex;
      if(obj.aspectRatio !== undefined) this.aspectRatio=obj.aspectRatio;
    },
    computeUInt8Array:function(hex){
      this.uint8Arr = new Uint8Array(hex.length/2);
      for(var i=0,m=hex.length;i<m;i+=2){
        this.uint8Arr[i/2] = parseInt(hex.substr(i,2),16);
        console.log(this.uint8Arr[i/2],hex.substr(i,2));
      }
    },
    toObj:function(){
      return {
        char:this.char,
        width:this.width,
        aspectRatio:this.aspectRatio,
        hex:this.hex,
      }
    },
    toString:function(){
      return this.toDot();
    },
    diff:function(to){
      var from = this;
      var fromUint8Arr = from.uint8Arr;
      var toUint8Arr = to.uint8Arr;
      var matchedUint8Arr = new Uint8Array(fromUint8Arr.length);
      var xorUint8Arr = new Uint8Array(fromUint8Arr.length);
      var fromMissedUint8Arr = new Uint8Array(fromUint8Arr.length);
      var toMissedUint8Arr = new Uint8Array(fromUint8Arr.length);
      var matchedScore = 0;
      var fromMissedScore = 0;
      var toMissedScore = 0;
      var t = 0;
      for(var i=0,m=fromUint8Arr.length;i<m;i++){
        matchedUint8Arr[i] = fromUint8Arr[i] & toUint8Arr[i];
        // matchedScore = mocr.Util.intToBin(matchedUint8Arr[i]).split("").reduce((a,b)=>b=="1"?a+1:a,matchedScore)
        xorUint8Arr[i] = fromUint8Arr[i] ^ toUint8Arr[i];
        fromMissedUint8Arr[i] = xorUint8Arr[i] & fromUint8Arr[i];
        toMissedUint8Arr[i] = xorUint8Arr[i] & toUint8Arr[i];
        // fromMissedScore = mocr.Util.intToBin(fromMissedUint8Arr[i]).split("").reduce((a,b)=>b=="1"?a+1:a,fromMissedScore)
        // toMissedScore = mocr.Util.intToBin(toMissedUint8Arr[i]).split("").reduce((a,b)=>b=="1"?a+1:a ,toMissedScore)
      }
      // bitSumForUint8
      matchedScore = mocr.Util.bitSumForUint8Array(matchedUint8Arr);
      fromMissedScore = mocr.Util.bitSumForUint8Array(fromMissedUint8Arr);
      toMissedScore = mocr.Util.bitSumForUint8Array(toMissedUint8Arr);

      // mocr.Util.uint8ArrayToBin(matchedUint8Arr);
      // mocr.Util.uint8ArrayToBin(fromMissedUint8Arr);
      // mocr.Util.uint8ArrayToBin(toMissedUint8Arr);
      // matchedScore = mocr.Util.uint8ArrayToBin(matchedUint8Arr).split("").reduce((a,b)=>b=="1"?a+1:a,matchedScore)
      // fromMissedScore = mocr.Util.uint8ArrayToBin(fromMissedUint8Arr).split("").reduce((a,b)=>b=="1"?a+1:a,fromMissedScore)
      // toMissedScore = mocr.Util.uint8ArrayToBin(toMissedUint8Arr).split("").reduce((a,b)=>b=="1"?a+1:a,toMissedScore)


      var res = {
        letter:from,
        total:this.width*this.width,
        matched:(matchedScore+fromMissedScore+toMissedScore == matchedScore)?1:matchedScore/(matchedScore+fromMissedScore+toMissedScore),
        // diffDot:mocr.ImageTool.dot4Bin(dot.join(""),this.width),
        matchedUint8Arr:matchedUint8Arr,
        fromMissedUint8Arr:fromMissedUint8Arr,
        toMissedUint8Arr:toMissedUint8Arr,
        xorUint8Arr:xorUint8Arr,
        matchedScore:matchedScore,
        fromMissedScore:fromMissedScore,
        toMissedScore:toMissedScore,
      }
      return res;
    },
    diffBin:function(to){
      var from = this;
      var fromBin = from.toBin();
      var toBin = to.toBin();
      var total = fromBin.length;
      var counts = [0,0,0,0] //-,T,F,O
      var dot = new Array(total);


      var miss = 0;
      for(var i=0,m=fromBin.length;i<m;i++){
        if(fromBin[i]==1){
          if(toBin[i]==1){
            counts[3]++;
            dot[i]='O';
          }else{
            counts[2]++;
            dot[i]='F';
          }
        }else{
          if(toBin[i]==1){
            counts[1]++;
            dot[i]='T';
          }else{
            counts[0]++;
            dot[i]='-';
          }
        }
      }
      var res = {
        letter:from,
        total:total,
        // matched:counts[3]-counts[1]-counts[2],
        matched:(counts[3]+counts[1]+counts[2])==0?1:counts[3]/(counts[3]+counts[1]+counts[2]),
        counts:counts,
        diffDot:mocr.ImageTool.dot4Bin(dot.join(""),this.width),
      }
      return res;
    },
    toContext2d:function(){
      if(this.width < 1){return null;}
      var ctx = mocr.ImageTool.newContext2d(this.width,this.width,'#fff');
      var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
      var bin = this.toBin();
      for(var i=0,m=bin.length;i<m;i++){
        var v = bin[i]==='0'?255:0
        imageData.data[i*4+0]=v;
        imageData.data[i*4+1]=v;
        imageData.data[i*4+2]=v;
      }
      ctx.putImageData(imageData,0,0);
      return ctx;

    },
    getBoundBox:function(){
      var w = this.width;
      var h = this.width;
      var boundBox = {left:w,top:h,right:-1,bottom:-1,width:-1,height:-1}
      var bin = this.toBin();
      var x = -1,y=-1;
      for(var i=0,m=bin.length;i<m;i+=4){
        if(bin[i]==0){continue;}
        x = i%w;
        y = Math.floor(i/w);
        boundBox.left = Math.min(boundBox.left,x);
        boundBox.top = Math.min(boundBox.top,y);
        boundBox.right = Math.max(boundBox.right,x+1);
        boundBox.bottom = Math.max(boundBox.bottom,y+1);
      }
      boundBox.width = boundBox.right-boundBox.left;
      boundBox.height = boundBox.bottom-boundBox.top;
      return boundBox;
    }

  }
  return Letter;
}(mocr);
