'use strict';

const FixedFrameOnTable = function(ffot){

	this.init(ffot);
}
FixedFrameOnTable.prototype.ffot = null;
FixedFrameOnTable.prototype.scrollbar = null;
FixedFrameOnTable.prototype.containerLeft = null;
FixedFrameOnTable.prototype.containerBody = null;
FixedFrameOnTable.prototype.header00 = null;
FixedFrameOnTable.prototype.header01 = null;
FixedFrameOnTable.prototype.header10 = null;
FixedFrameOnTable.prototype.content = null;
FixedFrameOnTable.prototype.useSyncScrollTop = false;
FixedFrameOnTable.prototype.init = function(ffot){
	this.ffot = ffot
	this.scrollbar = ffot.querySelector('.ffot-scrollbar');
	this.containerLeft = ffot.querySelector('.ffot-container-left');
	this.containerBody = ffot.querySelector('.ffot-container-body');
	this.header00 = ffot.querySelector('.ffot-header-00');
	this.header01 = ffot.querySelector('.ffot-header-01');
	this.header10 = ffot.querySelector('.ffot-header-10');
	this.content = ffot.querySelector('.ffot-content');
	this.useSyncScrollTop = !!ffot.querySelector('.ffot-container-left .ffot-header-10');
	this.initEvent();
}
FixedFrameOnTable.prototype.initEvent = function(){
	this.fbcResizeObserver  = new ResizeObserver(function(thisC){
		return function(els){
			for(let i=0,m=els.length;i<m;i++){
				let el = els[i];
				thisC.syncSizeContent(el)
			}
		}
	}(this));
	this.flhResizeObserver  = new ResizeObserver(function(thisC){
		return function(els){
			for(let i=0,m=els.length;i<m;i++){
				let el = els[i];
				thisC.syncSizeHeader00(el)
			}
		}
	}(this));
	this.fbcResizeObserver.observe(this.content);
	if(this.header00) this.flhResizeObserver.observe(this.header00);
	if(this.useSyncScrollTop){
		this.scrollbar.addEventListener('scroll',function(thisC){
			return function(event){
				thisC.syncScrollTop(event.target)
			}
		}(this));
	}

}
FixedFrameOnTable.prototype.sync = function(){

}
FixedFrameOnTable.prototype.syncSizeHeader00 = function(el){
	let ffot= this.ffot
	let rect_flh = el.contentRect
	this.header01.style.height = rect_flh.height+"px";
	this.containerBody.style.left = el.borderBoxSize[0].inlineSize+"px";

	if(this.header01){
		let height_tds = this.header00.querySelectorAll('tr td:first-child')
		this.header01.querySelectorAll('tr td:first-child').forEach((item, i) => {
			let rect = height_tds[i].getBoundingClientRect();
			item.height = rect.height;
		});
	}

	if(this.header10){
		let width_tds = this.header00.querySelectorAll('tr:first-child td')
		this.header10.querySelectorAll('tr:first-child td').forEach((item, i) => {
			let rect = width_tds[i].getBoundingClientRect();
			item.width = rect.width;
		});
	}

}
FixedFrameOnTable.prototype.syncSizeContent = function(el){
	let ffot= this.ffot
	let rect_fbc = el.contentRect
	if(this.header10){
		this.header10.style.height = rect_fbc.height+"px";
		let height_tds = this.content.querySelectorAll('tr td:first-child')
		this.header10.querySelectorAll('tr td:first-child').forEach((item, i) => {
			let rect = height_tds[i].getBoundingClientRect();
			item.height = rect.height;
		});
	}


	if(this.header01){
		let width_tds = this.content.querySelectorAll('tr:first-child td')
		this.header01.querySelectorAll('tr:first-child td').forEach((item, i) => {
			let rect = width_tds[i].getBoundingClientRect();
			item.width = rect.width;
		});
	}

}
FixedFrameOnTable.prototype.syncScrollTop = function(ta){
	// let ta = evt.target;
	let el = this.header10;
	el.style.transform="translateY(-"+ta.scrollTop+"px)";
}
