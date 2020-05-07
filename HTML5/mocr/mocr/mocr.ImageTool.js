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
    toBWColor:function(ctx,iwr,iwg,iwb,threshold){ //threshold 유사 한계도
      if(threshold == undefined) threshold = 0;
      var imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
      for(var i=0,m=imageData.data.length;i<m;i+=4){
        var r = imageData.data[i+0];
        var g = imageData.data[i+1];
        var b = imageData.data[i+2];
        // var a = imageData.data[i+3];
        imageData.data[i+3] = 255;
        if(
          (Math.abs(r-iwr)+Math.abs(g-iwg)+Math.abs(b-iwb))/3 <= threshold
        ){
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
    /**
     * 영역이 겹치는 boundBox는 합침, 가까우면 합침
     * @return {[type]} [description]
     */
    unionBoundBox:function(boundBoxes,w,h){

      //정사각 영역을 만들어서 그 속에 포함되는 boundbox는 합침
      var boundBoxes2 = [];
      var ck = {left:-1,top:-1,right:-1,bottom:-1,width:-1,height:-1,}

      for(var i=0,m=boundBoxes.length;i<m;i++){
        var a = boundBoxes[i];
        var new_a = Object.assign({}, a);
        // console.log("a,b",a,b);
        if(a.width > a.height*3){
          console.log("너무 큰 차이가 나면 인근합침무시",a);
          continue;
        }else if(a.width > w*0.8 || a.height > h*0.8){
          console.log("너무큰것은 인근합침무시",a);
          continue;
        }else if(
          a.width < a.height *4/5
          && a.width > a.height*2/5
        ){ //너비가 좁을 경우. b의 right가 height의 1.2배이하인 것을 체크, bottom의 차이는 20%까지만 허용. 너무 앏으면 체크 안함


          ck = {
            left:a.left-gap,
            top:a.top-gap,
            right:a.left+a.height+gap,
            bottom:a.bottom + gap,
          }
          ck.width = ck.right-ck.left
          ck.height = ck.bottom-ck.top;
          // console.log("a 너비가 쫍음",a,ck);

        }else if(
           a.height < a.width*4/5
           && a.height > a.width*2/5
        ){ //높이가 낮을 경우
          var gap = a.height*0.2;
          ck = {
            left:a.left-gap,
            top:a.top-gap,
            right:a.right+gap*2,
            bottom:a.top+a.width+gap,
          }
          // console.log("a 높이가 낮음",a,ck);
        }else{

          var gap = Math.max(a.width,a.height)*0.2;
          ck = {
            left:a.left-gap,
            top:a.top-gap,
            right:a.right+gap,
            bottom:a.bottom+gap*2,
          }
        }
        ck.width = ck.right-ck.left
        ck.height = ck.bottom-ck.top;
        // boundBoxes[i]=ck;
        // boundBoxes2.push(ck);
        //
        // continue;
        for(var i2=0,m2=m;i2<m2;i2++){
          var b = boundBoxes[i2];
          if(ck.left <= b.left && ck.right >= b.right && ck.top <= b.top && ck.bottom >= b.bottom ){ //속에 포함
            new_a.left = Math.min(new_a.left,b.left);
            new_a.top = Math.min(new_a.top,b.top);
            new_a.right = Math.max(new_a.right,b.right);
            new_a.bottom = Math.max(new_a.bottom,b.bottom);
            // console.log("a 와 짝",i2,ck,b);
          }
        }
        new_a.width = new_a.right-new_a.left;
        new_a.height = new_a.bottom-new_a.top;
        boundBoxes2.push(new_a);
      }
      var boundBoxes = Object.assign([], boundBoxes2);
      var boundBoxes2 = [];
      var boundBoxes3 = [];
      //겹치면 합침
      var gap = 0;
      for(var i=0,m=boundBoxes.length;i<m;i++){
        var a = boundBoxes[i];
        if(a.width > a.height*3){
          console.log("너무 큰 차이가 나면 겹침무시",a);
          continue;
        }else if(a.width > w*0.8 || a.height > h*0.8){
          console.log("너무큰것은 겹침무시",a);
          continue;
        }
        var new_a = Object.assign({}, a);
        gap = Math.max(new_a.width,new_a.height)*0.1;
        ck = {
          left:new_a.left-gap,
          top:new_a.top-gap,
          right:new_a.right+gap,
          bottom:new_a.bottom+gap,
        }
        ck.width = ck.right-ck.left
        ck.height = ck.bottom-ck.top;
        // console.log(ck);
        // 한번처리된 것을 다시 한번해서 2번 처리함
        var limit = 5; //최대 5회 중복 처리
        var cnt = 0;
        while(limit-- >0){
          cnt++;
          var new_a2 = Object.assign({}, a);
          for(var i2=0,m2=m;i2<m2;i2++){
            var b = boundBoxes[i2];

            // console.log("a,b",a,b);
            if(ck.left <= b.right && b.left <= ck.right && ck.top <= b.bottom && b.top <= ck.bottom ){ //영역 겹침
              new_a2.left = Math.min(new_a2.left,b.left);
              new_a2.top = Math.min(new_a2.top,b.top);
              new_a2.right = Math.max(new_a2.right,b.right);
              new_a2.bottom = Math.max(new_a2.bottom,b.bottom);

              gap = Math.max(new_a2.width,new_a2.height)*0.1;
              ck = {
                left:new_a2.left-gap,
                top:new_a2.top-gap,
                right:new_a2.right+gap,
                bottom:new_a2.bottom+gap,
              }
              ck.width = ck.right-ck.left
              ck.height = ck.bottom-ck.top;
            }
          }
          if(new_a.left==new_a2.left && new_a.right==new_a2.right && new_a.top==new_a2.top && new_a.bottom==new_a2.bottom ){
            // console.log("전부 매칭 완료.",cnt);
            new_a  = Object.assign({}, new_a2);
            break;
          }
          new_a  = Object.assign({}, new_a2);
        }

        var k = new_a.left+"_"+new_a.top+"_"+new_a.right+"_"+new_a.bottom;
        if(boundBoxes3.indexOf(k)!==-1){ continue; }//중복제거
        boundBoxes3.push(k);
        new_a.width = new_a.right-new_a.left;
        new_a.height = new_a.bottom-new_a.top;
        // console.log("unionBoundBox",new_a);
        boundBoxes2.push(new_a);

      }





      return boundBoxes2;
    },
    //--
    getBoundBoxes:function(ctx){
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      var imageData0 = ctx.getImageData(0,0,w,h);
      var imageData = ctx.createImageData(imageData0);
      imageData.data.set(imageData0.data);
      var boundBoxes = [];

      //-- 왼쪽 위 기준점 찾기
      var r = null;
      var i = 0;
      while(r = this.getBoundBoxes4FirstDot(imageData,w,h)){
        i++;
        if(i>500){break;}
        var xf = r[0];
        var yf = r[1];
        // console.log("i,xf,yf",i,xf,yf);

        var xy0 = (w*yf+xf)*4;
        // console.log("i,xf,yf",i,xf,yf,imageData.data[xy0+1]);
        // //-- 세로기준으로 가로가 전부 빈공간인것 찾기 => 박스 최 하단 y 위치
        var boundBox = this.getBoundBox(imageData,xf,yf);
        if(boundBox==null){
          console.log("boundBox 없음");
          break;
        }
        if(boundBox.width > w *0.8 && boundBox.height > h *0.8){
          console.log("boundBox가 너무 큼");
          continue;
        }
        // console.log("boundBox",boundBox);
        ctx.putImageData(imageData,0,0);
        boundBoxes.push(boundBox);
      }
      // boundBoxes = this.unionBoundBox(boundBoxes,w,h);
      // boundBoxes = mocr.BoundBoxTool.union4overlap(boundBoxes)
      boundBoxes.sort(function(a,b){
        var va = a.height*w+a.left;
        var vb = b.height*w+b.left;
        return va-vb;
      })


      return boundBoxes;
    },
    // getDistance4BoundBoxes:function(bb1,bb2){
    //   var dx = -1;
    //   var dy = -1;
    //   if(bb1.left <= bb2.right && bb1.right >= bb2.left){ //x좌표기준으로 겹친 경우 거리는 0
    //     dx = 0;
    //   }else{
    //     dx = Math.min(Math.abs(bb1.left-bb2.right),Math.abs(bb2.left-bb1.right))
    //   }
    //   if(bb1.top <= bb2.bottom && bb1.bottom >= bb2.top){ //y좌표기준으로 겹친 경우 거리는 0
    //     dy = 0;
    //   }else{
    //     dy = Math.min(Math.abs(bb1.top-bb2.bottom),Math.abs(bb2.top-bb1.bottom))
    //   }
    //   return [dx,dy,Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))]
    // },
    getArrangedBoundBoxes:function(boundBoxes){
      var mArrangedBoxes = new mocr.ArrangedBoxes();
      mArrangedBoxes.inputBoundBoxes(boundBoxes);
      var arrangedBoxes = mArrangedBoxes.arrangedBoxes;
      return arrangedBoxes;
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
