"use strict";
if(!mocr){
  var mocr = {};
}

mocr.ImageTool = function(mocr){
  var ImageTool = {
    newContext2d:function(w,h,fillStyle){
      var cv = document.createElement('canvas');
      cv.width = w;
      cv.height = h;
      var ctx = cv.getContext('2d',{alpha:false});
      ctx.imageSmoothingEnabled = false;
      this.resetContext2d(ctx,w,h,fillStyle);
      return ctx;
    },
    resetContext2d:function(ctx,w,h,fillStyle){
      var cv = ctx.canvas;
      cv.width = w;
      cv.height = h;
      ctx.save();
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0,0,w,h);
      ctx.restore();
    },
    resize:function(ctx,w,h,ratio){
      var ctx1 = this.newContext2d(ctx.canvas.width,ctx.canvas.height,'#fff')
      var cv1 = ctx1.canvas;
      // console.log(cv1.width,cv1.height);
      var ctx1 = cv1.getContext('2d');
      ctx1.drawImage(ctx.canvas,0,0);
      this.resetContext2d(ctx,w,h,'#fff');
      if(ratio){
        if(cv1.height>cv1.width){
          var w1 = Math.ceil((cv1.width/cv1.height)*h)
          var x1 = Math.ceil((w-w1)/2);
          ctx.drawImage(ctx1.canvas,x1,0,w1,h);
        }else{
          var h1 = Math.ceil((cv1.height/cv1.width)*w)
          var y1 = Math.ceil((h-h1)/2);
          ctx.drawImage(ctx1.canvas,0,y1,w,h1);
        }

      }else{
        ctx.drawImage(ctx1.canvas,0,0,w,h);
      }

    },
    crop:function(ctx,x0,y0,w,h){
      // console.log(x0,y0,w,h)
      var imagedata = ctx.getImageData(x0,y0,w,h);
      ctx.canvas.width = imagedata.width;
      ctx.canvas.height = imagedata.height;
      ctx.putImageData(imagedata,0,0);
    },
    trim:function(ctx){
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      // console.log(w,h);
      var imageData = ctx.getImageData(0, 0, w, h);
      var left = w;
      var right = 0;
      var top = h;
      var bottom = 0;
      // 채워진 최대 X,Y 구하기
      for(var i=0,m=imageData.data.length;i<m;i+=4){
        var x = (i/4)%w;
        var y = Math.floor((i/4)/w);
        var r = imageData.data[i];
        var g = imageData.data[i+1];
        var b = imageData.data[i+2];
        var a = imageData.data[i+3];
        if(r > 127 ){
          // imageData.data[i+0]=255;
          // imageData.data[i+1]=255;
          // imageData.data[i+2]=255;
          continue;
        }
        // console.log(x,y)
        imageData.data[i]=0;
        imageData.data[i+1]=0;
        imageData.data[i+2]=0;
        left = Math.min(left,x);
        right = Math.max(right,x);
        top = Math.min(top,y);
        bottom = Math.max(bottom,y);
      }
      ctx.putImageData(imageData,0,0);
      // console.log(left,top,right,bottom);
      this.crop(ctx,left,top,right-left+1,bottom-top+1);
    },
    transparentColor:function(ctx,ir,ig,ib){
      var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
      for(var i=0,m=imageData.data.length;i<m;i+=4){
        var r = imageData.data[i+0];
        var g = imageData.data[i+1];
        var b = imageData.data[i+2];
        var a = imageData.data[i+3];
        if(r==ir && g==ig && b==ib ){
          imageData.data[i+3] = 0;
        }
      }
      ctx.putImageData(imageData,0,0)
    },
    img2Bin:function(ctx){
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      var imageData = ctx.getImageData(0, 0, w, h);
      var chArray = new Array(w*h);
      for(var i=0,m=imageData.data.length;i<m;i+=4){
        var p = Math.floor((i/4));
        // chArray[p] = imageData.data[i+3]>0?1:0;
        chArray[p] = imageData.data[i+0]<128?1:0;
      }
      return chArray.join("");
    },
    bin2hex:function(bin){
      // var binarr = this.img2BinArray(ctx);
      var hexs = [];
      for(var i=0,m=bin.length;i<m;i+=4){
        hexs.push(parseInt(bin.substr(i,4),2).toString(16));
      }
      return hexs.join('');
    },
    hex2bin:function(hex){
      var binarr = [];
      for(var i=0,m=hex.length;i<m;i++){
        var bin = parseInt(hex[i],16).toString(2);
        switch(bin.length){
          case 0:bin='0000'+bin;break;
          case 1:bin='000'+bin;break;
          case 2:bin='00'+bin;break;
          case 3:bin='0'+bin;break;
        }
        binarr.push(bin);
      }
      return binarr.join("");
    },
    diffBin:function(from,to){
      var rArr = new Array(to.length)
      var correct = 0;
      var miss = 0;
      for(var i=0,m=to.length;i<m;i++){
        if(to[i]==1){
          if(from[i]==1){
            correct++;
            rArr[i]='1';
          }else{
            rArr[i]='-';
            miss++;
          }
        }else{
          rArr[i]='0';
        }
      }
      return [correct,miss,rArr.join("")];
    },
    dot4Bin:function(bin,w){
      var parr = [];
      for(var i=0,m=bin.length;i<m;i+=w){
        parr.push(bin.substr(i,w));
      }
      return parr.join("\n");
    },
  }
  return ImageTool;
}(mocr)
