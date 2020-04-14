var NodeFilter = (function(){
  var NodeFilter = function(box_selector){
    this.box_selector = box_selector;
  }
  NodeFilter.prototype = {
    "box_selector":'',
    "shown_className":'NF-shown',
    "hidden_className":'NF-hidden',
    "item_className":'NF-item',
    "key_pattern":"[data-key*='{{sh}}']",
    filter:function(key){
      key = key.trim();
      if(key.length>0){
        var ks = key.match(/([^\s]+)/g)
        var shs = [];
        for(var i=0,m=ks.length;i<m;i++){
          shs.push(this.key_pattern.replace(/{{sh}}/g,ks[i].trim().replace(/'/g,"\\\'")));
        }
        var sh0 = shs.join('');
        // var sh1 = ":not("+shs.join('):not(')+")";

        var s1 = this.box_selector+" ."+this.item_className;
        // console.log(s1);
        var els1 = document.querySelectorAll(s1);
        for(var i=0,m=els1.length;i<m;i++){
          els1[i].classList.add(this.hidden_className);
          els1[i].classList.remove(this.shown_className);
        }

        var s0 = this.box_selector+" ."+this.item_className+sh0;
        var els0 = document.querySelectorAll(s0);
        for(var i=0,m=els0.length;i<m;i++){
          els0[i].classList.remove(this.hidden_className);
          els0[i].classList.add(this.shown_className);

        }

      }else{
        var s0 = this.box_selector+" ."+this.item_className+"."+this.hidden_className;
        var els0 = document.querySelectorAll(s0);
        for(var i=0,m=els0.length;i<m;i++){
          els0[i].classList.remove(this.hidden_className);
          els0[i].classList.add(this.shown_className);
        }
      }

    },
  }
  return NodeFilter;
})()
