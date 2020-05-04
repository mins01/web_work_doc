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
      var imageData = ctx.getImageData(x0,y0,w,h);
      ctx.canvas.width = imageData.width;
      ctx.canvas.height = imageData.height;
      ctx.putImageData(imageData,0,0);
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
    //-- 흰색으로 지정된 색(iwr,iwg,iwb) 이외에는 전부 검은색(#000)으로 바꾼다.
    toBWColor:function(ctx,iwr,iwg,iwb){
      var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
      for(var i=0,m=imageData.data.length;i<m;i+=4){
        var r = imageData.data[i+0];
        var g = imageData.data[i+1];
        var b = imageData.data[i+2];
        // var a = imageData.data[i+3];
        imageData.data[i+3] = 255;
        if(r==iwr && g==iwg && b==iwb ){
          imageData.data[i+0] = 255;
          imageData.data[i+1] = 255;
          imageData.data[i+2] = 255;
        }else{
          imageData.data[i+0] = 0;
          imageData.data[i+1] = 0;
          imageData.data[i+2] = 0;
        }
      }
      ctx.putImageData(imageData,0,0)
    },
    getBoundBoxes4FirstDot:function(imageData){
      var w = imageData.width;
      var h = imageData.height;
      var xf = -1; //채색을 위한 기준점
      var yf = -1;
      //-- 왼쪽 위 기준점 찾기
      for(var i=0,m=imageData.data.length;i<m;i+=4){
        // var r = imageData.data[i];
        var g = imageData.data[i+1];
        // var b = imageData.data[i+2];
        // var a = imageData.data[i+3];
        if(g > 127){ continue; }
        var x = (i/4)%w;
        var y = Math.floor((i/4)/w);
        return [x,y]
      }
      return null;
    },
    getBoundBoxes4X0Y0:function(imageData,w,h){
      var x0 = w;
      var y0 = h;
      var xf = -1; //채색을 위한 기준점
      var yf = -1;
      //-- 왼쪽 위 기준점 찾기

      for(var i=0,m=imageData.data.length;i<m;i+=4){
        var x = (i/4)%w;
        var y = Math.floor((i/4)/w);
        var r = imageData.data[i];
        var g = imageData.data[i+1];
        var b = imageData.data[i+2];
        var a = imageData.data[i+3];
        if(g > 127){ continue; }
        if(xf==-1){
          xf = x;
          yf = y;
        }
        x0 = Math.min(x0,x);
        y0 = Math.min(y0,y);
      }
      if(x0==w && y0==h){
        return null;
      }
      return [x0,y0,xf,yf];
    },
    getBoundBoxes4X1Y1:function(imageData,x0,y0){
      var w = imageData.width;
      var h = imageData.height;
      var point ={x:x0,y:y0}
      // var p0 = (point.y*w+point.x)*4
      // var r0 = imageData.data[p0];
      // var g0 = imageData.data[p0+1];
      // var b0 = imageData.data[p0+2];
      //https://stackoverflow.com/questions/23371608/fill-a-hollow-shape-with-color
      var x1 = x0;
      var y1 = y0;
      var stack = Array();
      stack.push(point); // Push the seed
      while(stack.length > 0) {
        var currPt = stack.pop();
        var p1 = (currPt.y*w+currPt.x)*4
        var g1 = imageData.data[p1+1];
        if(g1 > 127) { continue; }
            // Check if the point is not filled
        imageData.data[p1+1] = 255;
        x1 = Math.max(x1,currPt.x);
        y1 = Math.max(y1,currPt.y);
        // console.log("x1,y1",x1,y1);
        if(currPt.x < w-1) stack.push({x:currPt.x + 1, y:currPt.y}); // Fill the east neighbour
        if(currPt.y < h-1) stack.push({x:currPt.x, y:currPt.y + 1}); // Fill the south neighbour
        if(currPt.x > 0) stack.push({x:currPt.x - 1, y:currPt.y}); // Fill the west neighbour
        if(currPt.y > 0) stack.push({x:currPt.x, y:currPt.y - 1}); // Fill the north neighbour

      }
      if(x0==x1 && y0==y1){
        return null;
      }
      return [x1,y1]

    },
    getBoundBox:function(imageData,xf,yf){
      var w = imageData.width;
      var h = imageData.height;
      var point ={x:xf,y:yf}
      // var p0 = (point.y*w+point.x)*4
      // var r0 = imageData.data[p0];
      // var g0 = imageData.data[p0+1];
      // var b0 = imageData.data[p0+2];
      //https://stackoverflow.com/questions/23371608/fill-a-hollow-shape-with-color
      var x0 = w;
      var y0 = h;
      var x1 = -1;
      var y1 = -1;
      var stack = Array();
      stack.push(point); // Push the seed
      while(stack.length > 0) {
        var currPt = stack.pop();
        var p1 = (currPt.y*w+currPt.x)*4
        var g1 = imageData.data[p1+1];
        if(g1 > 127) { continue; }
            // Check if the point is not filled
        imageData.data[p1+1] = 255;
        x0 = Math.min(x0,currPt.x);
        y0 = Math.min(y0,currPt.y);
        x1 = Math.max(x1,currPt.x);
        y1 = Math.max(y1,currPt.y);
        // console.log("x1,y1",x1,y1);
        if(currPt.x < w-1) stack.push({x:currPt.x + 1, y:currPt.y}); // Fill the east neighbour
        if(currPt.y < h-1) stack.push({x:currPt.x, y:currPt.y + 1}); // Fill the south neighbour
        if(currPt.x > 0) stack.push({x:currPt.x - 1, y:currPt.y}); // Fill the west neighbour
        if(currPt.y > 0) stack.push({x:currPt.x, y:currPt.y - 1}); // Fill the north neighbour

      }
      if(x0==w && x1==-1){
        return null;
      }
      return {left:x0,top:y0,right:x1,bottom:y1,width:x1-x0,height:y1-y0};

    },
    //--
    getBoundBoxes:function(ctx){
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      var imageData0 = ctx.getImageData(0,0,w,h);
      var imageData = ctx.createImageData(imageData0);
      imageData.data.set(imageData0.data);
      var boxes = [];

      //-- 왼쪽 위 기준점 찾기
      var r = null;
      var i = 0;
      while(r = this.getBoundBoxes4FirstDot(imageData,w,h)){
        i++;
        if(i>50){break;}
        var xf = r[0];
        var yf = r[1];
        console.log("i,xf,yf",i,xf,yf);

        var xy0 = (w*yf+xf)*4;
        console.log("i,xf,yf",i,xf,yf,imageData.data[xy0+1]);
        // //-- 세로기준으로 가로가 전부 빈공간인것 찾기 => 박스 최 하단 y 위치
        var boundBox = this.getBoundBox(imageData,xf,yf);
        if(boundBox==null){
          console.log("boundBox 없음");
          break;
        }
        console.log("boundBox",boundBox);
        ctx.putImageData(imageData,0,0);
        boxes.push(boundBox);
      }
      ctx.putImageData(imageData0,0,0);
      ctx.save();
      ctx.strokeStyle = 'rgba(100,0,0,255)';
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation ='multiply';
      for(var i=0,m=boxes.length;i<m;i++){
        var box = boxes[i];
        ctx.strokeRect(box.left,box.top,box.width,box.height)

      }
      ctx.restore();
      console.log(boxes);

      // var xy1 = (w*y1+x1)*4;
      // imageData.data[xy1]=100;
      // imageData.data[xy1+1]=255;
      // imageData.data[xy1+2]=255;
      // imageData.data[xy1+3]=255;
      // ctx.putImageData(imageData,0,0);

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
    // toBWColor:function(ctx){
    //   var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
    //   var toImagedata = colorPalette.applyPalette(imageData,'black_white_1bit');
    //   ctx.putImageData(toImagedata,0,0);
    // },
    boundBoxes:function(ctx){

    }
  }
  return ImageTool;
}(mocr)
