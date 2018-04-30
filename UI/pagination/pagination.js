var bs4_pagination = function(_cfg){
	this._cfg = Object.assign({},this.init_cfg);
	this.init(_cfg);
	
}
bs4_pagination.prototype = {
	'version':'0.1',
	"init_cfg":{
		"target":null,
		"base_url":"?page={{page}}", //URL 기본형
		"total_rows":0, //총 게시물 수
		"per_page":20, //페이지당 게시물 수
		"num_links":2, //좌우 링크 수
		"page":1, //현재 페이지
		"template_link":'<li class="page-item  {{disabled}} {{active}}" {{disabledTabindex}} {{page_item_attr}}><a class="page-link" href="{{url}}" data-num="{{num}}" title="page {{num}}" {{page_link_attr}}>{{num_html}}</a></li>', //링크 템플릿				    
		"page_item_attr":'',
		"page_link_attr":'',
		//"max_page":null, //설정 불가 자동으로 됨.
	},
	"init":function(_cfg){
		if(_cfg) this.cfg(_cfg);
	},
	"cfg":function(_cfg){
		var thisC = this;
		Object.keys(this._cfg).forEach(function(k){
			if(k in _cfg){thisC._cfg[k] = _cfg[k] }
		})
		this._cfg.total_rows = parseInt(this._cfg.total_rows,10);
		this._cfg.per_page = parseInt(this._cfg.per_page,10);
		this._cfg.num_links = parseInt(this._cfg.num_links,10);
		this._cfg.page = parseInt(this._cfg.page,10);
		this.draw();
	},
	"draw":function(){
		if(!this._cfg.target){
			 throw "Not Exists target!";
		}
		var max_page = Math.ceil(this._cfg.total_rows/this._cfg.per_page);
		var pre_links = {
			'first':[1,'<span aria-hidden="true">&#8676;</span><span class="sr-only">First</span>',max_page>0?this._cfg.base_url.replace('{{page}}',1):false,false],
			'last':[max_page,'<span aria-hidden="true">&#8677;</span><span class="sr-only">Last</span>',max_page>0?this._cfg.base_url.replace('{{page}}',max_page):false,false],
			'previous':[this._cfg.page-1,'<span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span>',(this._cfg.page-1)>0 && (this._cfg.page-1)<=max_page ?this._cfg.base_url.replace('{{page}}',this._cfg.page-1):false,false],
			'next':[this._cfg.page+1,'<span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span>',(this._cfg.page+1)<=max_page && (this._cfg.page+1)>0 ?this._cfg.base_url.replace('{{page}}',this._cfg.page+1):false,false],
		}
		var links = [];
		
		if(this._cfg.page < 1 || this._cfg.page > max_page){
			
		}else{
			for(var i=this._cfg.page-this._cfg.num_links,m=this._cfg.page+this._cfg.num_links;i<=m;i++){
				if(i<1){ continue; }
				if(i>max_page){ continue; }
				links.push([i.toString(),i.toString(),this._cfg.base_url.replace('{{page}}',i),this._cfg.page == i]);
			}
		}
		if(links.length==0){
			links.push(['NONE','NONE',false]);
		}
		links.unshift(pre_links.previous)
		links.unshift(pre_links.first)
		links.push(pre_links.next)
		links.push(pre_links.last)
		// console.log(links);
		this._cfg.target.innerHTML= '';
		var htmls = [];
		for(var i=0,m=links.length;i<m;i++){
			var link = links[i]
			var active =  link[3]?'active':'';
			var disabled = link[2]===false?'disabled':'';
			var disabledTabindex = link[2]===false?'tabindex="-1"':'';
			var url = link[2]===false?'#':link[2];
			var num = link[0];
			var num_html = link[1];
			var t_link = this._cfg.template_link.replace(/{{page_item_attr}}/,this._cfg.page_item_attr).replace(/{{page_link_attr}}/,this._cfg.page_link_attr);
			htmls.push(t_link.replace(/{{disabled}}/g,disabled)
			.replace(/{{active}}/g,active)
			.replace(/{{disabledTabindex}}/g,disabledTabindex)
			.replace(/{{url}}/g,url)
			.replace(/{{max_page}}/g,max_page)
			.replace(/{{num}}/g,num)
			.replace(/{{num_html}}/g,num_html));
			// console.log(link);
		}
		// console.log(htmls);
		this._cfg.target.innerHTML = htmls.join("\n");
		
		
	}
};

// console.log(bs4_pagination);
(function($){
	$.fn.pagination = function(_cfg){
		var cfg = {};	
		jQuery.extend(cfg,_cfg)
		
		if(!this.prop('bs4_pagination')){

			cfg.target = this.get(0);
			console.log(cfg.target );

			var pg = new bs4_pagination(cfg);
			// pg.draw()
			this.prop('bs4_pagination',pg);
		}else{
			var pg = this.prop('bs4_pagination');
			Object.keys(cfg).forEach(function(k){
				pg[k](cfg[k]);	
			})

		}
		return this;
	}
})(jQuery)