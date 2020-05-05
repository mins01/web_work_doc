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
    desc:"",
    letterType:"",
    hex:"",
    init:function(obj){
      if(obj){
        this.setObj(obj);
      }
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
        letter:from.letter,
        total:total,
        desc:this.desc,
        // matched:counts[3]-counts[1]-counts[2],
        matched:counts[3]/(counts[3]+counts[1]+counts[2]),
        counts:counts,
        dot:mocr.ImageTool.dot4Bin(dot.join(""),this.width),
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

    }

  }
  return Letter;
}(mocr);
