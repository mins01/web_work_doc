/*=======================================
// jfMoveLayer
// 
// 작성일 : 2008-09-17
// 수정일 : 
// 공대여자는 이쁘다를 나타내야만 쓸 수 있습니다.
// 이 파일은 수정해서 재배포 할 수 없습니다!
// 내가 사용하지 못하도록한 사람,것,들은 사용할 수 없습니다.
// 만든이 : mins,공대여자 
// 홈페이지  : www.mins01.com


#동작 
레이어(div)를 이동할 수 있게 한다.

#사용법 

	jfMoveLayer(제어대상,이동대상,설정)
	jfMoveLayer(document.getElementById('c2'),document.getElementById('t2'),{'stopOutRange':true}) //제어와 이동의 대상이 서로다름
	jfMoveLayer(document.getElementById('c2'),document.getElementById('c2'))	//제어와 이동의 대상이 같음

#예
jfMoveLayer.html 참고


#설정
	jfMoveLayer.config = {
				'moveable':true //이동할 수 있는가? false면 이동금지, true면 이동가능
				,'toggle':false //토클로 동작설정
				,'stopOutRange':false //이동중 커서가 컨트롤 밖으로 나갈 경우(false면 계속, true면 멈춤)
				,'startEvent':function(){} //시작이벤트
				,'moveEvent':function(){}	 //마침이벤트
				,'endEvent':function(){}	 //끝 이벤트
			 }
#메소드
	없음


#주의
	config 설정잘못해서 질문하면 당신의 발바닥에 메테오스트라이크~
	오페라에서는 정상작동되지 않습니다.

#제한사항
1. "공대여자는 예쁘다"를 표현할 것.
2. 저작자표시  
3. 비영리  
4. 변경금지(복사해서 다른 js파일등에 붙여 넣는건 가능, 다만 제한 사항은 지켜야함)

#연계파일
	없음

# 브라우저 실험결과
IE6 : OK
IE7 : OK
FF2 : OK
FF3 : OK
Opera9 : OK
Sfari3(WIN),Chrome : OK


//=======================================*/

function jfMoveLayer(controlLayer,targetLayer,configSetting){
	var config = {
	'moveable':true //이동할 수 있는가?
	,'toggle':false //토클로 동작설정
	,'stopOutRange':false //이동중 커서가 컨트롤 밖으로 나갈 경우(false면 계속, true면 멈춤)
	,'startEvent':function(){} //시작이벤트
	,'moveEvent':function(){}	 //마침이벤트
	,'endEvent':function(){}	 //끝 이벤트
	};

	if(configSetting){for(x in configSetting){config[x] = configSetting[x];	}}		
	
	controlLayer.jfMoveLayer = {'left':0,'top':0,'drag':false,'config':config
								,'targetLayer':targetLayer}
	var fn1 = function(e){
		if(!controlLayer.jfMoveLayer.config.moveable){return;}
		var evt = window.event?window.event:e;
		controlLayer.jfMoveLayer.left = evt.clientX;
		controlLayer.jfMoveLayer.top = evt.clientY;
		if(controlLayer.jfMoveLayer.config.toggle){
			controlLayer.jfMoveLayer.drag = !controlLayer.jfMoveLayer.drag
		}else{
			controlLayer.jfMoveLayer.drag = true;
		}
		if(controlLayer.jfMoveLayer.drag){
			controlLayer.jfMoveLayer.config.startEvent(e);
		}else{
			controlLayer.jfMoveLayer.config.endEvent(e);
		}
	}
	var fn2 = function(e){
		if(!controlLayer.jfMoveLayer.config.moveable){return;}
		var evt = window.event?window.event:e;
		if(controlLayer.jfMoveLayer.drag){
			var left = evt.clientX - controlLayer.jfMoveLayer.left;
			var top = evt.clientY - controlLayer.jfMoveLayer.top;
			var tl = isNaN(parseInt(controlLayer.jfMoveLayer.targetLayer.style.left))?0:parseInt(controlLayer.jfMoveLayer.targetLayer.style.left);
			var tt = isNaN(parseInt(controlLayer.jfMoveLayer.targetLayer.style.top))?0:parseInt(controlLayer.jfMoveLayer.targetLayer.style.top);			
			controlLayer.jfMoveLayer.targetLayer.style.left = (tl + left)+'px';
			controlLayer.jfMoveLayer.targetLayer.style.top = (tt + top)+'px';		
			controlLayer.jfMoveLayer.left = evt.clientX;
			controlLayer.jfMoveLayer.top = evt.clientY;
			controlLayer.jfMoveLayer.config.moveEvent(e);
			
			
			evt.cancelBubble  = true;
			if(window.event){
				window.event.keyCode = 0; 
				window.event.cancelBubble = true;
				window.event.returnValue = false;   
			}else{
				evt.stopPropagation(); 
				evt.preventDefault();
				//evt.initEvent();
			}			
		}
	}
	var fn3 = function(e){
		if(!controlLayer.jfMoveLayer.config.moveable){return;}
		var evt = window.event?window.event:e;
		if(!controlLayer.jfMoveLayer.config.toggle){
			if(controlLayer.jfMoveLayer.drag){
				controlLayer.jfMoveLayer.config.endEvent(e);
			}		
			controlLayer.jfMoveLayer.drag = false;
		}
	}
	var fn4 = function(e){
		if(!controlLayer.jfMoveLayer.config.moveable){return;}
		var evt = window.event?window.event:e;
		if(controlLayer.jfMoveLayer.drag){
			controlLayer.jfMoveLayer.config.endEvent(e);
		}
		controlLayer.jfMoveLayer.drag = false;
		
	}	
	if(document.addEventListener){
		controlLayer.addEventListener("mousedown", fn1 , false);
		document.addEventListener("mousemove", fn2 , false);
		document.addEventListener("mouseup", fn3 , false);
		if(controlLayer.jfMoveLayer.config.stopOutRange){
			controlLayer.addEventListener("mouseout", fn4 , false);
		}
		controlLayer.style.MozUserInput='disabled';
		controlLayer.style.MozUserSelect='none';		
	}else if(document.attachEvent){ //IE
		controlLayer.attachEvent("onmousedown", fn1 );	
		document.attachEvent("onmousemove", fn2 );
		document.attachEvent("onmouseup", fn3 );
		if(controlLayer.jfMoveLayer.config.stopOutRange){

			controlLayer.attachEvent("onmouseout", fn4 );
		}
	}
}