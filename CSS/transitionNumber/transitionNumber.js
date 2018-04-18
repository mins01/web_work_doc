var transitionNumber = {
	"init":function(){
		this.initEvent();
	},
	"initEvent":function(){
		var callback = function(mutationsList) {
				for(var mutation of mutationsList) {
						if (mutation.type == 'childList') {
								console.log('A child node has been added or removed.');
						}
						else if (mutation.type == 'attributes' && mutation.attributeName=='data-number') {
							mutation.target.querySelector('.animationNumber-hiddenText').innerHTML = mutation.target.getAttribute(mutation.attributeName);
						}
				}
		};
		var config = { attributes: true, childList: false };
		var observer = new MutationObserver(callback);
		var tas = document.querySelectorAll('.animationNumber:not(.animationNumber-rendered)');
		for(var i=0,m=tas.length;i<m;i++){
			observer.observe(tas[i],config);
			tas[i].className +=' animationNumber-rendered';
			
			
			tas[i].innerHTML = '<div class="animationNumber-numbers" >'+
				'<div class="animationNumber-number animationNumber-number-0"></div>'+
				'<div class="animationNumber-number animationNumber-number-1"></div>'+
				'<div class="animationNumber-number animationNumber-number-2"></div>'+
				'<div class="animationNumber-number animationNumber-number-3"></div>'+
				'<div class="animationNumber-number animationNumber-number-4"></div>'+
				'<div class="animationNumber-number animationNumber-number-5"></div>'+
				'<div class="animationNumber-number animationNumber-number-6"></div>'+
				'<div class="animationNumber-number animationNumber-number-7"></div>'+
				'<div class="animationNumber-number animationNumber-number-8"></div>'+
				'<div class="animationNumber-number animationNumber-number-9"></div>'+
				'<div class="animationNumber-number animationNumber-number-Q"></div>'+
				'</div><span class="animationNumber-hiddenText" >?</span>';
		
		}
	}
}