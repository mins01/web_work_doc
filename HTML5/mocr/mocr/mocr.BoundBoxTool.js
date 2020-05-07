"use strict";
if(!mocr){
  var mocr = {};
}

mocr.BoundBoxTool = function(mocr){
  var BoundBoxTool = {
    getDistance:function(bb1,bb2){
      var dx = -1;
      var dy = -1;
      if(bb1.left <= bb2.right && bb1.right >= bb2.left){ //x좌표기준으로 겹친 경우 거리는 0
        dx = 0;
      }else{
        dx = Math.min(Math.abs(bb1.left-bb2.right),Math.abs(bb2.left-bb1.right))
      }
      if(bb1.top <= bb2.bottom && bb1.bottom >= bb2.top){ //y좌표기준으로 겹친 경우 거리는 0
        dy = 0;
      }else{
        dy = Math.min(Math.abs(bb1.top-bb2.bottom),Math.abs(bb2.top-bb1.bottom))
      }
      return [dx,dy,Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))]
    },
    // x 좌표로만 비교한다.
    union4overlapByX:function(boundBoxes){
      var new_boundBoxes = [];
      // for(var i=0,m=boundBoxes.length;i<m;i++){
      var a = null;
      while(a = boundBoxes.shift()){
        var new_a = Object.assign({},a);
        var max_cnt = 0
        var limit = 5;
        while(limit--){
          var cnt = 0;
          for(var i2=0;i2<boundBoxes.length;i2++){
            var b = boundBoxes[i2];
            if(new_a.left <= b.right && b.left <= new_a.right
              // && new_a.top <= b.bottom && b.top <= new_a.bottom
             ){ //영역 겹침
              console.log(new_a,b);
              new_a.left = Math.min(new_a.left,b.left);
              new_a.top = Math.min(new_a.top,b.top);
              new_a.right = Math.max(new_a.right,b.right);
              new_a.bottom = Math.max(new_a.bottom,b.bottom);
              new_a.width = new_a.right-new_a.left
              new_a.height = new_a.bottom-new_a.top;
              boundBoxes.splice(i2,1);
              cnt++;
            }
          }
          if(cnt==0){break;}
        }
        new_boundBoxes.push(new_a)
      }
      // console.log(new_boundBoxes);
      return new_boundBoxes;
    }
  }
  return BoundBoxTool;
}(mocr)
