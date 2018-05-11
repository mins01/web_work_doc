var appBox = null;
$(function(){
	try{
		appBox = new Vue({
			el: '#app-box',
			data: {
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
