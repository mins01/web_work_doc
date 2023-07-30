'use strict';

class ElementMove{
    static activeElementMove = null;
    static activeArea = null;
    constructor(area){
        if(!area){throw('area is not exists')}
        if(!area.classList.contains('element-move-area')){ console.warn('area is not .element-move-area');return false;}
        this.area = null;
        this.target = null;
        this.event = null;
        this.x0 = null;
        this.y0 = null;
        this.px0 = null;
        this.py0 = null;
        this.moving = false;
        this.initArea(area);
    }
    
    initArea(area){
        // console.log('initArea');
        this.area = area;
        this.area.elementMove = this;
        this.addEvents();
    }
    addEvents(){
        if(!this.area){ throw('area is not exists'); }
        // area.addEventListener('pointerenter',this.pointerenter);
        // area.addEventListener('pointerover',this.pointerover);
        this.area.addEventListener('pointerdown',this.pointerdown);
        this.area.addEventListener('contextmenu',this.contextmenu);
        
        
        // document.addEventListener('pointermove',this.pointermove);
        // document.addEventListener('pointerup',this.pointerup);
        // document.addEventListener('pointerout',this.pointerout);
        // document.addEventListener('pointerleave',this.pointerleave);
        // document.addEventListener('pointercancel',this.pointercancel);        
    }
    removeEvents(){
        this.area.removeEventListener('pointerdown',this.pointerdown);
        this.area.removeEventListener('contextmenu',this.contextmenu);
    }
        


    // /* ========= 이벤트 처리부 */

    static pointerenter = (event)=>{ //console.log(this,event.type); 
    }
    static pointerover = (event)=>{ //console.log(this,event.type); 
    }
    pointerdown = (event)=>{
        if(ElementMove.activeElementMove) return false;
        const target = this.constructor.getTarget(event.target); if(!target){return false;}
        ElementMove.activeElementMove = this;
        event.preventDefault();

        this.moving = true;
        this.target = target;
        this.event = event;
        const pos = this.constructor.pos(this.target)
        // console.log(pos); 
        this.x0 = pos.x;
        this.y0 = pos.y;
        this.px0 = event.pageX;
        this.py0 = event.pageY;

        if(target._initialX == undefined){ // 초기위치 저장
            target._initialX = pos.x;
            target._initialY = pos.y;
        }

        document.body.classList.add('element-move-body-moving');
        this.target.classList.add('element-move-target-moving');
        this.area.classList.add('element-move-area-moving');

        document.addEventListener('pointermove',this.pointermove);
        document.addEventListener('pointerup',this.pointerup);

        this.target.dispatchEvent(new CustomEvent("empointerdown", {bubbles: false,detail: {elementMove:this,event:event}, }))

    }
    pointermove = (event)=>{ 
        // console.log(event.type); 
        if(!ElementMove.activeElementMove || !this.moving) return false;
        if(!this.target){return false;}
        event.preventDefault();

        const px1 = event.pageX;
        const py1 = event.pageY;
        let x = this.x0 + (px1 - this.px0);
        let y = this.y0 + (py1 - this.py0);
        
        let moveIsolation = this.area.dataset.moveIsolation;
        if(moveIsolation != undefined){
            let pos = this.constructor.isolatedPos(moveIsolation,this.target,x,y)
            x = pos.x;
            y = pos.y;
        }

        this.constructor.moveTo(this.target,x,y);

        this.target.dispatchEvent(new CustomEvent("empointermove", {bubbles: false,detail: {elementMove:this,event:event}, }))
    }


    pointerup = (event)=>{ 
        // console.log(event.type); 
        if(!ElementMove.activeElementMove || !this.moving) return false;
        const target = this.target; if(!target){return false;}
        event.preventDefault();
        // target.releasePointerCapture(event.pointerId);

        document.body.classList.remove('element-move-body-moving');
        this.area.classList.remove('element-move-area-moving');
        this.target.classList.remove('element-move-target-moving');

        this.moving = false;
        this.target = null;
        ElementMove.activeElementMove = null;

        target.dispatchEvent(new CustomEvent("empointerup", {bubbles: false,detail: {elementMove:this,event:event}, }))

        document.removeEventListener('pointermove',this.pointermove);
        document.removeEventListener('pointerup',this.pointerup);
        
    }

    contextmenu = (event)=>{
        event.preventDefault(); // 기본 태그 기능 막기
        event.stopPropagation(); // 이벤트 전달 막기
        return false;
    }

 
    static getTarget(el){
        return el.closest('.element-move-target');
    }
    static getArea(el){
        return el.closest('.element-move-area');
    }
    static getIsolation(el){
        return el.closest('.element-move-isolation');
    }


    static isolatedPos(moveIsolation,target,x,y){
        // const area = this.getArea(target);
        const isolation = this.getIsolation(target);
        if(!isolation){
            return {"x":x , "y":y};
        }
        const pos = this.pos(target);
        const rectIsolation = isolation.getBoundingClientRect();
        const rectTarget = target.getBoundingClientRect();

        let gapX = 0;
        let gapY = 0;
        if(moveIsolation===null || moveIsolation===undefined || moveIsolation==='' || moveIsolation=='none'){
            return {"x":x , "y":y};
        }else if(moveIsolation=='in'){          
            
        }else if(moveIsolation=='center'){
            gapX = rectTarget.width/2;
            gapY = rectTarget.height/2;
        }else if(moveIsolation=='out'){
            gapX = rectTarget.width;
            gapY = rectTarget.height;
        }else if(moveIsolation){
            let margin = parseInt(moveIsolation,10);
            gapX = margin;
            gapY = margin;
        }else{
            return {"x":x , "y":y};
        }

        let minX = rectIsolation.left - rectTarget.left + pos.x - gapX;
        let minY = rectIsolation.top - rectTarget.top + pos.y - gapY;
        let maxX = rectIsolation.right - rectTarget.right + pos.x + gapX;
        let maxY = rectIsolation.bottom - rectTarget.bottom + pos.y + gapY;

        x = Math.min(Math.max(minX,x),maxX);
        y = Math.min(Math.max(minY,y),maxY);
        return {"x":x , "y":y};
    }

    static pos(target){
        let x = parseInt(target.style.getPropertyValue('--move-x'),10);
        if(isNaN(x)) x = 0;
        let y = parseInt(target.style.getPropertyValue('--move-y'),10);
        if(isNaN(y)) y = 0;
        return {"x":x , "y":y};
    }

    static isolate(moveIsolation,el){
        const target = this.getTarget(el);
        let pos = this.pos(target);
        pos = this.isolatedPos(moveIsolation,target,pos.x,pos.y);
        this.moveTo(target,pos.x,pos.y)
    }

    static moveTo(target,x,y){
        target.style.setProperty('--move-x',x+'px');
        target.style.setProperty('--move-y',y+'px');
    }
    static moveBy(target,x,y){
        const pos = this.pos(target)
        this.moveTo(target,(pos.x+x),(pos.y+y))
    }
    static moveToTarget(target,toTarget){
        const rectTarget = target.getBoundingClientRect();
        const rectToTarget = toTarget.getBoundingClientRect();
        let x = rectToTarget.left - rectTarget.left;
        let y = rectToTarget.top - rectTarget.top;
        this.moveBy(target,x,y)
    }

    static resetMove(target){
        if(target._initialX === undefined){return}
        this.moveTo(target,target._initialX,target._initialY);
    }

    static isolateMove(target){

    }
}