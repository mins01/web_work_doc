const lazyImageLoader = (function(){

	let cb = function(entries, observer){
		entries.forEach(entry => {
			//   entry.boundingClientRect
			//   entry.intersectionRatio
			//   entry.intersectionRect
			//   entry.isIntersecting
			//   entry.rootBounds
			//   entry.target
			//   entry.time
			console.log(entry);
		});
	}
	let observer = null;
	return {
		"target":'.lazy-image-loader',
		"options":{
			root: null,
			rootMargin: '0px',
			threshold: 1
		},
		"observe":function(d){
			if(!d) { d = document; }
			observer = new IntersectionObserver(cb,this.options);
			d.querySelectorAll(this.target).forEach((el)=>{
				if(el.dataset.observe===undefined){
					el.dataset.observe="1";
					observer.observe(el);
				}
			});
		},
		"unobserve":function(d){
			if(!d) { d = document; }
			d.querySelectorAll(this.target).forEach((el)=>{
				delete el.dataset.observe;
				observer.unobserve(el);
				console.log('unobserve',el);
			});
		},
		

	}
	
})();