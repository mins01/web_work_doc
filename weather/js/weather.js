var appBox = null;
$(function(){
	try{
		appBox = new Vue({
			el: '#app-box',
			data: {
				fields:{ // 메뉴얼이 이상해서 여기에 재 작성
					"hour":"시간",
					"day":"n번째날",
					"temp":"현재시간온도 ℃",
					"tmx":"최고온도 ℃",
					"tmn":"최저온도 ℃",
					"sky":"하늘상태코드",
					"pty":"강수상태코드",
					"wfKor":"날씨한국어",
					"wfEn":"날씨영어",
					"pop":"강수확률%",
					"r12":"12시간 예상 강수량 ㎜",
					"s12":"12시간 예상 적설량 ㎜",
					"ws":"풍속 (m/s)",
					"wd":"풍향",
					"wdKor":"풍향 한국어",
					"wdEn":"풍형 영어",
					"reh":"습도%",
					"r06":"6시간 예상 강수량 ㎜",
					"s06":"6시간 예상 적설령 ㎜",
				},
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
			// cache: false,
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
