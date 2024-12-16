import Canvas from "./Canvas.js";

class Bundle extends Canvas{
    static counter = 0;

    constructor(w=null,h=null){
        super(w,h);
        this.id =  'wb-bundle-'+(this.constructor.counter++);
        this.canvases = [];
        this.activeIndex = -1;
        this.init();
        this.bundle = null;
    }

    init(){
        this.add(new Canvas(this.canvasWidth,this.canvasHeight));
        this.merge()
    }

    add(canvas){
        if(this.activeIndex < 0){
            this.canvases.push(canvas);
            this.activeIndex = 0;
        }else{
            this.canvases.splice(this.activeIndex+1,0,canvas);
            this.activeIndex++;
        }
        canvas.bundle = this;
        this.merge()
        return true;
    }
    remove(){
        if(this.canvases.length <= 1){
            console.warn('canvas를 제거할 수 없습니다. 최소 1개의 canvas가 있어야 합니다.');
            return false;
        }
        this.canvases.splice(this.activeIndex,1);
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
        this.canvases.forEach((canvas,index)=>{
            this.ctx.globalCompositeOperation = canvas.compositeOperation
            this.ctx.globalAlpha = canvas.alpha
            this.ctxCommand('drawImage',canvas, canvas.x, canvas.y, canvas.imageWidth, canvas.imageHeight);
        })
        this.ctx.restore()
    }

}

export default Bundle;