/**
* ColorPalette
* 컬러 파레트
* "공대여자는 이쁘다"를 표시기해야 쓸 수 있습니다.
*/

var ColorPalette = function(i_opt){
  /* === 옵션 초기화 === */
  var opt = Object.assign({"defColor":"#000000","bookmark":[],"maxHistory":10,"localStorageHistoryKey":"ColorPalette-history-key"},i_opt?i_opt:{});
  
  /* === 기본 노트 생성 === */
  
  var innerHTML = '<div class="colorPalette" translate="no"> \
  <div class="colorPalette-tab colorPalette-tab-hsl" data-h="0" data-s="0" data-l="0" > \
  <div class="colorPalette-box colorPalette-box-sl"> \
  <div class="colorPalette-range colorPalette-range-s colorPalette-bg-h"></div> \
  <div class="colorPalette-range colorPalette-range-l"></div> \
  <div class="colorPalette-bar colorPalette-bar-s"></div> \
  <div class="colorPalette-bar colorPalette-bar-l"></div>					 \
  </div> \
  <div class="colorPalette-box colorPalette-box-h ColorPalette-h-landscape" width="50" height="300"> \
  <div class="colorPalette-range colorPalette-range-h"></div> \
  <div class="colorPalette-bar colorPalette-bar-h"></div> \
  </div> \
  </div> \
  <div  class="colorPalette-tab colorPalette-tab-info"> \
  <div class="colorPalette-box colorPalette-box-btns"> \
  <button type="button" class="colorPalette-btn colorPalette-btn-curr colorPalette-bg-color-curr"></button> \
  <button type="button" class="colorPalette-btn colorPalette-btn-new colorPalette-bg-color-new"></button> \
  <button type="button" class="colorPalette-btn colorPalette-btn-confirm"></button> \
  <button type="button" class="colorPalette-btn colorPalette-btn-cancel"></button> \
  </div> \
  <div class="colorPalette-box colorPalette-box-hsl"> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="H " data-suffix="°" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-h" type="range" min="0" max="360" step="1"  /> \
  </div> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="S " data-suffix="%" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-s" type="range" min="0" max="100" step="1"  /> \
  </div> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="L " data-suffix="%" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-l" type="range" min="0" max="100" step="1"  /> \
  </div> \
  </div> \
  <div class="colorPalette-box colorPalette-box-rgb"> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="R " data-suffix="" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-r" type="range" min="0" max="255" step="1"  /> \
  </div> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="G " data-suffix="" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-g" type="range" min="0" max="255" step="1"  /> \
  </div> \
  <div class="inputRangeBox inputRangeBox-design-1" data-value="" data-prefix="B " data-suffix="" style="width:100%;"> \
  <input class="colorPalette-text colorPalette-text-b" type="range" min="0" max="255" step="1"  /> \
  </div> \
  </div> \
  <div class="colorPalette-box colorPalette-box-colorString"> \
  <dl> \
  <dt>HSL</dt> \
  <dd><input spellcheck="false" class="colorPalette-text colorPalette-text-hsl" type="text" readonly/></dd> \
  </dl> \
  <dl> \
  <dt>RGB</dt> \
  <dd><input spellcheck="false" class="colorPalette-text colorPalette-text-rgb" type="text" readonly/></dd> \
  </dl> \
  <dl> \
  <dt>HEX</dt> \
  <dd><input spellcheck="false" class="colorPalette-text colorPalette-text-hex" type="text" pattern="^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$" maxlength="7" />	</dd> \
  </dl> \
  </div> \
  </div> \
  <div class="colorPalette-tab colorPalette-tab-colors"> \
  <div class="colorPalette-history"> \
  </div> \
  </div> \
  </div>';
  
  // var cp = document.getElementById("test");
  var div = document.createElement('div');
  div.innerHTML = innerHTML;
  var cp = div.querySelector(".colorPalette");
  div = null;
  var tab_hsl = cp.querySelector(".colorPalette-tab-hsl");
  var tab_colors = cp.querySelector(".colorPalette-tab-colors");
  var box_sl = cp.querySelector(".colorPalette-box-sl");
  var box_h = cp.querySelector(".colorPalette-box-h");
  var range_s = cp.querySelector(".colorPalette-range-s");
  var range_l = cp.querySelector(".colorPalette-range-l");
  var range_h = cp.querySelector(".colorPalette-range-h");
  var bar_s = cp.querySelector(".colorPalette-bar-s");
  var bar_l = cp.querySelector(".colorPalette-bar-l");
  var bar_h = cp.querySelector(".colorPalette-bar-h");
  var text_h = cp.querySelector(".colorPalette-text-h");
  var text_s = cp.querySelector(".colorPalette-text-s");
  var text_l = cp.querySelector(".colorPalette-text-l");
  var text_r = cp.querySelector(".colorPalette-text-r");
  var text_g = cp.querySelector(".colorPalette-text-g");
  var text_b = cp.querySelector(".colorPalette-text-b");
  var text_hsl = cp.querySelector(".colorPalette-text-hsl");
  var text_rgb = cp.querySelector(".colorPalette-text-rgb");
  var text_hex = cp.querySelector(".colorPalette-text-hex");
  var btn_curr = cp.querySelector(".colorPalette-btn-curr");
  var btn_new = cp.querySelector(".colorPalette-btn-new");
  var btn_confirm = cp.querySelector(".colorPalette-btn-confirm");
  var btn_cancel = cp.querySelector(".colorPalette-btn-cancel");
  var bg_h = cp.querySelectorAll(".colorPalette-bg-h");
  var bg_color_curr = cp.querySelectorAll(".colorPalette-bg-color-curr");
  var bg_color_new = cp.querySelectorAll(".colorPalette-bg-color-new");
  
  var cp_history = [];
  var bookmark =[];
  var c_obj = new ColorPalette.Color({r:0,g:0,b:0}); //선택된
  var c_obj_pre = new ColorPalette.Color({r:0,g:0,b:0}); //선택중인
  var c_obj_tmp = new ColorPalette.Color({r:0,g:0,b:0}); //계산용
  var c_hsl = {h:0,s:0,l:0};
  var c_hsl_pre = {h:0,s:0,l:0};
  bar_s.style.top=0;  bar_s.style.left=0;
  bar_l.style.top=0;  bar_l.style.left=0;
  bar_h.style.top=0;  bar_h.style.left=0;
  /* === 프라이빗 메소드 === */
  var _getXY = function(evt){
    var x = evt.clientX;
    var y = evt.clientY;
    if(evt.isPrimary ){
      var x = evt.clientX;
      var y = evt.clientY;
    }else if(evt.touches && evt.touches[0]){
      var touch = evt.touches[0];
      var x = touch.X;
      var y = touch.Y;
    }else{
      var x = evt.x;
      var y = evt.y;
    }
    return [x,y];
  }
  function addColorHistory(rgb){
    c_obj_tmp.set(rgb)
    var stringRGB = c_obj_tmp.toStringRGB(rgb);
    if(!cp_history.find(function(v){c_obj_tmp.set(v);return stringRGB==c_obj_tmp.toStringRGB();})
    && !bookmark.find(function(v){c_obj_tmp.set(v);return stringRGB==c_obj_tmp.toStringRGB();})){
      cp_history.push(Object.assign({},rgb));  
      showHistory();
    }
    
    
  }
  function saveHistoryToLS(){
    localStorage.setItem(opt.localStorageHistoryKey,JSON.stringify(cp_history));
  }
  function initHistoryFromLS(){
    cp_history = JSON.parse(localStorage.getItem(opt.localStorageHistoryKey));
    if(!cp_history){
      cp_history = [];
    }
    showHistory();
  }
  function showHistory(){
    tab_colors.innerHTML = "";
    var maxHistory = parseInt(opt.maxHistory);
    if(cp_history.length > maxHistory){
      cp_history.splice(0,cp_history.length-maxHistory);
    }
    saveHistoryToLS()
    var his,rgb,stringHEX;
    for(var i=0,m=bookmark.length;i<m;i++){
      rgb= bookmark[i];
      c_obj_tmp.set(rgb);
      his = document.createElement('button');
      his.className="colorPalette-color colorPalette-bookmark"
      his.type = "button";
      his.rgb = Object.assign({},rgb);
      stringHEX = c_obj_tmp.toStringHEX();
      his.style.backgroundColor = stringHEX;
      his.setAttribute('data-stringHEX',stringHEX);
      tab_colors.appendChild(his);  
    }   
    for(var m=0,i=cp_history.length;i>m;i--){
      rgb= cp_history[i-1];
      c_obj_tmp.set(rgb);
      his = document.createElement('button');
      his.className="colorPalette-color colorPalette-history"
      his.type = "button";
      his.rgb = Object.assign({},rgb);
      stringHEX = c_obj_tmp.toStringHEX();
      his.style.backgroundColor = stringHEX;
      his.setAttribute('data-stringHEX',stringHEX);
      tab_colors.appendChild(his);  
    }    
  }
  var _sync = function(byInput){
    var hsl = c_hsl_pre;
    var rgb = c_obj_pre.toRGB();
    bar_h.style.top=(hsl.h/360)*100+'%';
    
    for(var i=0,m=bg_h.length;i<m;i++){
      bg_h[i].style.backgroundColor="hsl("+hsl.h+", 100%, 50%)"
    }
    text_s.style.backgroundColor="hsl("+hsl.h+", 100%, "+hsl.l+"%)"
    text_l.style.backgroundColor="hsl("+hsl.h+", "+hsl.s+"%, 50%)"
    var toStringHSL = "hsl("+hsl.h.toFixed(0)+", "+hsl.s.toFixed(0)+"%,"+hsl.l.toFixed(0)+"%)"
    for(var i=0,m=bg_color_new.length;i<m;i++){
      bg_color_new[i].style.backgroundColor=c_obj_pre.toStringHEX();
      bg_color_new[i].rgb = rgb;
    }
    bar_s.style.left=hsl.s+'%';
    bar_l.style.top=(100-hsl.l)+'%';
    tab_hsl.setAttribute('data-toStringHSL',toStringHSL)
    tab_hsl.setAttribute('data-toStringRGB',c_obj_pre.toStringRGB())
    tab_hsl.setAttribute('data-toStringHEX',c_obj_pre.toStringHEX())
    if(byInput!='hsl'){
      text_h.value = hsl.h.toFixed(0)
      text_s.value = hsl.s.toFixed(0)
      text_l.value = hsl.l.toFixed(0)  
    }
    if(byInput!='rgb'){
      text_r.value = rgb.r.toFixed(0)
      text_g.value = rgb.g.toFixed(0)
      text_b.value = rgb.b.toFixed(0)
    }
    if(byInput!='hex'){
      text_hex.value = c_obj_pre.toStringHEX();
    }
    text_rgb.value = c_obj_pre.toStringRGB();
    text_hsl.value = toStringHSL;
    var stringHEX = c_obj_pre.toStringHEX();
    /* 즐겨찾기에서 선택 색 표시 */
    var t = cp.querySelector('.colorPalette-tab-colors .colorPalette-color[data-selected]:not([data-stringHEX="'+stringHEX+'"])');
    if(t) t.removeAttribute('data-selected');
    var t = cp.querySelector('.colorPalette-tab-colors .colorPalette-color[data-stringHEX="'+stringHEX+'"]');
    if(t) t.setAttribute('data-selected',true);
    /* 선택된  */
    for(var i=0,m=bg_color_curr.length;i<m;i++){
      bg_color_curr[i].style.backgroundColor=c_obj.toStringHEX();
      bg_color_curr[i].rgb = c_obj.toRGB();
    }
  }
  var setBookmark = function(defColor){
    for(var i=0,m=defColor.length;i<m;i++){
      c_obj_tmp.set(defColor[i]);
      // console.log(defColor[i],c_obj_tmp.toRGB(),bookmark)
      bookmark.push(c_obj_tmp.toRGB())
    } 
  }
  /**
  * toStringHSL 색을 hsl(111,99%,99%) 로 나타냄
  * @return {String}
  */
  cp.toStringHSL = function(){
    // return c_obj.toStringHSL();
    return "hsl("+c_hsl.h+", "+c_hsl.s.toFixed(0)+"%,"+c_hsl.l.toFixed(0)+"%)";
  }
  /**
  * toStringRGB 색을 rgb(111,222,99) 로 나타냄
  * @return {String}
  */
  cp.toStringRGB = function(){
    return c_obj.toStringRGB();
  }
  /**
  * toStringHEX 색을 #aabbcc 로 나타냄
  * @return {String}
  */
  cp.toStringHEX = function(){
    return c_obj.toStringHEX();
  }
  /**
  * setHEX HEX로 값을 설정
  * @param  {String} #aabbcc
  */
  cp.setHEX = function(hex_str){
    c_obj.set(hex_str)
    c_obj_pre.set(hex_str)
    c_hsl_pre = c_obj_pre.toHSL()
    _sync('hex')
    cp.dispatchEvent((new CustomEvent("input", {bubbles: true, cancelable: true, detail: {}})));
    cp.dispatchEvent((new CustomEvent("change", {bubbles: true, cancelable: true, detail: {}})));
  }
  /**
  * setColorString 문자열로 값을 설정
  * @param  {String} 색상 문자열
  */
  cp.set = function(str){
    c_obj.set(str)
    c_obj_pre.set(str)
    c_hsl_pre = c_obj_pre.toHSL()
    _sync()
    cp.dispatchEvent((new CustomEvent("input", {bubbles: true, cancelable: true, detail: {}})));
    cp.dispatchEvent((new CustomEvent("change", {bubbles: true, cancelable: true, detail: {}})));
  }
  cp.get = function(){
    var c_obj_t = new ColorPalette.Color(c_obj.toRGB())
    return c_obj_t;
  }

  cp.previewHSL = function(h,s,l){
    // var hsl = c_obj_pre.toHSL();
    c_hsl_pre = {h:h==null?c_hsl_pre.h:parseFloat(h),s:s==null?c_hsl_pre.s:parseFloat(s),l:l==null?c_hsl_pre.l:parseFloat(l)};
    c_obj_pre.set(c_hsl_pre);
    _sync();    
  }
  cp.setPreview = function(obj){
    c_obj_pre.set(obj)
    c_hsl_pre = c_obj_pre.toHSL()
    _sync();
  }
  cp.getPreview = function(){
    var c_obj_t = new ColorPalette.Color(c_obj_pre.toRGB())
    return c_obj_t;
  }

  cp.previewRGB = function(r,g,b){
    var rgb = c_obj_pre.toRGB();
    c_obj_pre.set({r:r==null?rgb.r:r,g:g==null?rgb.g:g,b:b==null?rgb.b:b})
    c_hsl_pre = c_obj_pre.toHSL()
    _sync();
  }  
  /**
  * setHSL hsl 값으로 설정
  * @param  {Number} h 0~360
  * @param  {Number} s 0~100%
  * @param  {Number} l 0~100%
  */
  cp.setHSL = function(h,s,l){
    var hsl = {h:h,s:s,l:l}
    c_obj.set(hsl)
    c_obj_pre.set(hsl)
    c_hsl_pre = c_obj_pre.toHSL()
    _sync();
    cp.dispatchEvent((new CustomEvent("input", {bubbles: true, cancelable: true, detail: {}})));
    cp.dispatchEvent((new CustomEvent("change", {bubbles: true, cancelable: true, detail: {}})));
  }
  /**
  * setRGB rgb 값으로 설정
  * @param  {Number} r 0~255
  * @param  {Number} g 0~255
  * @param  {Number} b 0~255
  */
  cp.setRGB = function(r,g,b){
    var rgb = {r:r,g:g,b:b}
    c_obj.set(rgb)
    c_obj_pre.set(rgb)
    c_hsl_pre = c_obj_pre.toHSL()
    _sync()
    cp.dispatchEvent((new CustomEvent("input", {bubbles: true, cancelable: true, detail: {}})));
    cp.dispatchEvent((new CustomEvent("change", {bubbles: true, cancelable: true, detail: {}})));
  }
  /**
  * toString 컬러 데이터를 JSON 으로 출력 
  * @return {String} {"h":0,"s":72,"l":26,"r":115,"g":19,"b":19}
  
  */
  cp.toString = function(){
    return c_obj.toString();
  }
  /**
  * confirm confirm 동작
  * confirm 이벤트가 발생됨
  */
  cp.confirm = function(){
    var is_changed = (c_obj_pre.toStringRGB()!=c_obj.toStringRGB());
    c_obj.set(c_obj_pre.toRGB());
    c_hsl = Object.assign({},c_hsl_pre);
    addColorHistory(c_obj.toRGB())
    _sync();
    if(is_changed) cp.dispatchEvent((new CustomEvent("change", {bubbles: true, cancelable: true, detail: {}})));
    cp.dispatchEvent((new CustomEvent("confirm", {})));
  }
  /**
  * cancel cancel 동작
  * cancel 이벤트가 발생됨
  */
  cp.cancel = function(){
    c_obj_pre.set(c_obj.toRGB());
    c_hsl_pre = c_obj_pre.toHSL()
    _sync();
    cp.dispatchEvent((new CustomEvent("cancel", {})));
  }
  /* === 이벤트 초기화 부분  ====  */
  var cb_for_h=function(evt,gapX,gapY,target,data){
    // if(gapX==0){return;}
    var bcr = target.getBoundingClientRect();
    var xy = _getXY(evt);
    var x = xy[0], y = xy[1];
    // x-=bcr.left
    y-=bcr.top
    // x = Math.max(0,Math.min(bcr.width,x));
    y = Math.max(0,Math.min(bcr.height,y));
    // var h = x/bcr.width*360;
    var h = y/bcr.height*360;
    // console.log(h)
    cp.previewHSL(h,null,null);
    cp.dispatchEvent((new CustomEvent("input", {bubbles: true, cancelable: true, detail: {}})));
    if(evt.type=="pointerup"){
      cp.dispatchEvent((new CustomEvent("change", {bubbles: true, cancelable: true, detail: {}})));
    }
  }
  toDraggable(box_h,cb_for_h,cb_for_h,function(){cp.dispatchEvent((new CustomEvent("change", {bubbles: true, cancelable: true, detail: {}})));});
  var cb_for_sl=function(evt,gapX,gapY,target,data){
    // if(gapX==0){return;}
    var bcr = target.getBoundingClientRect();
    var xy = _getXY(evt);
    var x = xy[0], y = xy[1];
    x-=bcr.left
    y-=bcr.top
    x = Math.max(0,Math.min(bcr.width,x));
    y = Math.max(0,Math.min(bcr.height,y));
    var s = x/bcr.width*100;
    // var t = (200-s)/100;
    // var l = (1-y/bcr.height)*50*t;
    var l = (1-y/bcr.height)*100;
    // console.log(s,l)
    cp.previewHSL(null,s,l);
    cp.dispatchEvent((new CustomEvent("input", {bubbles: true, cancelable: true, detail: {}})));
  }
  toDraggable(box_sl,cb_for_sl,cb_for_sl,function(){cp.dispatchEvent((new CustomEvent("change", {bubbles: true, cancelable: true, detail: {}})));});
  var cb_hsl = function(evt){cp.previewHSL(text_h.value,text_s.value,text_l.value)}
  text_h.addEventListener("input",cb_hsl);
  text_s.addEventListener("input",cb_hsl);
  text_l.addEventListener("input",cb_hsl);
  var cb_rgb = function(evt){cp.previewRGB(text_r.value,text_g.value,text_b.value)}
  text_r.addEventListener("input",cb_rgb);
  text_g.addEventListener("input",cb_rgb);
  text_b.addEventListener("input",cb_rgb);
  var cb_hex = function(evt){
    var reg = new RegExp(this.pattern, "");
    if (reg.test(this.value)) {
      // The ZIP follows the constraint, we use the ConstraintAPI to tell it
      this.setCustomValidity("");
    }else{
      this.setCustomValidity("HEX TYPE : #0cA9fF or #09f")
      console.log("HEX TYPE : #0cA9fF or #09f");
    }
    if(!this.reportValidity()){    
      return;
    }
    cp.setHEX(this.value)
    console.log(this.value);
  }
  text_hex.addEventListener("input",cb_hex);
  var cb_confirm = function(evt){cp.confirm()}
  btn_confirm.addEventListener("click",cb_confirm);
  var cb_cancel = function(evt){cp.cancel()}
  btn_cancel.addEventListener("click",cb_cancel);
  var cb_curr = function(evt){cp.setPreview(this.rgb);}
  btn_curr.addEventListener("click",cb_curr);
  // btn_new.addEventListener("click",cb_curr);
  tab_colors.addEventListener("click",function(evt){
    var target = evt.target;
    if(!target.rgb){return;}
    cp.setPreview(target.rgb);
    _sync();
  });
  // tab_colors.addEventListener("dblclick",function(evt){
  //   var target = evt.target;
  //   if(!target.rgb){return;}
  //   cp.set(target.rgb);
  //   _sync();
  //   cp.confirm();
  // });
  /* === 내용 초기화 === */
  c_obj.set(opt.defColor)
  c_obj_pre.set(opt.defColor)
  c_hsl_pre = c_obj_pre.toHSL()
  setBookmark(opt.bookmark);
  initHistoryFromLS();
  _sync();
  btn_curr.style.backgroundColor=c_obj.toStringHEX();
  for(var i=0,m=bg_color_curr.length;i<m;i++){
    bg_color_curr[i].style.backgroundColor=c_obj.toStringHEX();
    bg_color_curr[i].rgb = c_obj.toRGB();
  }
  
  
  
  return cp;
}

