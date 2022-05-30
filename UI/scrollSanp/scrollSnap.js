const scrollSnap = {
    init(app){
      app.dataset.idx = 1;
      let container = app.querySelector('.scroll-snap-container');
      let items = container.querySelectorAll(':scope > .scroll-snap-item');
      app.dataset.total = items.length;
    },
    show(app,idx){
        if(!app.dataset.idx){this.init(app);}
        let container = app.querySelector('.scroll-snap-container');
        if(!container){
            console.warn('Where is container');
            return false;
        }
        let item = container.querySelector(':scope > .scroll-snap-item:nth-child('+idx+')')
        if(!item){
            console.warn(`Where is item:nth-child(${idx})`);
            return false;
        }
        let isHorizon = (container.classList.contains('scroll-snap-x-mandatory') || container.classList.contains('scroll-snap-x-proximity'))?true:false;
        // item.scrollIntoView();
        let rect = item.getBoundingClientRect();
        // console.log(rect)
        if(isHorizon){
            container.scrollLeft += rect.left
        }else{
            container.scrollTop += rect.top - rect.height
        }
        app.dataset.idx = idx;
    },
    next(app){
        if(!app.dataset.idx){this.init(app);}
        let total = parseInt(app.dataset.total);
        let current = parseInt(app.dataset.idx);
        let idx = (current-1+1+total) % total + 1; 
        this.show(app,idx);
    },
    prev(app){
        if(!app.dataset.idx){this.init(app);}
        let total = parseInt(app.dataset.total);
        let current = parseInt(app.dataset.idx);
        let idx = (current-1-1+total) % total + 1;
        this.show(app,idx);
    }

}