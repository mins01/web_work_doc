"use strict";
if(!mocr){
  var mocr = {};
}
if(!mocr.ImageTool){
  console.error("required mocr.ImageTool");
}

mocr.ArrangedBoxes = function(mocr){
  var ArrangedBoxes = function(){
    this.init();
  }
  ArrangedBoxes.prototype = {
    boxes:null,
    init:function(){
      this.arrangedBoxes = [];
    },
    inputBoundBoxes:function(boundBoxes){
      var arrangedBoxes = [];
      boundBoxes.sort(function(a,b){ // left순으로 정렬
        return a.left - b.left;
      })
      for(var i=0,m=boundBoxes.length;i<m;i++){
        var a = boundBoxes[i];
        var checked = false;
        for(var i2=0,m2=arrangedBoxes.length;i2<m2;i2++){
          var sh = arrangedBoxes[i2];
          var gap = 0;
          if(a.top <= sh.bottom+gap && a.bottom >= sh.top-gap){
            var dist = mocr.BoundBoxTool.getDistance(a,sh);
            if(dist[2]>sh.height*3){
              // console.log("거리가 높이에서 3배초과 ",dist);
              continue;
            } //거리가 높이에 3초과이면 무시한다.
            sh.top = Math.min(a.top,sh.top);
            sh.bottom = Math.max(a.bottom,sh.bottom);
            sh.left = Math.min(a.left,sh.left);
            sh.right = Math.max(a.right,sh.right);
            sh.width = sh.right-sh.left;
            sh.height = sh.bottom-sh.top;
            checked = true;
            // sh.boundBoxes.push(a);
          }
        }
        if(!checked){
          // arrangedBoxes.push({left:a.left,right:a.right,top:a.top,bottom:a.bottom,width:a.width,height:a.height,boundBoxes:[a]});
          arrangedBoxes.push({left:a.left,right:a.right,top:a.top,bottom:a.bottom,width:a.width,height:a.height,boundBoxes:[]});
        }
      }

      //-- size가 큰 순으로 정렬
      arrangedBoxes.sort(function(a,b){
        return b.width*b.height-a.width*a.height
      })
      // console.log("arrangedBoxes",arrangedBoxes);
      // 겹치는 arrangedBoxes 합치기
      var new_arrangedBoxes = [];
      for(var i=0,m=arrangedBoxes.length;i<m;i++){
        var a = arrangedBoxes[i];
        var checked = false
        for(var i2=0,m2=new_arrangedBoxes.length;i2<m2;i2++){
          var b = new_arrangedBoxes[i2];
          // console.log(b);
          if(a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom ){ //영역 겹침
            b.left = Math.min(a.left,b.left);
            b.top = Math.min(a.top,b.top);
            b.right = Math.max(a.right,b.right);
            b.bottom = Math.max(a.bottom,b.bottom);
            b.width=b.right-b.left;
            b.height=b.bottom-b.top;
            checked = true;
          }
        }
        if(!checked){
          new_arrangedBoxes.push(Object.assign({},a));
        }
      }
      arrangedBoxes = new_arrangedBoxes;
      // console.log("arrangedBoxes",arrangedBoxes);

      // 위에 있고 왼쪽에 있는 순으로 정렬
      arrangedBoxes.sort(function(a,b){
        var r = a.top-b.top;
        if(r==0){
          r = a.left-b.left;
        }
        return r;
      })

      // arrangedBoxes 에 포함되는 boundBox 를 뽑아서 넣기
      for(var i=0,m=boundBoxes.length;i<m;i++){
        var a = boundBoxes[i];
        for(var i2=0,m2=arrangedBoxes.length;i2<m2;i2++){
          var b = arrangedBoxes[i2];
          if(a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom ){ //영역 겹침
            var new_a = Object.assign({},a);
            // new_a.top = b.top; new_a.bottom = b.bottom; new_a.height = new_a.bottom-new_a.top; //top과 bottom을 arrangedBox 기준으로 바꾼다.
            b.boundBoxes.push(new_a);
          }
          arrangedBoxes[i2].boundBoxes.sort(function(a,b){ // left순으로 정렬
            return a.left - b.left;
          })
        }
      }




      for(var i=0,m2=arrangedBoxes.length;i<m2;i++){
        var arrangedBox = arrangedBoxes[i];

        // 겹치는 글자 합치기
        mocr.BoundBoxTool.union4OverlapInArrangedBox(arrangedBox);
        mocr.BoundBoxTool.union4OverlapInArrangedBox(arrangedBox);
        // arrangedBoxes[i].boundBoxes = mocr.BoundBoxTool.union4OverlapByX(arrangedBoxes[i].boundBoxes);//겹치는 부분 합치기
        // arrangedBoxes[i].boundBoxes = mocr.BoundBoxTool.union4OverlapByX(arrangedBoxes[i].boundBoxes);//겹치는 부분 합치기
        // arrangedBoxes[i].boundBoxes = mocr.BoundBoxTool.union4overlapByX(arrangedBoxes[i].boundBoxes)
        // arrangedBoxes[i].boundBoxes = mocr.BoundBoxTool.union4overlapByX(arrangedBoxes[i].boundBoxes)

        // arrangedBox 의 baseline,fontSize 찾기
        mocr.BoundBoxTool.generateFontSize4ArrangedBox(arrangedBox);
        // 한글 합침
        mocr.BoundBoxTool.union4GangulInArrangedBox(arrangedBoxes[i]);
      }

      // mocr.BoundBoxTool.union4GangulInArrangedBox(arrangedBoxes[3]);

      this.arrangedBoxes = arrangedBoxes;
    },


  }
  return ArrangedBoxes;
}(mocr)
