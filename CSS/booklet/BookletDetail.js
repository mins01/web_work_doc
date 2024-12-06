
class BookletDetail{


    constructor(target,minimap=null){
        this.running=false;
        this.target=target;
        this.minimap=minimap;
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
    scrollTo(x,y){
        this.target.scrollTo(x,y);
        // this.syncPreview();
        this.triggerSync()
    }
    center(){
        this.scrollTo(this.maxScrollLeft / 2,this.maxScrollTop / 2)
        // this.target.scrollLeft = this.maxScrollLeft / 2
        // this.target.scrollTop = this.maxScrollTop / 2
    }
    triggerSync(){
        const sync = new CustomEvent("booklet-detail-sync", { detail: {"booklet":this}, });
        this.target.dispatchEvent(sync);
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
        // if(this.target != event.target){return}
        // console.log(event.target);
        
        event.preventDefault();
        event.stopPropagation();
        let x = this.x0 - event.x ;
        let y = this.y0 - event.y ;
        // this.target.scrollLeft = this.scollLeft0 + x;
        // this.target.scrollTop = this.scollTop0 + y;
        this.scrollTo(this.scollLeft0 + x, this.scollTop0 + y)
    }
    onpointerup=(event)=>{
        // console.log('onpointerup');
        this.running = false;
        document.removeEventListener('pointermove',this.onpointermove)
        document.removeEventListener('pointerup',this.onpointerup)
    }



    // -- minimap
    syncPreview(){
        if(!this.minimap){return;}

        const ow = this.target.offsetWidth;
        const oh = this.target.offsetHeight;
        const sl = this.target.scrollLeft;
        const st = this.target.scrollTop;
        const sw = this.target.scrollWidth;
        const sh = this.target.scrollHeight;
        const psw = this.minimap.scrollWidth;
        const psh = this.minimap.scrollHeight;
        const pow = this.minimap.offsetWidth;
        const poh = this.minimap.offsetHeight;

        const ratioScroll = psw/sw;
        const ratioSize = psw/sw;
        const w = ow/sw;
        const h = oh/sh;
        const l = sl/sw;
        const t = st/sh;
        const lpx = l*pow;
        const tpx = t*poh;

        let parentElement = this.minimap.parentElement;
        parentElement.style.setProperty('--minimap-rect-width',(w*100)+'%');
        parentElement.style.setProperty('--minimap-rect-height',(h*100)+'%');
        // parentElement.style.setProperty('--minimap-rect-left',(l*100)+'%');
        // parentElement.style.setProperty('--minimap-rect-top',(t*100)+'%');
        parentElement.style.setProperty('--minimap-rect-left',lpx+'px');
        parentElement.style.setProperty('--minimap-rect-top',tpx+'px');

        // console.log(ratioScroll,w,h);
        
    }
}
