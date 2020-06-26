var VRollingList = function(target){
  this.target = null;
  this.init(target);
}


VRollingList.prototype.init = function(target){
  this.target = target;
  this.first();
}
VRollingList.prototype.first = function(){
  var el = this.target.querySelector('.vRollingList-item:first-child');
  return this.selectByNode(el)
}
VRollingList.prototype.last = function(){
  var el = this.target.querySelector('.vRollingList-item:last-child');
  return this.selectByNode(el)
}
VRollingList.prototype.up = function(){
  var el = this.target.querySelector('.vRollingList-item[data-pos="-1"]');
  return this.selectByNode(el)
}
VRollingList.prototype.down = function(){
  var el = this.target.querySelector('.vRollingList-item[data-pos="1"]');
  return this.selectByNode(el)
}
VRollingList.prototype.selectByNode = function(node){
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
VRollingList.prototype.clear = function(){
  var els = this.target.querySelectorAll('.vRollingList-item[data-pos]');
  els.forEach((el, idx) => {
    el.removeAttribute('data-pos')
  });

}
