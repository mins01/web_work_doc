'use strict';
/*
slideList
dev : mins01
homepage : http://mins01.com
date : 2020-06-26
license : MIT + "공대여자는 예쁘다"를 나태내야함
 */
var SlideList = function(target){
  this.target = null;
  this.isRepeat = false;
  this.tm = null;
  this.init(target);
}


SlideList.prototype.init = function(target){
  this.target = target;
  this.first();
}
SlideList.prototype.first = function(){
  var el = this.target.querySelector('.slideList-item:first-child');
  return this.selectByNode(el)
}
SlideList.prototype.last = function(){
  var el = this.target.querySelector('.slideList-item:last-child');
  return this.selectByNode(el)
}
SlideList.prototype.prev = function(){
  var el = this.target.querySelector('.slideList-item[data-pos="-1"]');
  if(this.isRepeat && !el){
    return this.last();
  }else{
    return this.selectByNode(el)
  }
}
SlideList.prototype.next = function(){
  var el = this.target.querySelector('.slideList-item[data-pos="1"]');
  if(this.isRepeat && !el){
    return this.first();
  }else{
    return this.selectByNode(el)
  }
}
SlideList.prototype.playAuto = function(interval,isPrev){
  this.stopAuto();
  var fn = isPrev
          ?function(thisC){ return function(){ if(!thisC.prev()){thisC.stopAuto()}}}(this)
          :function(thisC){ return function(){ if(!thisC.next()){thisC.stopAuto()}}}(this)
  this.tm = setInterval(fn,interval);
}
SlideList.prototype.stopAuto = function(){
  // console.log("stopAuto");
  if(this.tm != null){
    clearInterval(this.tm)
    this.tm = null;
  }
}
SlideList.prototype.selectByNode = function(node){
  if(!node){ return false;}
  this.clear();
  if(node.previousElementSibling){
    node.previousElementSibling.setAttribute("data-pos","-1");
    if(node.previousElementSibling.previousElementSibling) node.previousElementSibling.previousElementSibling.setAttribute("data-pos","-2");
  }
  node.setAttribute("data-pos","0")
  if(node.nextElementSibling){
    node.nextElementSibling.setAttribute("data-pos","1")
    if(node.nextElementSibling.nextElementSibling) node.nextElementSibling.nextElementSibling.setAttribute("data-pos","2")
  }

  return true;
}
SlideList.prototype.clear = function(){
  var els = this.target.querySelectorAll('.slideList-item[data-pos]');
  els.forEach((el, idx) => {
    el.removeAttribute('data-pos')
  });

}
