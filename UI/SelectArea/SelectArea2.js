(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

var SelectArea = (function(){
	
	var toDragable = {
		"addListener":function(target,cb_onpointerMove,cb_onpointerUp){
			target.ing = false;
			target.x0 = 0;
			target.y0 = 0;
			target.cb_onpointerMove = cb_onpointerMove;
			target.cb_onpointerUp = cb_onpointerUp;
			target._getXY = this._getXY;
			
			target.addEventListener('pointerdown',this._onpointerdown(target));
			target.addEventListener('touchmove',function(evt){ evt.preventDefault();evt.stopPropagation()	;return false;});
			document.addEventListener('pointermove',this._onpointermove(target));
			document.addEventListener('pointerup',this._onpointerup(target));
		},
		"_getXY":function(evt){
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
		},
		"_onpointerdown":function(target){
			// var target = evt.target;
			return function(evt){
				target.ing = true;
				var xy = target._getXY(evt);
				target.x0 = xy[0];
				target.y0 = xy[1];
				// console.log(evt.type)
				evt.preventDefault();evt.stopPropagation()	;
				return false;
			}			
		},
		"_onpointermove":function(target){
			// var target = evt.target;
			return function(evt){
				// console.log(target);
				if(!target.ing){return;}
				var xy = target._getXY(evt);
				var gapX = xy[0]-target.x0;
				var gapY = xy[1]-target.y0;
				target.x0 = xy[0];
				target.y0 = xy[1];
				if(target.cb_onpointerMove){
					target.cb_onpointerMove(evt,gapX,gapY);
				}
				evt.preventDefault();evt.stopPropagation()	;
				return false;
			}
		},
		"_onpointerup":function(target){
			return function(evt){
				// var target = evt.target;
				if(target.ing && target.cb_onpointerUp){
					target.cb_onpointerUp(evt);
				}
				target.ing = false;
				evt.preventDefault();evt.stopPropagation()	;
			}
			
		}
	}
	
	
	var _create = function(saTarget){
		var sa = document.createElement('div');
		sa.className="selectArea";
		sa.innerHTML =
		'<div class="selectArea-box">'+
		'<div class="selectArea-pointer" data-index="0" data-x="0" data-y="0"></div>'+
		'<div class="selectArea-pointer" data-index="1"></div>'+
		'<div class="selectArea-pointer" data-index="2"></div>'+
		'<div class="selectArea-pointer" data-index="3"></div>'+
		'<div class="selectArea-pointer" data-index="4" data-w="0" data-h="0"></div>'+
		'<div class="selectArea-pointer" data-index="5"></div>'+
		'<div class="selectArea-pointer" data-index="6"></div>'+
		'<div class="selectArea-pointer" data-index="7"></div>'+
		'<div class="selectArea-layout"></div>'+
		'</div>'+
		'<div class="selectArea-bg"></div>';
		sa.box=sa.querySelector('.selectArea-box');
		sa.bg=sa.querySelector('.selectArea-bg');
		sa.box.pointers=sa.querySelectorAll('.selectArea-pointer');
		sa.box.layout=sa.querySelector('.selectArea-layout');
		sa.saTarget = saTarget
		sa.saTarget.sa = sa;
		var p_bcr = sa.saTarget.getBoundingClientRect();

		sa.x = 0;
		sa.y = 0;
		sa.w = p_bcr.width;
		sa.h = p_bcr.height;
		sa.x1 = sa.x+sa.w;
		sa.y1 = sa.y+sa.h;
		return sa;
	}
	var _initMethod = function(sa){
		sa.show = function(x,y,x1,y1){
			document.body.appendChild(this);
			var p_bcr = this.saTarget.getBoundingClientRect();
			// console.log(p_bcr)
			if(x == undefined) x = 0;
			if(y == undefined) y = 0;
			if(x1 == undefined) x1 = p_bcr.width + x;
			if(y1 == undefined) y1 = p_bcr.height + y;
			var t = 0;
			if(x > x1){t = x;x = x1;x1 = t;}
			if(y > y1){t = y;y = y1;y1 = t;}
			this.x = x;
			this.y = y;
			this.x1 = x1;
			this.y1 = y1
			this.syncPosCoordinate(x,y,x1,y1);
		}
		sa.hide = function(){
			if(this.parentNode) this.parentNode.removeChild(this);
		}
		sa.destroy = function(){
			this.parentNode.removeChild(this);
			delete this.saTarget.sa;
		}
		sa.syncPosCoordinate = function(x,y,x1,y1){
			_syncPosCoordinate(this,x,y,x1,y1);
		}
		sa.syncPos = function(x,y,w,h){
			var p_bcr = sa.saTarget.getBoundingClientRect();
			if(x+w>p_bcr.width){
				x=p_bcr.width-this.w;
			}
			if(y+h>p_bcr.height){
				y=p_bcr.height-this.h;
			}
			this.syncPosCoordinate(x,y,x+w,y+h);
		}
		sa.syncPosBy = function(x,y,w,h){
			if(this.w==0){x=0;}
			if(this.h==0){y=0;}
			var p_bcr = sa.saTarget.getBoundingClientRect();
			if(x!=0 && (this.x1+x>p_bcr.width || this.x+x<0)){
				x=0;
				w=0;
			}
			if(y!=0 && (this.y1+y>p_bcr.height || this.y+y<0)){
				y=0;
				h=0;
			}

			this.syncPos(this.x+x,this.y+y,this.w+w,this.h+h);
		}
		sa.syncPosCoordinateBy = function(x,y,x1,y1){
			var t = 0;
			// var p_bcr = sa.saTarget.getBoundingClientRect();

			var x_e = this.x+x;
			var y_e = this.y+y;
			var x1_e = this.x1+x1;
			var y1_e = this.y1+y1;
			var w = x1_e-x_e;
			var h = y1_e-y_e;
			// console.log(x,y,w,h,x1,y1)
			this.syncPosCoordinate(x_e,y_e,x1_e,y1_e);
		}
		sa._window_onresize = function(evt){
			this._syncPos(this.x,this.y,this.w-this.x,this.h-this.y);
			evt.preventDefault();evt.stopPropagation();
		}
		sa.toDragable_onpointerup = function(thisC){
			return function(evt){
				var t = 0;
				if(thisC.x > thisC.x1){t = thisC.x;thisC.x = thisC.x1;thisC.x1 = t;}
				if(thisC.y > thisC.y1){t = thisC.y;thisC.y = thisC.y1;thisC.y1 = t;}
				thisC.syncPosCoordinate(thisC.x,thisC.y,thisC.x1,thisC.y1);
			}
		}(sa)
		
		
	}
	var _initEvent = function(sa){
		toDragable.addListener(sa.box.layout,function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(gapX,gapY,0,0);
			thisC.dispatchEvent((new CustomEvent("move", {}) ));
		}}(sa),sa.toDragable_onpointerup);
		toDragable.addListener(sa.box.pointers[0],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosCoordinateBy(gapX,gapY,0,0)
			thisC.dispatchEvent((new CustomEvent("move", {})));
		}}(sa),sa.toDragable_onpointerup);
		toDragable.addListener(sa.box.pointers[1],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosCoordinateBy(0,gapY,0,0)
			thisC.dispatchEvent((new CustomEvent("move", {})));
		}}(sa),sa.toDragable_onpointerup);
		toDragable.addListener(sa.box.pointers[2],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosCoordinateBy(0,gapY,gapX,0)
			thisC.dispatchEvent((new CustomEvent("move", {})));
		}}(sa),sa.toDragable_onpointerup);
		toDragable.addListener(sa.box.pointers[3],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosCoordinateBy(0,0,gapX,0)
			thisC.dispatchEvent((new CustomEvent("move", {})));
		}}(sa),sa.toDragable_onpointerup);
		toDragable.addListener(sa.box.pointers[4],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosCoordinateBy(0,0,gapX,gapY)
			thisC.dispatchEvent((new CustomEvent("move", {})));
		}}(sa),sa.toDragable_onpointerup);
		toDragable.addListener(sa.box.pointers[5],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosCoordinateBy(0,0,0,gapY)
			thisC.dispatchEvent((new CustomEvent("move", {})));
		}}(sa),sa.toDragable_onpointerup);
		toDragable.addListener(sa.box.pointers[6],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosCoordinateBy(gapX,0,0,gapY)
			thisC.dispatchEvent((new CustomEvent("move", {})));
		}}(sa),sa.toDragable_onpointerup);
		toDragable.addListener(sa.box.pointers[7],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosCoordinateBy(gapX,0,0,0)
			thisC.dispatchEvent((new CustomEvent("move", {})));
		}}(sa),sa.toDragable_onpointerup);
	}
	var __onresize = function(evt){
		this.syncPosCoordinate(this.x,this.y,this.x1,this.y1);
		evt.preventDefault();evt.stopPropagation();
		if(this.__onchange) this.__onchange()
	}
	var _syncPosCoordinate = function(sa,x,y,x1,y1){
		var t ;
		var scrollX = (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft;
		var scrollY = (((t = document.documentElement) || (t = document.body.parentNode))  && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
		var p_bcr = sa.saTarget.getBoundingClientRect();

		var x_e = Math.max(x,0);
		var x1_e = Math.min(x1,p_bcr.width);
		var y_e = Math.max(y,0);
		var y1_e = Math.min(y1,p_bcr.height);
		

		var x_min = Math.max(Math.min(x_e,x1_e),0);
		var y_min = Math.max(Math.min(y_e,y1_e),0);
		var x_max = Math.min(Math.max(x_e,x1_e),p_bcr.width);
		var y_max = Math.min(Math.max(y_e,y1_e),p_bcr.width);
		var w = Math.abs(x_max-x_min);
		var h = Math.abs(y_max-y_min);
		sa.x = x_e;
		sa.y = y_e;
		sa.w = w;
		sa.h = h;
		sa.x1 = x1_e;
		sa.y1 = y1_e;

		sa.box.pointers[0].setAttribute('data-x',x_min.toFixed(0));
		sa.box.pointers[0].setAttribute('data-y',y_min.toFixed(0));
		sa.box.pointers[4].setAttribute('data-w',w.toFixed(0));
		sa.box.pointers[4].setAttribute('data-h',h.toFixed(0));
		
		sa.box.style.top = y_min+"px";
		sa.box.style.left = x_min+"px";
		sa.box.style.width = w+"px";
		sa.box.style.height = h+"px";
		sa.style.top = p_bcr.top+scrollY+"px";
		sa.style.left = p_bcr.left+scrollX+"px";
		sa.style.width = p_bcr.width+"px";
		sa.style.height = p_bcr.height+"px";
		sa.bg.style.borderTopWidth = y_min+"px";
		sa.bg.style.borderLeftWidth = x_min+"px";
		sa.bg.style.borderRightWidth = (p_bcr.width-x_min-w)+"px";
		sa.bg.style.borderBottomWidth =  (p_bcr.height-y_min-h)+"px";
	}
	
	return function(saTarget){
		var sa = _create(saTarget);
		_initMethod(sa);
		_initEvent(sa)
		return sa;
		
	}
})()