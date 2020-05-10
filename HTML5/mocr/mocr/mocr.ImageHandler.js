"use strict";
if(!mocr){
  var mocr = {};
}
if(!mocr.ImageTool){
  console.error("required mocr.ImageTool");
}

mocr.ImageHandler = function(mocr){
  var ImageHandler = function(){
    this.init();
  }
  ImageHandler.prototype = {
    canvas:null,
    ctx:null,
    desc:"",
    width:32,
    init:function(){
      this.ctx = mocr.ImageTool.newContext2d(100,100,'#fff');
      this.canvas = this.ctx.canvas;
    },
    generateImageHandlerFromBoundBox:function(boundBox){
      var new_mih = new ImageHandler();
      var width = Math.max(boundBox.width,boundBox.height);
      mocr.ImageTool.resetContext2d(new_mih.ctx,width,width,'#fff');
      new_mih.ctx.putImageData(this.ctx.getImageData(boundBox.left,boundBox.top,boundBox.width,boundBox.height),0,0);
      new_mih.width = 32;
      new_mih.trim();
      new_mih.resize(new_mih.width,new_mih.width,1); //크기 리사이즈
      return new_mih;
    },
    loadFromImgNode:function(img){
      this.canvas.width = img.naturalWidth;
      this.canvas.height = img.naturalHeight;
      this.width = this.canvas.width;
      this.ctx.drawImage(img,0,0);
    },
    loadFromCanvasNode:function(canvas){

    },
    /**
     * [description]
     * @param  {[type]} char       [description]
     * @param  {[type]} fontFamily Serif , Sans-Serif , Monospace
     * @param  {[type]} fontWeight   normal,bold
     * @return {[type]}            [description]
     */
    loadFromChar:function(char,fontFamily,fontWeight){
      // console.log("loadFromChar",char,fontFamily);
      var fontSize = 64;
      var w = Math.ceil(fontSize*1.5);
      mocr.ImageTool.resetContext2d(this.ctx,w,w,'#fff');
      // this.canvas.width = Math.ceil(fontSize*1.5);
      // this.canvas.height = this.canvas.width;
      // this.width = 64;
      // this.ctx.save();
      // this.ctx.fillStyle = "#ffffff";
      // this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
      if(!fontFamily){
        fontFamily = 'Serif';
      }
      if(!fontWeight){
        fontWeight = 'normal';
      }
      this.desc = fontFamily;
      var font = fontWeight+" 64px "+fontFamily;
      // console.log(font);

      this.ctx.font = font;
      this.ctx.fillStyle = "#000";
      var text = this.ctx.measureText(char);
      // console.log(char,text);
      this.ctx.fillText(char, (this.canvas.width-text.width)/2, 64);
      this.ctx.restore();
    },
    simplify:function(w,threshold) {
      if(threshold === undefined){threshold = 0;}
      this.width = w;
      // this.transparentColor(255,255,255); //배경색 없애기
      this.toBWColor(255,255,255,threshold);
      // var bbs = this.getBoundBoxes();
      // var bb = bbs[0];
      // console.log(bbs);
      // var bb = this.getBoundBox4MinMax();
      // console.log(bb);
      this.trim(); //여백제거
      this.resize(this.width,this.width,1); //크기 리사이즈
    },
    transparentColor:function(ir,ig,ib){
      mocr.ImageTool.transparentColor(this.ctx,ir,ig,ib);
    },
    resize:function(w,h,ratio){
      this.width = w;
      mocr.ImageTool.resize(this.ctx,w,h,ratio);
    },
    crop:function(x0,y0,w,h){
      this.width = w;
      mocr.ImageTool.crop(this.ctx,x0,y0,w,h);
    },
    trim:function(){
      mocr.ImageTool.trim(this.ctx);
    },
    toBWColor:function(iwr,iwg,iwb,threshold){
      if(threshold == undefined) threshold = 0;
      mocr.ImageTool.toBWColor(this.ctx,iwr,iwg,iwb,threshold);

    },
    getBoundBoxes:function(){
      return mocr.ImageTool.getBoundBoxes(this.ctx);
    },
    getBoundBox4MinMax:function(){
      return mocr.ImageTool.getBoundBox4MinMax(this.ctx);
    },
    getArrangedBoundBoxes:function(){
      return mocr.ImageTool.getArrangedBoundBoxes(this.getBoundBoxes());
    },
    toBin:function(){
      return mocr.ImageTool.img2Bin(this.ctx);
    },
    toHex:function(){
      return mocr.ImageTool.bin2hex(this.toBin());
    },
    toDot:function(){
      return mocr.ImageTool.dot4Bin(this.toBin(),this.width);
    },
    getLetter:function(){
      var letter = new mocr.Letter()
      letter.hex = this.toHex();
      letter.width = this.width;
      var bb = letter.getBoundBox();
      letter.aspectRatio = bb.width/bb.height
      return letter;
    },
    toString:function(){
      return this.toDot();
    }

  }
  return ImageHandler;
}(mocr)
