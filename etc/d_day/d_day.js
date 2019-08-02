var app = null;
function init(){
	app = new Vue({
		el: '#app',
		data: {
			'gSec':0,
			'gMinute':0,
			'gHour':0,
			'gDay':0,
		}
	})
	setInterval(gSync,500)
}

//new Date(year, monthIndex[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);

function gSync(){
	//날짜 : 2020년 4월 15일 06:00:00 (KST)
	var tMs = Date.UTC(2020,4-1,15,6-9,0,0,0)
	var nMs = Date.now();
	var gMs = tMs-nMs;
	
	var gSec = Math.floor(gMs/1000)%60;
	var gMinute = Math.floor(gMs/1000/60)%60;;
	var gHour = Math.floor(gMs/1000/60/60)%24;
	var gDay = Math.floor(gMs/1000/60/60/24);
	app.gSec = gSec;
	app.gMinute = gMinute;
	app.gHour = gHour;
	app.gDay = gDay;
	app.now = gSec;	
}

$(function(){
	init();
	gSync();
})