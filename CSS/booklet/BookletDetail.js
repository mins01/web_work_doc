
class BookletDetail{


    constructor(target){
        this.running=false;
        this.target=target;
        this._zoom = 1;

        this.scollLeft0 = 0;
        this.scollTop0 = 0;
        this.x0 = 0;
        this.y0 = 0;

        this.addEvent(target);
        this.init();
    }
    init(){
        this.zoom = 1;
        this.center();
    }
   
    get maxScrollTop(){
        return this.target.scrollHeight - this.target.clientHeight;
    }
    get maxScrollLeft(){
        return this.target.scrollWidth - this.target.clientWidth;
    }
    get zoom(){
        return this._zoom;
    }
    set zoom(zoom){
        this._zoom = zoom;
        // this.target.style.zoom = zoom;
        this.target.querySelector('.booklet-detail-img').style.zoom = zoom;
    }
    center(){
        this.target.scrollLeft = this.maxScrollLeft / 2
        this.target.scrollTop = this.maxScrollTop / 2
    }
    addEvent(target){
        target.classList.add('moveable');
        target.addEventListener('pointerdown',(event)=>{
            this.onpointerdown(event);
        })

    }
    onpointerdown(event){
        event.preventDefault();
        event.stopPropagation();
        this.running=true;       
        this.scollLeft0 = this.target.scrollLeft;
        this.scollTop0 = this.target.scrollTop;
        this.x0 = event.x;
        this.y0 = event.y;

        document.addEventListener('pointermove',this.onpointermove)
        document.addEventListener('pointerup',this.onpointerup)
    }
    onpointermove=(event)=>{
        // console.log('onpointermove');
        
        if(!this.running){ return }
        let x = this.x0 - event.x ;
        let y = this.y0 - event.y ;
        this.target.scrollLeft = this.scollLeft0 + x;
        this.target.scrollTop = this.scollTop0 + y;       
    }
    onpointerup=(event)=>{
        // console.log('onpointerup');
        this.running = false;
        document.removeEventListener('pointermove',this.onpointermove)
        document.removeEventListener('pointerup',this.onpointerup)
    }
}
