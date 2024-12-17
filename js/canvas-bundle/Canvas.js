class Canvas extends HTMLCanvasElement{
    static counter = 0;
    constructor(w=null,h=null,bgColor=null,label=null){
        super();
        this.id =  'wb-canvas-'+(this.constructor.counter++);
        this.label = label??"created at "+(new Date()).toLocaleString(['ko'],{dateStyle:'medium',timeStyle:'medium',hourCycle:'h24'}).replace(/[^\d]/,'');
        // this.x = 0;
        // this.y = 0;
        this._x = 0;
        this._y = 0;
        // this._canvasWidth = 0; // this.width의 별칭
        // this._canvasHeight = 0; // this.height 의 별칭
        this._compositeOperation = 'source-over';
        // this._opacity = 1;
        this._alpha = 1;
        

        
        // this.canvasWidth = this.width??0;
        // this.canvasHeight = this.height??0;
        this.compositeOperation = 'source-over';
        // this.opacity = 1;
        this.alpha = 1;

        this.ctxUpdatedAtTime = Date.now();
        
        this.setContext2D();
        this.bundle = null

        this.width = w??400;
        this.height = h??300;
        if(bgColor) this.fill(bgColor)
    }
    setContext2D(options={"alpha":true,"antialias":true,"depth":true}){
        this.ctx = this.getContext2D(options)
        return this.ctx;
    }
    getContext2D(options={"alpha":true,"antialias":true,"depth":true}){
        return this.getContext('2d',options)
    }
    fill(color){
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = color;
        // ctx.fillRect(0,0,this.width,this.height);
        this.ctxCommand('fillRect',0,0,this.width,this.height)
        ctx.restore();
    }
    clear(color){
        const ctx = this.ctx;
        ctx.save();
        // ctx.clearRect(0,0,this.width,this.height);
        this.ctxCommand('clearRect',0,0,this.width,this.height)
        ctx.restore();
    }
    ctxCommand(){
        let inArgs = [...arguments];
        const method = inArgs[0]??null;
        const args = (inArgs??[]).slice(1);
        // console.log(method,args,this);
        if (typeof this.ctx[method] === "function") { 
            this.ctx[method].apply(this.ctx,args);
            this.flush();
        }else{
            console.error('error: ctxCommand',inArgs);
        }
    }
    flush(){
        this.ctxUpdatedAtTime = Date.now();
        // console.log('ctxUpdatedAtTime',this.ctxUpdatedAtTime);
        if(this.bundle) this.bundle.sync();
    }
    
    get x(){ return this._x; }
    set x(x){ this._x = x; this.flush(); }
    get y(){ return this._y; }
    set y(y){ this._y = y; this.flush(); }

    get compositeOperation(){ return this._compositeOperation; }
    set compositeOperation(compositeOperation){ this._compositeOperation = compositeOperation; this.flush(); }
    // get opacity(){ return this._opacity; }
    // set opacity(opacity){ this._opacity = opacity; this.flush(); }
    get alpha(){ return this._alpha; }
    set alpha(alpha){ this._alpha = alpha; this.flush(); }

    get width(){       
        const desc = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,'width');
        return desc.get.apply(this); 
    }
    /**
     * @param {number} v
     */
    set width(v){
        const desc = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,'width');
        desc.set.apply(this,[v]); 
        this.flush(); 
    }

    get height(){       
        const desc = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,'height');
        return desc.get.apply(this); 
    }
    /**
     * @param {number} v
     */
    set height(v){
        const desc = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,'height');
        desc.set.apply(this,[v]); 
        this.flush(); 
    }

}

export default Canvas;