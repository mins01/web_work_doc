function gerenate_speechSynthesis_app(el){
	let app = new Vue({
		el: el,
		data: {
			"enable":false,
			"voices":[],
		}
	});
	app.enable = !!window.speechSynthesis;
	if(app.enable){
		app.voices = window.speechSynthesis.getVoices();
		if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
			speechSynthesis.onvoiceschanged = function(){
				app.voices = window.speechSynthesis.getVoices();
			};
		}
		// setTimeout(function(){
		// 	app.voices = window.speechSynthesis.getVoices();
		// },1000)

	}

	return app;
}
