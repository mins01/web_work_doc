var appBoxRegion = null;

$(
	function(){
		appBoxRegion = new Vue({
			el: '#app-box-region',
			data: {
				region1:[
					{code:"4200000000",name:"강원도"},
					{code:"4100000000",name:"경기도"},
					{code:"4800000000",name:"경상남도"},
					{code:"4700000000",name:"경상북도"},
					{code:"2900000000",name:"광주광역시"},
					{code:"2700000000",name:"대구광역시"},
					{code:"3000000000",name:"대전광역시"},
					{code:"2600000000",name:"부산광역시"},
					{code:"1100000000",name:"서울특별시"},
					{code:"3600000000",name:"세종특별자치시"},
					{code:"3100000000",name:"울산광역시"},
					{code:"2800000000",name:"인천광역시"},
					{code:"4600000000",name:"전라남도"},
					{code:"4500000000",name:"전라북도"},
					{code:"5000000000",name:"제주특별자치도"},
					{code:"4400000000",name:"충청남도"},
					{code:"4300000000",name:"충청북도"},
				],
				region2:[
				],
				region3:[
				],

			}
		})

		appBoxRegion.searchRegion2 = function(region1){
			if(region1.length<1){return false;}
			var url = 'main-dfs-dong-json.php?type=CITY&wideCode='+region1+'&cityCode=';
			$.ajax({
				url: url,
				type: 'get', //GET
				dataType: 'json', //xml, json, script, jsonp, or html
				// data: post_data,
				// cache: false,
			})
			.done(function(rData) { //통신 성공 시 호출
				// console.log(rData);
				appBoxRegion.region2 = rData;
				console.log("done");
			})
			.fail(function() { //통신 실패 시 호출
				console.log("error");
			})
			.always(function() { //성공/실패 후 호출.
				console.log("complete");
			});
		}
		appBoxRegion.searchRegion3 = function(region1,region2){
			if(region1.length<1){return false;}
			var url = 'main-dfs-dong-json.php?type=DONG&wideCode='+region1+'&cityCode='+region2;
			$.ajax({
				url: url,
				type: 'get', //GET
				dataType: 'json', //xml, json, script, jsonp, or html
				// data: post_data,
				// cache: false,
			})
			.done(function(rData) { //통신 성공 시 호출
				// console.log(rData);
				appBoxRegion.region3 = rData;
				console.log("done");
			})
			.fail(function() { //통신 실패 시 호출
				console.log("error");
			})
			.always(function() { //성공/실패 후 호출.
				console.log("complete");
			});
		},

		appBoxRegion.saveRegion = function(region3){
			if(region3=='' || region3.length<1){
				console.log("ERROR : dongCode was too short.");
				alert("ERROR : dongCode was too short.");
				return false;
			}
			console.log("Save",region3);
			window.localStorage.setItem('weather_region3',region3);
		},
		appBoxRegion.getRegion = function(){
			return window.localStorage.getItem('weather_region3');
		}
	}
)
