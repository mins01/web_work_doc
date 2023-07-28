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
        
        // document.addEventListener('pointermove',this.pointermove);
        // document.addEventListener('pointerup',this.pointerup);
        // document.addEventListener('pointerout',this.pointerout);
        // document.addEventListener('pointerleave',this.pointerleave);
        // document.addEventListener('pointercancel',this.pointercancel);        
    }
    getTarget(el){
        return el.closest('.element-move-target');
    }
    getArea(el){
        return el.closest('.element-move-area');
    }


    // /* ========= 이벤트 처리부 */

    static pointerenter = (event)=>{ //console.log(this,event.type); 
    }
    static pointerover = (event)=>{ //console.log(this,event.type); 
    }
    pointerdown = (event)=>{
        // console.log(event.type); 
        if(ElementMove.activeElementMove) return false;
        const target = this.getTarget(event.target); if(!target){return false;}
        ElementMove.activeElementMove = this;
        // target.setPointerCapture(event.pointerId);
        // console.log(event.pointerId,event.y,event.screenY,event.pageY);
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
        let pos = this.posIsolation(x,y)

        this.constructor.moveTo(this.target,pos.x,pos.y);

        this.target.dispatchEvent(new CustomEvent("empointermove", {bubbles: false,detail: {elementMove:this,event:event}, }))


    }
    posIsolation(x,y){
        if(this.area.dataset.moveIsolation=='1'){
            const rectArea = this.area.getBoundingClientRect();
            const rectTarget = this.target.getBoundingClientRect();
            const minX = 0;
            const minY = 0;
            const maxX = rectArea.width - rectTarget.width;
            const maxY = rectArea.height - rectTarget.height;
            x = Math.min(Math.max(minX,x),maxX);
            y = Math.min(Math.max(minY,y),maxY);
        }else if(this.area.dataset.moveIsolation=='2'){
            const rectArea = this.area.getBoundingClientRect();
            const rectTarget = this.target.getBoundingClientRect();
            const minX = rectTarget.width/-2;
            const minY = rectTarget.height/-2;
            const maxX = rectArea.width - rectTarget.width - rectTarget.width/-2;
            const maxY = rectArea.height - rectTarget.height - rectTarget.height/-2;
            x = Math.min(Math.max(minX,x),maxX);
            y = Math.min(Math.max(minY,y),maxY);
        }
        return {"x":x , "y":y};
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

        document.removeEventListener('pointermove',this.pointermove);
        document.removeEventListener('pointerup',this.pointerup);

        target.dispatchEvent(new CustomEvent("empointerup", {bubbles: false,detail: {elementMove:this,event:event}, }))
        
    }

    

    static pos(target){
        let x = parseInt(target.style.getPropertyValue('--move-x'),10);
        if(isNaN(x)) x = 0;
        let y = parseInt(target.style.getPropertyValue('--move-y'),10);
        if(isNaN(y)) y = 0;
        return {"x":x , "y":y};
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
}