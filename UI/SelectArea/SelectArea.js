var SelectArea = {
	"div":null,
	"box":null,
	"bg":null,
	"parent":null,
	"x":null,"y":null,"w":null,"h":null,
	"init":function(){
		
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
		this.toDragable.addListener(this.box.layout,function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(gapX,gapY,0,0);
		}}(this));
		this.toDragable.addListener(this.box.pointers[0],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(gapX,gapY,-1*gapX,-1*gapY);
		}}(this));
		this.toDragable.addListener(this.box.pointers[1],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(0,gapY,0,-1*gapY);
		}}(this));
		this.toDragable.addListener(this.box.pointers[2],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(0,gapY,gapX,-1*gapY);
		}}(this));
		this.toDragable.addListener(this.box.pointers[3],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(0,0,gapX,0);
		}}(this));
		this.toDragable.addListener(this.box.pointers[4],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(0,0,gapX,gapY);
		}}(this));
		this.toDragable.addListener(this.box.pointers[5],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(0,0,0,gapY);
		}}(this));
		this.toDragable.addListener(this.box.pointers[6],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(gapX,0,-1*gapX,gapY);
		}}(this));
		this.toDragable.addListener(this.box.pointers[7],function(thisC){return function(gapX,gapY){
			thisC.syncPosBy(gapX,0,-1*gapX,0);
		}}(this));
		return this.sa
	},
	"show":function(parent,x,y,w,h,cb){
		if(x==null){x=0;}
		if(y==null){y=0;}
		if(w==null){w=100;}
		if(h==null){h=100;}
		this._create();
		document.body.appendChild(this.sa);
		this.parent = parent;
		this._syncPos(x,y,w,h);
		window.addEventListener('resize',function(thisC){return function(evt){thisC._onresize(evt);} }(this),false)
		window.addEventListener('scroll',function(thisC){return function(evt){thisC._onresize(evt);} }(this),false)
	},
	"_onresize":function(evt){
		this._syncPos(this.x,this.y,this.w,this.h);
		evt.preventDefault(), evt.stopPropagation()
		// console.log(evt.type)
	},
	"syncPosBy":function(x,y,w,h){
		if(this.w==0){x=0;}
		if(this.h==0){y=0;}
		this._syncPos(this.x+x,this.y+y,this.w+w,this.h+h);
	},
	"_syncPos":function(x,y,w,h){
		var t ;
		var scrollX = (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft;
		var scrollY = (((t = document.documentElement) || (t = document.body.parentNode))  && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
		var p_bcr = this.parent.getBoundingClientRect();
		
		x = Math.min(Math.max(0,x),p_bcr.width-this.w);
		y = Math.min(Math.max(0,y),p_bcr.height-this.h);
		w = Math.max(0,Math.min(w,p_bcr.width-this.x));
		h = Math.max(0,Math.min(h,p_bcr.height-this.y));
		// h = Math.min(Math.max(0,h),p_bcr.height-y-h);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.box.pointers[0].setAttribute('data-x',x);
		this.box.pointers[0].setAttribute('data-y',y);
		this.box.pointers[4].setAttribute('data-w',w);
		this.box.pointers[4].setAttribute('data-h',h);
		
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
		"addListener":function(target,cb_onpointerMove){
			target.ing = false;
			target.x0 = 0;
			target.y0 = 0;
			target.cb_onpointerMove = cb_onpointerMove;
			target._getXY = this._getXY;
			target.addEventListener('pointerdown',this._onpointerdown(target) );
			document.addEventListener('pointermove',this._onpointermove(target) );
			document.addEventListener('pointerup',this._onpointerup(target) );
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
				evt.preventDefault(), evt.stopPropagation()	
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
					target.cb_onpointerMove(gapX,gapY); 	
				}
				evt.preventDefault(), evt.stopPropagation()	
			}
		}
		,
		"_onpointerup":function(target){
			return function(evt){
				// var target = evt.target;
				target.ing = false;
				evt.preventDefault(), evt.stopPropagation()	
			}
			
		}
	}
	
	
}