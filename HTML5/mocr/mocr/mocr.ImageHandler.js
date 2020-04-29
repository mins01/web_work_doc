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
    width:32,
    init:function(){
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
    },
    loadFromImgNode:function(img){
      this.canvas.width = img.naturalWidth;
      this.canvas.height = img.naturalHeight;
      this.width = this.canvas.width;
      this.ctx.drawImage(img,0,0);
    },
    loadFromCanvasNode:function(canvas){

    },
    loadFromChar:function(char){
      var fontSize = 64;
      this.canvas.width = Math.ceil(fontSize*1.5);
      this.canvas.height = this.canvas.width;
      this.width = 64;

      this.ctx.save();
      var font = "bold 64px Arial";
      this.ctx.font = font;
      this.ctx.fillStyle = "#000000";
      var text = this.ctx.measureText(char);
      // console.log(char,text);
      this.ctx.fillText(char, (this.canvas.width-text.width)/2, 64);
      this.ctx.restore();
    },
    simplify:function(w) {
      this.width = w;
      this.transparentColor(255,255,255); //배경색 없애기
      this.trim(); //여백제거
      this.reisze(this.width,this.width,1); //크기 리사이즈
      this.getLetter();
    },
    transparentColor:function(ir,ig,ib){
      mocr.ImageTool.transparentColor(this.ctx,ir,ig,ib);
    },
    reisze:function(w,h,ratio){
      this.width = w;
      mocr.ImageTool.reisze(this.ctx,w,h,ratio);
    },
    crop:function(x0,y0,w,h){
      this.width = w;
      mocr.ImageTool.crop(this.ctx,x0,y0,w,h);
    },
    trim:function(){
      mocr.ImageTool.trim(this.ctx);
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
      return letter;
    },

  }
  return ImageHandler;
}(mocr)
