var bs4_pagenation = function(_cfg){
	this.init(_cfg);
}
bs4_pagenation.prototype = {
	'version':'0.1',
	"_cfg":{
		"target":null,
		"base_url":"?page={{page}}", //URL 기본형
		"total_rows":0, //총 게시물 수
		"per_page":20, //페이지당 게시물 수
		"num_links":2, //좌우 링크 수
		"page":1, //현재 페이지
		"template_link":'<li class="page-item  {{disabled}} {{active}}" {{disabledTabindex}}><a class="page-link" href="{{url}}" data-num="{{num}}" title="page {{num}}">{{num_html}}</a></li>', //링크 템플릿				    
	},
	"init":function(_cfg){
		if(_cfg) this.cfg(_cfg);
	},
	"cfg":function(_cfg){
		var thisC = this;
		Object.keys(this._cfg).forEach(function(k){
			if(k in _cfg){thisC._cfg[k] = _cfg[k] }
		})
		this.draw();
	},
	"draw":function(){
		if(!this._cfg.target){
			 throw "Not Exists target!";
		}
		var max_page = Math.ceil(this._cfg.total_rows/this._cfg.per_page);
		var pre_links = {
			'first':['first','<span aria-hidden="true">&#8676;</span><span class="sr-only">First</span>',max_page>0?this._cfg.base_url.replace('{{page}}',1):false],
			'last':['last','<span aria-hidden="true">&#8677;</span><span class="sr-only">Last</span>',max_page>0?this._cfg.base_url.replace('{{page}}',max_page):false],
			'previous':['previous','<span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span>',(this._cfg.page-1)>0?this._cfg.base_url.replace('{{page}}',this._cfg.page-1):false],
			'next':['next','<span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span>',(this._cfg.page+1)<=max_page?this._cfg.base_url.replace('{{page}}',this._cfg.page+1):false],
		}
		var links = [pre_links.first,pre_links.previous];
		for(var i=this._cfg.page-this._cfg.num_links,m=this._cfg.page+this._cfg.num_links;i<=m;i++){
			if(i<1){ continue; }
			if(i>max_page){ continue; }
			links.push([i.toString(),i.toString(),this._cfg.base_url.replace('{{page}}',i)]);
		}
		links.push(pre_links.next)
		links.push(pre_links.last)
		// console.log(links);
		this._cfg.target.innerHTML= '';
		var htmls = [];
		for(var i=0,m=links.length;i<m;i++){
			var link = links[i]
			var active = this._cfg.page == link[0]?'active':'';
			var disabled = link[2]===false?'disabled':'';
			var disabledTabindex = link[2]===false?'tabindex="-1"':'';
			var url = link[2]===false?'#':link[2];
			var num = link[0];
			var num_html = link[1];
			htmls.push(this._cfg.template_link.replace(/{{disabled}}/g,disabled)
			.replace(/{{active}}/g,active)
			.replace(/{{disabledTabindex}}/g,disabledTabindex)
			.replace(/{{url}}/g,url)
			.replace(/{{num}}/g,num)
			.replace(/{{num_html}}/g,num_html));
			// console.log(link);
		}
		// console.log(htmls);
		this._cfg.target.innerHTML = htmls.join("\n");
		
		
	}
};

console.log(bs4_pagenation);
(function($){
	$.fn.pagenation = function(cfg){
		if(!cfg) cfg = {};
		if(!this.prop('bs4_pagenation')){

			cfg.target = this.get(0);
			console.log(bs4_pagenation);
			var pg = new bs4_pagenation(cfg);
			pg.draw()
			this.prop('bs4_pagenation',pg);
		}else{
			var pg = this.prop('bs4_pagenation');
			Object.keys(cfg).forEach(function(k){
				pg[k](cfg[k]);	
			})

		}
		return this;
	}
})(jQuery)