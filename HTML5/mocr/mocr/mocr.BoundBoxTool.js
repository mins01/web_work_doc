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
    union4OverlapInArrangedBox:function(arrangedBox){
      var boundBoxes = arrangedBox.boundBoxes;
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
              // console.log(new_a,b);
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
      // return new_boundBoxes;
      arrangedBox.boundBoxes = new_boundBoxes;
    },
    // 한글 관련해서 자음과 모음을 합치는 메소드지만, 잘 동작 안한다...
    union4GangulInArrangedBox:function(arrangedBox){
      console.log(arrangedBox.boundBoxes);
      for(var i=0;i<arrangedBox.boundBoxes.length-1;i++){
        var a = arrangedBox.boundBoxes[i];
        console.log(i,arrangedBox.height,a.height ,">=", arrangedBox.height*0.5
                      //,a.bottom ,"<=", arrangedBox.bottom-arrangedBox.height*0.05
                      ,a.width ,">=", arrangedBox.height*0.3 );
        if(
          a.height >= arrangedBox.height*0.5
          //&& a.bottom <= arrangedBox.bottom-arrangedBox.height*0.05
          && a.width >= arrangedBox.height*0.3
        ){
          var b = arrangedBox.boundBoxes[i+1]
          var tmp_w = b.right-a.left;
          var dist = this.getDistance(a,b);
          console.log("한글 초성 예상",tmp_w ,">=", arrangedBox.height*0.7 , tmp_w ,"<", arrangedBox.height,b.height,">=",arrangedBox.height*0.9);
          if(tmp_w >= arrangedBox.height*0.7 && tmp_w < arrangedBox.height && dist[0]<b.height*0.3 && b.height >= arrangedBox.height*0.9){
            var new_a = Object.assign({},a);
            new_a.left = Math.min(new_a.left,b.left);
            new_a.top = Math.min(new_a.top,b.top);
            new_a.right = Math.max(new_a.right,b.right);
            new_a.bottom = Math.max(new_a.bottom,b.bottom);
            new_a.width = new_a.right-new_a.left
            new_a.height = new_a.bottom-new_a.top;
            arrangedBox.boundBoxes.splice(i,2,new_a);
            console.log("한글 초성 예상 과 모음 합침",new_a);
            // console.log(arrangedBox.boundBoxes);
          }
        }
      }
    }
  }
  return BoundBoxTool;
}(mocr)
