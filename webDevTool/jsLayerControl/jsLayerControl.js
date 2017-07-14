/*=======================================
// jsLayerControl
// 
// 작성일 : 2008-08-27
// 수정일 : 2008-08-28
// 공대여자는 이쁘다를 나타내야만 쓸 수 있습니다.
// 이 파일은 수정해서 재배포 할 수 없습니다!
// 내가 사용하지 못하도록한 사람,것,들은 사용할 수 없습니다.
// 만든이 : mins,공대여자 
// 홈페이지  : www.mins01.com


#동작 
레이어(div)를 제어한다
현재 위치(left,top), 크키(width,height) 를 제어할 수 있다.
제어방법 : 즉시 적용, 애니메이션으로 적용

#사용법 

	@1 : 
	var config = {'width':500,'height':500,'left':500,'top':500 };
	var layerControl = new jsLayerControl(document.getElementById('t'),config);
	layerControl.setLayer();
		or
	layerControl.actLayer();
	
	@2 :
	var config = {'width':500,'height':500,'left':500,'top':500 };
	var layerControl = new jsLayerControl(document.getElementById('t'));
	layerControl.setLayer(config);
		or
	layerControl.actLayer(config);
	

#예
jsLayerControl 참고


#설정
	jsLayerControl.config = {
	'frame':100  //애니메이션 프레임
	,'delay':10  //애니메이션 딜레이(단위 ms, 1초 = 1000ms)
	,'width':null,'height':null,'left':null,'top':null  //변환할 목적값
	,'gapWidth':0,'gapHeight':0,'gapLeft':0,'gapTop':0 //설정하면 안됨, 애니메이션 사용시 자동계산됨(변한 픽셀)
	,'stWidth':0,'stHeight':0,'stLeft':0,'stTop':0 //설정하면 안됨, 애니메이션 사용시 자동계산됨(시작 정보)
	,'endEvent':null //이벤트가 끝난 후 사용할 함수
	 };
	//생성시 바로 적용시킬 수도 있다.

#메소드
	jsLayerControl.setConfig(config); //confing를 설정한다.
	jsLayerControl.setLayer([config]); //config가 있으면 그 설정을 없으면 기본설정을 사용해서 레이어를 제어
	jsLayerControl.actLayer([config]); //config가 있으면 그 설정을 없으면 기본설정을 사용해서 레이어를 제어,애니메이션으로 모습변화
	jsLayerControl.actPause() //애니메이션 도중 멈춘다.(일시정지)
	jsLayerControl.actResume() //멈춘 애니메이션 계속 진행한다
	jsLayerControl.actStop() //완전하게 애니메이션을 멈춘다.  .actResume()으로 재개할 수 없다.
#참고
	.actLayer()을 적용할 때 .setLayer()를 부르면 애니메이션은 멈추고 레이어 모습은 설정에 따라 즉시 바뀐다.
	.actPause()으로 멈추었을 경우 .actResume()로 남은 프레임 만큼 동작시킬 수 있다. (10프레임으로 설정 후 5프레임에서 멈추었을 경우 나머지 5프레임만큼 동작)
	.actPause()으로 멈추었을 경우 .actLayer()로 다시 0프레임부터 동작시킬 수 있다.(10프레임으로 설정 후 5프레임에서 멈추었을 경우 다시 1프레임부터 동작)

#주의
	config 설정잘못해서 질문하면 당신의 발바닥에 메테오스트라이크~


#제한사항
1. "공대여자는 예쁘다"를 표현할 것.
2. 저작자표시  
3. 비영리  
4. 변경금지 

#연계파일
	없음

# 브라우저 실험결과
IE6 : OK
IE7 : OK
FF2 : not Test
FF3 : OK
Opera9 : OK
Sfari3(WIN) : OK


//=======================================*/
var jsLayerControl = function(layer,configSetting){
	this.IE = (navigator.userAgent.toString().indexOf('MSIE')!=-1)?true:false;
	//if(this.IE){ alert('이건 IE!');}
	
	this.layer = layer;
	this.layer.jsLayerControl = this;
	this.config = {'frame':100 ,'delay':10
	,'width':null,'height':null,'left':null,'top':null,'opacity':null
	,'gapWidth':0,'gapHeight':0,'gapLeft':0,'gapTop':0,'gapOpacity':0
	,'stWidth':0,'stHeight':0,'stLeft':0,'stTop':0,'stOpacity':1
	,'endEvent':null
	,'startEvent':null
	 };
	this.frameCounter = 0; //프레임 카운터
	this.timer = null;
	

	this.setConfig(configSetting);
	
	if(this.layer.style.position == 'absolute' || this.layer.style.position == 'relative' ){
		if(!this.layer.style.left){this.layer.style.left = this.layer.offsetLeft+'px';}
		if(!this.layer.style.top){this.layer.style.top = this.layer.offsetTop+'px';}
	}else{
		if(!this.layer.style.left){this.layer.style.left = '0px';}
		if(!this.layer.style.top){this.layer.style.top = '0px';}	
	}
	if(!this.layer.style.width){this.layer.style.width = this.layer.offsetWidth+'px';}
	if(!this.layer.style.height){this.layer.style.height = this.layer.offsetHeight+'px';}
	this.setStyle('opacity',1);
}

