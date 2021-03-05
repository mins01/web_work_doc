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
		setTimeout(function(){
			app.voices = window.speechSynthesis.getVoices();
		},1000)

	}

	return app;
}
