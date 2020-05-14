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
            if(
              new_a.left <= b.right && b.left <= new_a.right
              // && Math.abs(b.left - new_a.right) > (new_a.width+b.width)*0.01 //살짝 겹치는 것 무시
              // && new_a.right - b.left < (new_a.width+b.width)/2*0.01
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
    union4HangulInArrangedBox:function(arrangedBox){
      // console.log(arrangedBox.boundBoxes);
      for(var i=0;i<arrangedBox.boundBoxes.length-1;i++){
        var a = arrangedBox.boundBoxes[i];
        var dist_top = Math.abs(arrangedBox.top - a.top);
        var dist_baseline = Math.abs(arrangedBox.baseline - a.bottom);
        var dist_top_baseline = Math.abs(dist_top-dist_baseline);
        // console.log(i,arrangedBox.height,a.height ,"<=", arrangedBox.fontSize*1.1
        //               ,a.bottom ,"<=",arrangedBox.baseline*1.1
        //               ,a.width ,">=", arrangedBox.fontSize*0.3
        //               ,dist_top_baseline ,"<", arrangedBox.fontSize*0.2
        //             );
        var isKrLeft = (a.height >= arrangedBox.fontSize*0.8 || (arrangedBox.baseline - a.bottom) > arrangedBox.fontSize*0.02);
        // console.log('한글왼쪽',isKrLeft);
        if(
          a.height <= arrangedBox.fontSize*1.1
          // && a.bottom <= arrangedBox.baseline*1.1
          && a.width >= arrangedBox.fontSize*0.3
          // && dist_top_baseline < arrangedBox.fontSize*0.2
          && isKrLeft
        ){
          var b = arrangedBox.boundBoxes[i+1]
          var tmp_w = b.right-a.left;
          var dist = this.getDistance(a,b);


          // console.log("한글 초성 예상",tmp_w ,">=", arrangedBox.fontSize*0.7
          //  , tmp_w ,"<", arrangedBox.fontSize
          //  ,dist[0], "<", arrangedBox.fontSize*0.5
          //  ,b.height,">=",arrangedBox.fontSize*0.9
          //  ,a.height*0.9,'<=',b.height);
          if(tmp_w >= arrangedBox.fontSize*0.6
            && tmp_w <= arrangedBox.fontSize
            && dist[0] < arrangedBox.fontSize*0.5
            && b.height >= arrangedBox.fontSize*0.8
            && a.height*0.9 <= b.height){
            var new_a = Object.assign({},a);
            new_a.left = Math.min(new_a.left,b.left);
            new_a.top = Math.min(new_a.top,b.top);
            new_a.right = Math.max(new_a.right,b.right);
            new_a.bottom = Math.max(new_a.bottom,b.bottom);
            new_a.width = new_a.right-new_a.left
            new_a.height = new_a.bottom-new_a.top;
            arrangedBox.boundBoxes.splice(i,2,new_a);
            // console.log("한글 초성 예상 과 모음 합침",new_a);
            // console.log(arrangedBox.boundBoxes);
          }
        }
      }
    },
    // baseline,fontSize,whitespaceWidth 찾기
    generateFontSize4ArrangedBox:function(arrangedBox) {
      var avg_bottom = arrangedBox.boundBoxes.reduce(function(accumulator, boundBox, currentIndex, array) {
        return accumulator + boundBox.bottom;
      }, 0)/arrangedBox.boundBoxes.length;

      var limit_bottom = Math.ceil(avg_bottom) + Math.ceil((arrangedBox.bottom-avg_bottom)*0.5);
      var limit_bottom = Math.ceil(avg_bottom);

      // 평균 bottom 보다 크면 무시하면서 최대 bottom을 찾는다.
      var max_bottom = arrangedBox.boundBoxes.reduce(function(accumulator, boundBox, currentIndex, array) {
        if(boundBox.bottom > limit_bottom){
          // console.log('skip',currentIndex,boundBox.bottom,'<=',limit_bottom,boundBox); //여기에 걸리는건 y나 g 같은 baseline 밑으로 출력되는 것!
          return accumulator
        }
        // console.log('ok',currentIndex,boundBox.bottom,'<=',limit_bottom,boundBox);
        // i_cnt++;
        return accumulator > boundBox.bottom ? accumulator:boundBox.bottom;
      }, 0)

      arrangedBox.baseline = max_bottom;
      arrangedBox.fontSize = arrangedBox.baseline-arrangedBox.top;

      // 너비 높이의 비율이 0.9와 1.1 사이인 것을 찾고 그 최대 너비를 구한다. 그 최대 너비가 fontSize보다 크다며 fontSiz를 최대 너비로 바꾼다.
      var max_w = arrangedBox.fontSize
      arrangedBox.boundBoxes.forEach((boundBox, i) => {
        var wh = boundBox.width/boundBox.height;
        if(wh >= 0.9 && wh <= 1.1){ //거의 정 사각형이라고 판단. 전각문자로 처리.
          max_w = Math.max(max_w,boundBox.width)
        }

      });
      // max_bottom,fontSize 재정의
      if(arrangedBox.fontSize < max_w){
        max_bottom = arrangedBox.top+max_w;
        arrangedBox.baseline = max_bottom;
        arrangedBox.fontSize = arrangedBox.baseline-arrangedBox.top;
      }

      // console.log('baseline 계산용',arrangedBox.bottom,limit_bottom,max_bottom);

      arrangedBox.baseline = max_bottom;
      arrangedBox.fontSize = arrangedBox.baseline-arrangedBox.top;
      // console.log(arrangedBox.fontSize,arrangedBox,limit_bottom,max_bottom);

      arrangedBox.whitespaceWidth = arrangedBox.fontSize*0.5;
      // arrangedBox.minWhitespaceWidth = arrangedBox.fontSize*0.2;
    },
    addWhiteSpaceInArrangedBox:function(arrangedBox){
      // console.log(arrangedBox.boundBoxes);
      if(arrangedBox.boundBoxes.length<3){return;}
      // var whitespaceWidth = arrangedBox.fontSize*0.5;
      // console.log("xxx",arrangedBox);
      for(var i=0;i<arrangedBox.boundBoxes.length-1;i++){
        var a = arrangedBox.boundBoxes[i];
        var b = arrangedBox.boundBoxes[i+1];
        var dist = this.getDistance(a,b);
        if(
          dist[0] >= arrangedBox.whitespaceWidth
          // || (dist[0] < arrangedBox.whitespaceWidth && dist[0] >= arrangedBox.minWhitespaceWidth && b.right-a.left > arrangedBox.fontSize*2.4)
        ){
          // console.log(i,dist[0],">=",arrangedBox.whitespaceWidth);
          var wsWidth = Math.ceil(dist[0] * 0.6)
          var new_a = Object.assign({},a);
          // new_a.left =  a.right+Math.ceil((b.left-a.right-wsWidth)/2);
          new_a.left =  Math.ceil((a.right+b.left-wsWidth)/2);
          new_a.right = Math.ceil((a.right+b.left+wsWidth)/2);
          new_a.top = arrangedBox.top;
          new_a.bottom = arrangedBox.baseline;
          new_a.width = new_a.right-new_a.left
          new_a.height = new_a.bottom-new_a.top;
          arrangedBox.boundBoxes.splice(i+1,0,new_a);
          // console.log("space 추가",i,new_a,a,b);
          i++;
        }

      }
    }
  }
  return BoundBoxTool;
}(mocr)
