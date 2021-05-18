'use strict';
// 공대여자는 예쁘다.
const webKeyboard = (function(){
	let audioCtx=null;
	let gainNode=null;
	let isDown=false;
	let stopEvent=function(event){
		event.stopPropagation();
		event.preventDefault();
		return false;
	}

	let upKey=function(event){
		isDown = false;
		console.log(event.type);
	}
	let downKey=function(event){
		isDown = true;
		console.log(event.type);
		// console.log(event);
		let target = event.target;
		
		
		if(!target.classList.contains('kb-key')){
			return;
		}
		try{
			stopEvent(event)
		}catch(e){
			console.log(e);
		}
		playKey(target);
		
		return false;
	}
	let playKey = function(node){
		if(node.timerOn){
			clearTimeout(node.timerOn);
		}
		node.classList.add('on');
		node.timerOn = setTimeout(function(){
			node.classList.remove('on');
		},1000)

		let code = node.dataset.key+node.dataset.half+node.dataset.tone;
		let freq = webKeyboard.codeTable[code];
		if(!freq){			return;
		}
		playTone(freq,webKeyboard.wave,webKeyboard.sustain);
	}
	let eventOption = {
		capture: false,
		once: false,
		passive: false
	}
	let initEvent = function(){
		// document.addEventListener('mousedown',downKey,eventOption);
		// document.addEventListener('touchstart',downKey,eventOption)
		document.addEventListener('pointerdown',downKey,eventOption);
		document.addEventListener('pointerup',upKey,eventOption);
	}
	
	let startAudio = function(off){
		if(!audioCtx){
			audioCtx = new AudioContext({
				latencyHint: 'interactive',
				sampleRate: 44100,
			});
			gainNode = audioCtx.createGain()
			// gainNode.gain.value = 0.5 // 50 %
			gainNode.gain.value = webKeyboard.volume;

			gainNode.connect(audioCtx.destination);
			console.log('startAudio');
		}else{
			if(off){
				gainNode.disconnect();
				gainNode = null
				audioCtx.suspend();
				audioCtx = null;
				return
			}
		}
	}
	let setGainValue = function(v){
		webKeyboard.volume = parseFloat(v)
		if(!gainNode){return 0.5;}
		gainNode.gain.value = webKeyboard.volume;
		return webKeyboard.volume;
	}
	let setWave = function(wave){
		if(!audioCtx){return;}
		switch(wave){
			case 'sine':;
			case 'square':;
			case 'sawtooth':;
			case 'triangle':;
				webKeyboard.wave = wave
			break;
			default:
				if(webKeyboard.waveTables[wave]){
					webKeyboard.wave = audioCtx.createPeriodicWave(webKeyboard.waveTables[wave].real, webKeyboard.waveTables[wave].imag, {disableNormalization: true});
				}else{
					console.error("not exists this.waveTables[type]",type);
					return;
				}
			break;
		}
		
	}
	let playTone = function(freq,wave,sec) {
		console.log('playTone',freq,sec);
		// startAudio();
		if(!audioCtx){
			console.warn("start audio?");
			return
		}
		let localGainNode = audioCtx.createGain();
		localGainNode.connect(gainNode);
		let osc = audioCtx.createOscillator();
		osc.connect(localGainNode);
		if(typeof wave =='string'){
			osc.wave = wave;

		}else{
			osc.setPeriodicWave(wave);

			// console.log(wave);
		}
		osc.frequency.value = freq;
		// localGainNode.gain.value = 0.3 // 10 %
		localGainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + sec)
		osc.start();
		osc.stop(audioCtx.currentTime + sec);
	}

	let webKeyboard = {
		codeTable:[],
		waveTables:[],
		volume:0.5,
		sustain:3,
		wave:'square',
		init:function(){
			
			console.log("init");
			initEvent();
		},
		playTone:playTone,
		startAudio:startAudio,
		setGainValue:setGainValue,
		setWave:setWave,
	}
	return webKeyboard;
})();