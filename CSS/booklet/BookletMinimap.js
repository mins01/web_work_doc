
class BookletMinimap{


    constructor(target,bookletDetail=null){
        this.running=false;
        this.target=target;
        this.bookletDetail = bookletDetail;

        this.addEvent(target);
        this.init();
    }
    init(){

    }

    addEvent(target){
        target.classList.add('moveable');
        target.addEventListener('pointerdown',(event)=>{
            this.onpointerdown(event);
        })

        this.bookletDetail.target.addEventListener('booklet-detail-sync',(event)=>{
            // console.log('booklet-detail-sync');
            this.sync()
        })
    }
    onpointerdown(event){
        event.preventDefault();
        event.stopPropagation();
        this.running=true;       

        document.addEventListener('pointermove',this.onpointermove)
        document.addEventListener('pointerup',this.onpointerup)
    }
    onpointermove=(event)=>{
        if(!this.running){ return }
        if(this.target != event.target){return}
        console.log(event.target);

        event.preventDefault();
        event.stopPropagation();
        // console.log(event);

        let x = event.offsetX - this.maskWidth/2;
        let y = event.offsetY - this.maskHeight/2;
        // let x = event.offsetX;
        // let y = event.offsetY;
        // console.log(event.target);
        

        this.scrollTo(x,y)

        
    }
    onpointerup=(event)=>{
        this.running = false;
        document.removeEventListener('pointermove',this.onpointermove)
        document.removeEventListener('pointerup',this.onpointerup)
    }

    scrollTo(x,y){
        x = x / this.target.offsetWidth * this.bookletDetail.target.scrollWidth;
        y = y / this.target.offsetHeight * this.bookletDetail.target.scrollHeight;
        console.log(x,y,this.bookletDetail.target.scrollWidth,this.bookletDetail.target.scrollHeight);
        this.bookletDetail.scrollTo(x,y)
    }



    // -- minimap
    sync(){
        if(!this.target){return;}
        const bookletDetail = this.bookletDetail;
        const ow = bookletDetail.target.offsetWidth;
        const oh = bookletDetail.target.offsetHeight;
        const sl = bookletDetail.target.scrollLeft;
        const st = bookletDetail.target.scrollTop;
        const sw = bookletDetail.target.scrollWidth;
        const sh = bookletDetail.target.scrollHeight;
        // const psw = this.target.scrollWidth;
        // const psh = this.target.scrollHeight;
        const pow = this.target.offsetWidth;
        const poh = this.target.offsetHeight;


        const w = ow/sw;
        const h = oh/sh;
        const l = sl/sw;
        const t = st/sh;
        const wpx = w*pow;
        const hpx = h*poh;
        const lpx = l*pow;
        const tpx = t*poh;

        // let parentElement = this.target.parentElement;
        // // parentElement.style.setProperty('--minimap-mask-width',(w*100)+'%');
        // // parentElement.style.setProperty('--minimap-mask-height',(h*100)+'%');
        // // parentElement.style.setProperty('--minimap-mask-left',(l*100)+'%');
        // // parentElement.style.setProperty('--minimap-mask-top',(t*100)+'%');
        // parentElement.style.setProperty('--minimap-mask-width',wpx+'px');
        // parentElement.style.setProperty('--minimap-mask-height',hpx+'px');
        // parentElement.style.setProperty('--minimap-mask-left',lpx+'px');
        // parentElement.style.setProperty('--minimap-mask-top',tpx+'px');

        this.maskWidth = wpx;
        this.maskHeight = hpx;
        this.maskLeft = lpx;
        this.maskTop = tpx;
    }

    set maskWidth(maskWidth){ this.target.parentElement.style.setProperty('--minimap-mask-width',maskWidth+'px'); }
    get maskWidth(){ return parseInt(this.target.parentElement.style.getPropertyValue('--minimap-mask-width')); }

    set maskHeight(maskHeight){ this.target.parentElement.style.setProperty('--minimap-mask-height',maskHeight+'px'); }
    get maskHeight(){ return parseInt(this.target.parentElement.style.getPropertyValue('--minimap-mask-height')); }

    set maskLeft(maskLeft){ this.target.parentElement.style.setProperty('--minimap-mask-left',maskLeft+'px'); }
    get maskLeft(){ return parseInt(this.target.parentElement.style.getPropertyValue('--minimap-mask-left')); }

    set maskTop(maskTop){ this.target.parentElement.style.setProperty('--minimap-mask-top',maskTop+'px'); }
    get maskTop(){ return parseInt(this.target.parentElement.style.getPropertyValue('--minimap-mask-top')); }
}
