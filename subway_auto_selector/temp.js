
var retfn = function(){
    return $(this).text().trim().replace(/(\s{2,}|\t|\n)/g,' ');
}
var r = []
// r.push('class\ttit\teng\tcal\tsummary');
$('.pd_list_wrapper >ul>li').each(
	function(idx,el){
		var cat = document.location.pathname.replace('/','');
		var tit = $(this).find(".tit").map(retfn).get();
		var eng = $(this).find(".eng").map(retfn).get();
		var cal = $(this).find(".cal").map(retfn).get();
		var summary = $(this).find(".summary").map(retfn).get();
		var img = $(this).find(".img img").map(function(){return this.src.replace('../','http://subway.co.kr/')});
		// console.log(img);
		for(var i=0,m=tit.length;i<m;i++){
			r.push([cat,this.className,tit[i],eng[i],(cal[i]?cal[i]:''),(summary[i]?summary[i]:''),(img[i]?img[i]:'')]);
		}
	}
)



console.log(JSON.stringify(r));