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
    init:function(obj){
      if(obj){
        this.setObj(obj);
      }
      var _letterPackage = '';
      Object.defineProperty(this, 'letterPackage', {
    		value:null, //기본값 (get,set 과 같이 사용불가)
    		writable: true, //값 수정 가능여부 (get,set 과 같이 사용불가)
    		enumerable: false, //목록 열거시 표시여부
    		// configurable: true //삭제 가능여부. writable 속성 변경 가능 여부
    	});

    },
    toBin:function(){
      return mocr.ImageTool.hex2bin(this.hex);
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
