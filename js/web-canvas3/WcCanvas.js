import WcLayer from "./WcLayer.js";

class WcCanvas extends WcLayer{
    static counter = 0;

    constructor(w=null,h=null){
        super(w,h);
        this.id =  'wc-canvas-'+(this.constructor.counter++);
        this.wcLayers = [];
        this.activeIndex = -1;
        this.init();
        this.bundle = null;
    }

    init(){
        this.add(new WcLayer(this.width,this.height));
        this.merge()
    }

    add(wcLayer){
        if(this.activeIndex < 0){
            this.wcLayers.push(wcLayer);
            this.activeIndex = 0;
        }else{
            this.wcLayers.splice(this.activeIndex+1,0,wcLayer);
            this.activeIndex++;
        }
        wcLayer.bundle = this;
        this.merge()
        return true;
    }
    remove(){
        if(this.wcLayers.length <= 1){
            console.warn('wcLayer를 제거할 수 없습니다. 최소 1개의 wcLayer가 있어야 합니다.');
            return false;
        }
        this.wcLayers.splice(this.activeIndex,1);
        this.activeIndex = Math.max(this.activeIndex-1,0);
        this.merge()
        return true;
    }
    sync(){
        this.merge()
    }
    merge(){
        this.clear()
        this.ctx.save();
        this.wcLayers.forEach((wcLayer,index)=>{
            this.ctx.globalCompositeOperation = wcLayer.compositeOperation
            this.ctx.globalAlpha = wcLayer.alpha
            this.ctxCommand('drawImage',wcLayer, wcLayer.x, wcLayer.y, wcLayer.width, wcLayer.height);
        })
        this.ctx.restore()
    }

}

export default WcCanvas;