r SelectArea = {
	"sa":null,
	"box":null,
	"bg":null,
	"parent":null,
	"x":null,"y":null,"w":null,"h":null,
	"init":function(){
		
	},
	"getBoundingClientRect":function(){
		if(!this.sa.parentNode){
			return null;
		}
		return this.box.layout.getBoundingClientRect();
	},
	"_create":function(){
		if(this.sa != null){return this.sa;}
		this.sa = document.createElement('div');
		this.sa.className="selectArea";
		this.sa.innerHTML =
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
		this.box=this.sa.querySelector('.selectArea-box');
		this.bg=this.sa.querySelector('.selectArea-bg');
		this.box.pointers=this.box.querySelectorAll('.selectArea-pointer');
		this.box.layout=this.box.querySelector('.selectArea-layout');
		this.box.layout.ondblclick = this._ondblclick();
		this.toDragable.addListener(this.box.layout,function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(gapX,gapY,0,0);
		}}(this),this._onchange());
		this.toDragable.addListener(this.box.pointers[0],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(gapX,gapY,-1*gapX,-1*gapY);
		}}(this),this._onchange());
		this.toDragable.addListener(this.box.pointers[1],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(0,gapY,0,-1*gapY);
		}}(this),this._onchange());
		this.toDragable.addListener(this.box.pointers[2],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(0,gapY,gapX,-1*gapY);
		}}(this),this._onchange());
		this.toDragable.addListener(this.box.pointers[3],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(0,0,gapX,0);
		}}(this),this._onchange());
		this.toDragable.addListener(this.box.pointers[4],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(0,0,gapX,gapY);
		}}(this),this._onchange());
		this.toDragable.addListener(this.box.pointers[5],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(0,0,0,gapY);
		}}(this),this._onchange());
		this.toDragable.addListener(this.box.pointers[6],function(thisC){return function(evt,gapX,gapY){
			thisC.syncPosBy(gapX,0,-1*gapX,gapY);
		}}(this),this._onchange());
		this.toDragable.addListener(this.box.pointers[7],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(gapX,0,-1*gapX,0);
		}}(this),this._onchange());
		return this.sa
	},
	"__onchange":null,
	"_onchange":function(){
		var thisC = this
		return function(evt){
			if(thisC.__onchange){
				thisC.__onchange(evt);
			}
		}
	},
	"__ondblclick":null,
	"_ondblclick":function(){
		var thisC = this
		return function(evt){
			if(thisC.__ondblclick){
				thisC.__ondblclick(evt);
			}
		}
	},
	"hide":function(){
		if(this.sa.parentNode){
			this.sa.parentNode.removeChild(this.sa);
		}
	},
	"show":function(parent,opt){
		this._create();
		document.body.appendChild(this.sa);
		this.parent = parent;
		var p_bcr = this.parent.getBoundingClientRect();
		this.w = p_bcr.width;
		this.h = p_bcr.height;
		var x,y,w,h;
		if(opt){
			x = opt.x;
			y = opt.y;
			w = opt.w;
			h = opt.h;
		}
		this.__onchange = opt&&opt.onchange?opt.onchange:null;
		this.__ondblclick = opt&&opt.ondblclick?opt.ondblclick:null;
		if(x==undefined){x=0;}
		if(y==undefined){y=0;}
		if(w==undefined){w=p_bcr.width;}
		if(h==undefined){h=p_bcr.height;}
		this._syncPos(x,y,w,h);
		window.addEventListener('resize',function(thisC){return function(evt){thisC._onresize(evt);} }(this),false)
		window.addEventListener('scroll',function(thisC){return function(evt){thisC._onresize(evt);} }(this),false)
		
	},
	"_onresize":function(evt){
		this._syncPos(this.x,this.y,this.w,this.h);
		evt.preventDefault();evt.stopPropagation();
		if(this.__onchange) this.__onchange()
	},
	"syncPosBy":function(x,y,w,h){
		
		if(this.w==0){x=0;}
		if(this.h==0){y=0;}
		if(x!=0 && this.x+x<0){
			x=0;
			if(w!=0) w = 0;
		}
		if(y!=0 && this.y+y<0){
			y=0;
			if(h!=0) h = 0;
		}
		this._syncPos(this.x+x,this.y+y,this.w+w,this.h+h);
	},
	"syncPosTo":function(x,y,w,h){
		if(x==null) x = this.x;
		if(y==null) y = this.y;
		if(w==null) w = this.w;
		if(h==null) h = this.h;
		this._syncPos(x,y,w,h);
	},	
	"_syncPos":function(x,y,w,h){
		var t ;
		var scrollX = (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft;
		var scrollY = (((t = document.documentElement) || (t = document.body.parentNode))  && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
		var p_bcr = this.parent.getBoundingClientRect();
		
		x = Math.min(Math.max(0,x),p_bcr.width-w);
		y = Math.min(Math.max(0,y),p_bcr.height-h);
		w = Math.min(Math.max(0,w),p_bcr.width-x);
		h = Math.min(Math.max(0,h),p_bcr.height-y);
		x = Math.min(Math.max(0,x),p_bcr.width-w);
		y = Math.min(Math.max(0,y),p_bcr.height-h);
		x = Math.max(0,x);
		y = Math.max(0,y);
		w = Math.min(w,p_bcr.width);
		h = Math.min(h,p_bcr.height);

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.box.pointers[0].setAttribute('data-x',x.toFixed(0));
		this.box.pointers[0].setAttribute('data-y',y.toFixed(0));
		this.box.pointers[4].setAttribute('data-w',w.toFixed(0));
		this.box.pointers[4].setAttribute('data-h',h.toFixed(0));
		
		this.box.style.top = y+"px";
		this.box.style.left = x+"px";
		this.box.style.width = w+"px";
		this.box.style.height = h+"px";
		this.sa.style.top = p_bcr.top+scrollY+"px";
		this.sa.style.left = p_bcr.left+scrollX+"px";
		this.sa.style.width = p_bcr.width+"px";
		this.sa.style.height = p_bcr.height+"px";
		this.bg.style.borderTopWidth = y+"px";
		this.bg.style.borderLeftWidth = x+"px";
		this.bg.style.borderRightWidth = (p_bcr.width-x-w)+"px";
		this.bg.style.borderBottomWidth =  (p_bcr.height-y-h)+"px";
	}
	,"toDragable":{
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
		}
		,
		"_onpointerup":function(target){
			return function(evt){
				// var target = evt.target;
				target.ing = false;
				if(target.cb_onpointerUp){
					target.cb_onpointerUp(evt); 	
				}
				evt.preventDefault();evt.stopPropagation()	;
			}
			
		}
	}
	
	
}