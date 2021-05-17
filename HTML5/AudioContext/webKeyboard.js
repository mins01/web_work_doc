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
		playTone(freq,3);


		return false;
	}
	let eventOption = {
		capture: false,
		once: false,
		passive: false
	}
	let initEvent = function(){
		document.addEventListener('mousedown',downKey,eventOption);
		document.addEventListener('pointerdown',downKey,eventOption)
		// document.addEventListener('touchstart',downKey,eventOption)
	}
	
	let startAudio = function(off){
		if(!audioCtx){
			audioCtx = new AudioContext({
				latencyHint: 'interactive',
				sampleRate: 44100,
			});
			gainNode = audioCtx.createGain()
			gainNode.gain.value = 0.3 // 10 %
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
	let playTone = function(freq,sec) {
		// startAudio();
		if(!audioCtx){
			console.warn("start audio?");
			return
		}
		let localGainNode = audioCtx.createGain();
		localGainNode.connect(gainNode);
		let osc = audioCtx.createOscillator();
		osc.connect(localGainNode);
		osc.type ='square';
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
		startAudio:startAudio
		
	}
	return webKeyboard;
})();