jsLayerControl.prototype.setConfig = function(configSetting){
	if(configSetting){
		for(x in configSetting){
			this.config[x] = configSetting[x];
		}
	}
}

jsLayerControl.prototype.setLayer= function(configSetting){
	this.setConfig(configSetting);
	if(this.config.startEvent){this.config.startEvent();}	
	this.actStop();	
	this.setStyle('left',this.config['left']);
	this.setStyle('top',this.config['top']);
	this.setStyle('width',this.config['width']);
	this.setStyle('height',this.config['height']);
	this.setStyle('opacity',this.config['opacity']);
}
jsLayerControl.prototype.setStyle= function(style,value){
	if(value==null){return;}
	if(style == 'opacity'){
		if(this.IE){
			this.layer.style['filter']="Alpha(opacity="+Math.round(value*100)+")"
		}else{
			this.layer.style['opacity']=value;
		}
	}else{
		this.layer.style[style] = value+'px';
	}
	
}
jsLayerControl.prototype.setGap= function(){
	this.config['stLeft'] =parseInt(this.layer.style.left);
	this.config['stTop'] = parseInt(this.layer.style.top);
	this.config['stWidth'] = parseInt(this.layer.style.width);//this.layer.offsetWidth;
	this.config['stHeight'] = parseInt(this.layer.style.height);//this.layer.offsetHeight;

	if(this.config['left']!=null){
		this.config['gapLeft'] = ((this.config['left'] - this.config['stLeft'])/this.config['frame']); 
	}else{	this.config['gapLeft']=0; }
	if(this.config['top']!=null){
		this.config['gapTop'] = ((this.config['top'] - this.config['stTop'])/this.config['frame']); 
	}else{this.config['gapTop']=0;}
	if(this.config['width']!=null){
		this.config['gapWidth'] = ((this.config['width'] - this.config['stWidth'])/this.config['frame']); 
	}else{this.config['gapWidth']=0;}
	if(this.config['height']!=null){
		this.config['gapHeight'] = ((this.config['height'] - this.config['stHeight'])/this.config['frame']); 
	}else{this.config['gapHeight']=0;}
	if(this.config['opacity']!=null){
		var t = 0;
		if(this.IE){	t = parseFloat((this.layer.filters(0).Opacity)/100);	}
		else{t = parseFloat(this.layer.style.opacity);}
		this.config['gapOpacity'] = ((this.config['opacity'] - t)/this.config['frame']); 
		this.config['stOpacity']  = t;
	}else{this.config['gapOpacity']=0;}
	

	
	
	//alert('LEFT:'+this.config['gapLeft']+'\nTOP:'+this.config['gapTop']+'\nWIDTH:'+this.config['gapWidth']+'\nHEIGHT:'+this.config['gapHeight']);
	//alert('LEFT:'+this.config['left']+'\nTOP:'+this.config['top']+'\nWIDTH:'+this.config['width']+'\nHEIGHT:'+this.config['height']);
}
jsLayerControl.prototype.actLayer= function(configSetting){
	if(this.timer){clearTimeout(this.timer);}
	this.setConfig(configSetting);
	this.frameCounter = 0;
	this.setGap();
	this.actSetTimeout();
}
jsLayerControl.prototype.actSetLayer= function(){
	if(this.config['startEvent']){this.config['startEvent']()}
	
	this.setStyle('left',Math.floor(this.config['stLeft'] + this.config['gapLeft']*this.frameCounter) );
	this.setStyle('top',Math.floor(this.config['stTop'] + this.config['gapTop']*this.frameCounter) );
	this.setStyle('width',Math.floor(this.config['stWidth'] + this.config['gapWidth']*this.frameCounter) );
	this.setStyle('height',Math.floor(this.config['stHeight'] + this.config['gapHeight']*this.frameCounter) );
	this.setStyle('opacity',this.config['stOpacity'] + this.config['gapOpacity']*this.frameCounter );
//alert('LEFT:'+this.layer.offsetLeft+'\nTOP:'+this.layer.offsetTop+'\nWIDTH:'+this.layer.offsetWidth+'\nHEIGHT:'+this.layer.offsetHeight);	
}
jsLayerControl.prototype.actSetTimeout= function(configSetting){
	var thisC = this;
	if(this.frameCounter >= this.config['frame']){
		this.actStop();		
		this.setLayer();
		if(this.config['endEvent']){this.config['endEvent']()}
	}else{
		this.actSetLayer();
		this.timer = setTimeout(function(){thisC.actSetTimeout();}
								,this.config['delay']);
	}
	this.frameCounter++;
}
jsLayerControl.prototype.actClearTimeout= function(configSetting){
	clearTimeout(this.timer);
	this.setLayer();
}
jsLayerControl.prototype.actStop= function(){
	clearTimeout(this.timer);
	this.timer = null;
}
jsLayerControl.prototype.actPause= function(){
	clearTimeout(this.timer);
}
jsLayerControl.prototype.actResume= function(){
	if(this.timer){
		clearTimeout(this.timer);
		this.actSetTimeout();
	}
}