/**
* 색 클래스
*/
ColorPalette.Color = (function(Color){
  var Color = function(i_str){
    this.init(i_str);
  }
  // http://hsl2rgb.nichabi.com/javascript-function.php
  function hsl2rgb (h, s, l) {
    
    var r, g, b, m, c, x
    
    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0
    
    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6
    
    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))
    
    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))
    
    if (h < 1) {
      r = c
      g = x
      b = 0
    } else if (h < 2) {
      r = x
      g = c
      b = 0
    } else if (h < 3) {
      r = 0
      g = c
      b = x
    } else if (h < 4) {
      r = 0
      g = x
      b = c
    } else if (h < 5) {
      r = x
      g = 0
      b = c
    } else {
      r = c
      g = 0
      b = x
    }
    
    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    
    return { r: r, g: g, b: b }
    
  }
  // http://rgb2hsl.nichabi.com/javascript-function.php
  function rgb2hsl (r, g, b) {
    var max, min, h, s, l, d
    r /= 255
    g /= 255
    b /= 255
    max = Math.max(r, g, b)
    min = Math.min(r, g, b)
    l = (max + min) / 2
    if (max == min) {
      h = s = 0
    } else {
      d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
        case g:
        h = (b - r) / d + 2
        break
        case b:
        h = (r - g) / d + 4
        break
      }
      h /= 6
    }
    h = Math.round(h * 360) //floor -> round
    s = Math.round(s * 100) //floor -> round
    l = Math.round(l * 100) //floor -> round
    return { h: h, s: s, l: l }
  }
  Color.prototype = {
    "init":function(i_str){
      this.rgb_data = {r:0,g:0,b:0}
      this.toStringType="hex";
      if(i_str){
        this.set(i_str)
      }
    },
    "rgb2hsl":function(r,g,b){
      return rgb2hsl(r,g,b)
    },
    "hsl2rgb":function(h,s,l){
      return hsl2rgb(h,s,l)
    },
    "toString":function(toStringType){
      if(!toStringType) toStringType = this.toStringType;
      var fn = this["toString"+toStringType.toUpperCase()];
      if(fn){
        return this["toString"+toStringType.toUpperCase()]();
      }else{
        throw "not supported toStringType : "+toStringType;
        return;
      }
    },
    "toHSL":function(){
      return rgb2hsl(this.rgb_data.r,this.rgb_data.g,this.rgb_data.b);
    },
    "toRGB":function(){
      return {r:this.rgb_data.r,g: this.rgb_data.g,b: this.rgb_data.b};
    },
    "toHEX":function(){
      return this.toStringHEX();
    },
    "toStringHSL":function(){
      var t_hsl_data = this.toHSL();
      return "hsl("+t_hsl_data.h.toFixed(0)+","+t_hsl_data.s.toFixed(0)+"%,"+t_hsl_data.l.toFixed(0)+"%)";
    },
    "toStringRGB":function(){
      var t_rgb_data = this.rgb_data;
      return "rgb("+t_rgb_data.r.toFixed(0)+","+t_rgb_data.g.toFixed(0)+","+t_rgb_data.b.toFixed(0)+")";
    },
    "toStringHEX":function(){
      var t_rgb_data = this.rgb_data;
      return '#'+((t_rgb_data.r.toFixed(0)<16)?'0':'')+t_rgb_data.r.toString(16)+((t_rgb_data.g.toFixed(0)<16)?'0':'')+t_rgb_data.g.toString(16)+((t_rgb_data.b.toFixed(0)<16)?'0':'')+t_rgb_data.b.toString(16);
    },
    "set":function(i_arg){
      if(i_arg instanceof Object){
        if(i_arg.r != undefined && i_arg.g != undefined && i_arg.b != undefined  ){
          var rgb ={"r":parseInt(i_arg.r),"g":parseInt(i_arg.g),"b":parseInt(i_arg.b)}
        }else if(i_arg.h != undefined && i_arg.s != undefined && i_arg.l != undefined  ){
          var hsl ={"h":parseInt(i_arg.h),"s":parseInt(i_arg.s),"l":parseInt(i_arg.l)}
          var rgb = hsl2rgb(hsl.h,hsl.s,hsl.l);
        }else{
          console.error(i_arg)
          throw "invalid color format";
          return;
        }
      }else if(typeof i_arg =="string"){
        var str = i_arg.toLowerCase().trim().replace(/\s/g,'');
        if(/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/.test(str)){
          str = str.replace(/(^rgb|[^\d,])/g,'');
          var t = str.split(',');
          var rgb ={"r":parseInt(t[0]),"g":parseInt(t[1]),"b":parseInt(t[2])}
        }else if(/^hsl\(\d{1,3},\d{1,3}%,\d{1,3}%\)$/.test(str)){
          str = str.replace(/(^hsl|[^\d,])/g,'');
          var t = str.split(',');
          var hsl ={"h":parseInt(t[0]),"s":parseInt(t[1]),"l":parseInt(t[2])}
          var rgb = hsl2rgb(hsl.h,hsl.s,hsl.l);
        }else if(/^#([0-9A-Fa-f]{3}|[0-9A-Za-z]{6})$/.test(str)){
          str = str.replace(/^#/,'');
          if(str.length==3){
            str = str[0]+str[0]+str[1]+str[1]+str[2]+str[2];
          }
          var r = parseInt((str[0]+str[1]),16);
          var g = parseInt((str[2]+str[3]),16);
          var b = parseInt((str[4]+str[5]),16);
          var rgb ={"r":r,"g":g,"b":b}
        }else{
          throw "invalid color format";
          return;
        }
      
      }
      this.rgb_data = rgb;
    }
    
  }
  return Color;
})()