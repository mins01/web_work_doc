var appBox = null;
$(function(){
	try{
		appBox = new Vue({
			el: '#app-box',
			data: {
				code:{
					day:{"0":'오늘',"1":'내일',"2":'모레'}, //날짜코드
					sky:{"1":'맑음',"2":'구름조금',"3":'구름많음',"4":'흐림'}, //하늘상태코드
					pty:{"0":'없음',"1":'비',"2":'비/눈',"3":'눈/비',"4":'눈'}, //강수상태코드
					
				},
				rss:{
					channel:{
						language:'',
						pubDate:'',
						title:'',
						item:{
							category:'',
							link:'',
							description:{
								body:{
									data:{
										
									}
								}
							}
							
							
						},
						
					}
				}
			}
		})	
	}catch(e){
		
	}
	
	appBox.createURL = function(dongCode){
		return './proxy.php?zone='+encodeURIComponent(dongCode)
	}
	appBox.load = function(dongCode){
		var url = this.createURL(dongCode);
		$.ajax({
			url: url,
			type: 'get', //GET
			dataType: 'json', //xml, json, script, jsonp, or html
			// data: post_data,
		})
		.done(function(rData) { //통신 성공 시 호출
			appBox.rss = rData.rss
			console.log("done");		
		})
		.fail(function() { //통신 실패 시 호출
			console.log("error");
		})
		.always(function() { //성공/실패 후 호출.
			console.log("complete");
		});
		
	}	
	
	
})
