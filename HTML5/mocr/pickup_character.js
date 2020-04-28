var pickup_character = {
  testimg:null,
  cv:null,
  ctx:null,
  div_out:null,
  charr:null,
  chArraySize:32,
  init:function(){
    this.div_out = document.querySelector("#div_out");
    this.testimg = document.querySelector("#testimg");
    this.cv = document.createElement('canvas');
    this.cv.width = 300;
    this.cv.height = 300;
    this.div_out.appendChild(this.cv);
    this.ctx = this.cv.getContext('2d');
    this.ctx.drawImage(this.testimg, 0, 0, 300, 300);
  },
  run:function(){
    this.transparentColor(this.ctx,255,255,255); //배경색 없애기
    this.imgtrim(this.ctx); //여백제거
    this.reisze(this.ctx,this.chArraySize,this.chArraySize,1); //크기 리사이즈
    var charr = this.img2ChArray(this.ctx)
    this.log4Array(charr,this.chArraySize);
    this.charr = charr;
  },
  character2Array:function(char){
    var cv = document.createElement('canvas');
    var fontSize = 64;
    cv.width = Math.ceil(fontSize*1.5);
    cv.height = cv.width;
    ctx = cv.getContext('2d');
    ctx.font      = "bold 64px Arial";
    ctx.fillStyle = "#000000";
    var text = ctx.measureText(char);
    // console.log(text);
    ctx.fillText(char, (cv.width-text.width)/2, 64);

    var cv2 = document.createElement('canvas');
    cv2.width = cv.width;
    cv2.height = cv.height;
    ctx2 = cv2.getContext('2d');
    ctx2.drawImage(cv,0,0);
    this.div_out.appendChild(cv2);

    this.transparentColor(ctx,255,255,255); //배경색 없애기
    this.imgtrim(ctx); //여백제거
    this.reisze(ctx,this.chArraySize,this.chArraySize,1); //크기 리사이즈
    var charr = this.img2ChArray(ctx)
    // this.log4Array(charr,this.chArraySize);
    this.div_out.appendChild(cv);
    console.log('점수',this.diff(this.charr,charr));
    this.log4Array(this.diffArray(this.charr,charr),this.chArraySize);
    // return charr;

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
  reisze:function(ctx,w,h,ratio){
    var cv1 = document.createElement('canvas');
    cv1.width = ctx.canvas.width;
    cv1.height = ctx.canvas.height;
    ctx1 = cv1.getContext('2d');
    ctx1.drawImage(ctx.canvas,0,0);
    if(ratio){
      var w1 = Math.ceil((cv1.width/cv1.height)*h)
      var x1 = Math.ceil((w-w1)/2);
      ctx.canvas.width=w;
      ctx.canvas.height=h;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(ctx1.canvas,x1,0,w1,h);
    }else{
      ctx.canvas.width=w;
      ctx.canvas.height=h;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(ctx1.canvas,0,0,w,h);
    }

  },
  crop:function(ctx,x0,y0,w,h){
    console.log(x0,y0,w,h)
    var imagedata = ctx.getImageData(x0,y0,w-x0,h-y0);
    ctx.canvas.width = imagedata.width;
    ctx.canvas.height = imagedata.height;
    ctx.putImageData(imagedata,0,0);
  },
  img2ChArray:function(ctx){
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    var imageData = ctx.getImageData(0, 0, w, h);
    var chArray = new Array(w*h);
    for(var i=0,m=imageData.data.length;i<m;i+=4){
      var p = Math.floor((i/4));
      chArray[p] = imageData.data[i+3]>0?1:0;
    }
    return chArray;
  },
  imgtrim:function(ctx){
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    var imageData = ctx.getImageData(0, 0, w, h);
    var left = w;
    var right = 0;
    var top = h;
    var bottom = 0;
    // 채워진 최대 X,Y 구하기
    for(var i=0,m=imageData.data.length;i<m;i+=4){
      var x = (i/4)%w+1;
      var y = Math.floor((i/4)/w)+1;
      var r = imageData.data[i+0];
      var g = imageData.data[i+1];
      var b = imageData.data[i+2];
      var a = imageData.data[i+3];
      if(a == 0 ){continue;}
      imageData.data[i+0]=0;
      imageData.data[i+1]=0;
      imageData.data[i+2]=0;
      left = Math.min(left,x);
      right = Math.max(right,x);
      top = Math.min(top,y);
      bottom = Math.max(bottom,y);
    }
    ctx.putImageData(imageData,0,0);
    console.log(left,right,top,bottom);
    this.crop(ctx,left-1,top-1,right+1,bottom+0);
  },
  log4Array:function(arr,w){
    var parr = [];
    for(var i=0,m=arr.length;i<m;i+=w){
      parr.push(arr.slice(i,i+w).join(''));
    }
    console.log(parr.join("\n"))
  },
  diff:function(from,to){
    var correct = 0;
    var miss = 0;
    for(var i=0,m=to.length;i<m;i++){
      if(to[i]==1){
        if(from[i]==1){
          correct++;
        }else{
          miss++;
        }
      }
    }
    return [correct,miss];
  },
  diffArray:function(from,to){
    var rArr = new Array(to.length)
    var correct = 0;
    var miss = 0;
    for(var i=0,m=to.length;i<m;i++){
      if(to[i]==1){
        if(from[i]==1){
          rArr[i]='0';
        }else{
          rArr[i]='-';
        }
      }else{
        rArr[i]=' ';
      }
    }
    return rArr;
  }

}
