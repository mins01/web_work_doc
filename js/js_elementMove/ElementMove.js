'use strict';

class ElementMove{
    // static areaConfs = {};
    static activeArea = null;
    constructor(area){
        if(!area.classList.contains('element-move-area')){ console.warn('.element-move-area 가 아닙니다.');return false;}
        this.area = null;
        this.target = null;
        this.event = null;
        this.x0 = null;
        this.y0 = null;
        this.initArea(area);
    }
    
    initArea(area){
        console.log('initArea');
        this.area = area;
        area.addEventListener('pointerenter',this.pointerenter);
        area.addEventListener('pointerover',this.pointerover);
        area.addEventListener('pointerdown',this.pointerdown);
        
        // document.addEventListener('pointermove',this.pointermove);
        
        // document.addEventListener('pointerup',this.pointerup);
        // document.addEventListener('pointerout',this.pointerout);
        // document.addEventListener('pointerleave',this.pointerleave);
        // document.addEventListener('pointercancel',this.pointercancel);
    }
    getTarget(event){
        return event.target.closest('.element-move-target');
    }
    getArea(event){
        return event.target.closest('.element-move-area');
    }


    // /* ========= 이벤트 처리부 */

    static pointerenter = (event)=>{ //console.log(this,event.type); 
    }
    static pointerover = (event)=>{ //console.log(this,event.type); 
    }
    pointerdown = (event)=>{
        const target = this.getTarget(event); if(!target){return false;}
        const area = this.getArea(event); if(!area){return false;}
        target.setPointerCapture(event.pointerId);
        console.log(event.y,event.screenY,event.pageY,areaConf);

        // const areaConf = area.areaConf;
        // areaConf.target = target;
        // areaConf.event = event;
        // areaConf.x0 = event.pageX;
        // areaConf.y0 = event.pageY;
    }
    static pointermove = (event)=>{ //console.log(this,event.type); 
        const target = this.getTarget(event); if(!target){return false;}
        const area = this.getArea(event); if(!area){return false;}
        target.releasePointerCapture(event.pointerId);

        // const areaConf = area.areaConf;
        // areaConf.target = target;
        // areaConf.event = event;
        // const x1 = event.pageX;
        // const y1 = event.pageY;
        // if(areaConf.x0 !== null){
        //     this.styleTransformTranslate(target,x1-areaConf.x0,y1-areaConf.y0);
        // }
    }

    // static pointerup = (event)=>{ //console.log(this,event.type); 
    //     const target = this.getTarget(event); if(!target){return false;}
    //     const area = this.getArea(event); if(!area){return false;}
    //     target.releasePointerCapture(event.pointerId);

    //     const areaConf = area.areaConf;
    //     areaConf.target = target;
    //     areaConf.event = event;
    //     const x1 = event.pageX;
    //     const y1 = event.pageY;

    //     areaConf.x0 = null;
    //     areaConf.y0 = null;
    //     this.styleTransformTranslate(target,0,0);
    // }
    // static pointerout = (event)=>{ //console.log(this,event.type); 
    // }
    // static pointerleave = (event)=>{ //console.log(this,event.type); 
    // }
    // static pointercancel = (event)=>{ //console.log(this,event.type); 
    // }

    // static styleTransformTranslate(target,x,y){
    //     target.style.transform = `translate(${x}px,${y}px)`;
    // }
}