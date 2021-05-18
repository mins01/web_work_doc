const webKeyboard = (function(){
	let audioCtx=null;
	let gainNode=null;


	let downKey=function(event){

		// console.log(event);
		let target = event.target;
		
		if(!target.classList.contains('kb-key')){
			return;
		}
		
		try{
			event.stopPropagation();
			event.preventDefault();
		}catch(e){
			console.log(e);
		}
		
		let code = target.dataset.key+target.dataset.half+target.dataset.tone;
		let freq = webKeyboard.codes[code];
		console.log(code,event.type);
		if(!freq){
			return;
		}
		playTone(freq,webKeyboard.oscillatorType,webKeyboard.sustain);
		return false;
	}
	let eventOption = {
		capture: false,
		once: false,
		passive: false
	}
	let initEvent = function(){
		document.addEventListener('mousedown',downKey,eventOption);
		document.addEventListener('pointerdown',downKey,eventOption);	
		// document.addEventListener('touchstart',downKey,eventOption)
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
	let playTone = function(freq,type,sec) {
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
		// osc.type ='square';
		osc.type =type;
		
		osc.frequency.value = freq;
		// localGainNode.gain.value = 0.3 // 10 %
		localGainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + sec)
		osc.start();
	}

	let webKeyboard = {
		codes:[],
		init:function(){
			
			console.log("init");
			initEvent();
		},
		playTone:playTone,
		startAudio:startAudio,
		setGainValue:setGainValue,
		volume:0.5,
		sustain:3,
		oscillatorType:'square',
	}
	return webKeyboard;
})();