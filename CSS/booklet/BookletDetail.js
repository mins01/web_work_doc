
class BookletDetail{


    constructor(target,preview=null){
        this.running=false;
        this.target=target;
        this.preview=preview;
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
        this.target.querySelector('.booklet-detail-view-img').style.zoom = zoom;
    }
    scrollTo(x,y){
        this.target.scrollTo(x,y);
        this.syncPreview();
    }
    center(){
        this.scrollTo(this.maxScrollLeft / 2,this.maxScrollTop / 2)
        // this.target.scrollLeft = this.maxScrollLeft / 2
        // this.target.scrollTop = this.maxScrollTop / 2
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



    // -- preview
    syncPreview(){
        if(!this.preview){return;}

        const ow = this.target.offsetWidth;
        const oh = this.target.offsetHeight;
        const sl = this.target.scrollLeft;
        const st = this.target.scrollTop;
        const sw = this.target.scrollWidth;
        const sh = this.target.scrollHeight;
        const psw = this.preview.scrollWidth;
        const psh = this.preview.scrollHeight;
        const pow = this.preview.offsetWidth;
        const poh = this.preview.offsetHeight;

        const ratioScroll = psw/sw;
        const ratioSize = psw/sw;
        const w = ow/sw;
        const h = oh/sh;
        const l = sl/sw;
        const t = st/sh;
        const lpx = l*pow;
        const tpx = t*poh;

        let parentElement = this.preview.parentElement;
        parentElement.style.setProperty('--preview-rect-width',(w*100)+'%');
        parentElement.style.setProperty('--preview-rect-height',(h*100)+'%');
        // parentElement.style.setProperty('--preview-rect-left',(l*100)+'%');
        // parentElement.style.setProperty('--preview-rect-top',(t*100)+'%');
        parentElement.style.setProperty('--preview-rect-left',lpx+'px');
        parentElement.style.setProperty('--preview-rect-top',tpx+'px');

        // console.log(ratioScroll,w,h);
        
    }
}
