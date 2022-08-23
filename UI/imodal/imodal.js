/**
 * imodal
 * 대상은 .imodal 을 class로 가지고 있어야한다!
 * 제작 : 이민수
 * 2022-08-11 : GA 자동 연동 처리.
 */
const imodal = {
    debug:false,
    lastModal:null,
    init(){
        if(window){
            document.addEventListener('click',(event)=>{
                this.eventClose(event);
            })
        }
    },
    eventClose(event){
        let target = event.target;
        // console.log(target);
        // if(!target.classList.contains('imodal-close')){ return; }
        if(target.dataset.imodalDismiss != 'imodal'){ return;  }
        this.closeClosest(target)
        return;
    },
    open(modal){
        this.lastModal = modal;
        if(!modal.classList.contains('imodal')){
            return;
        }
        document.body.classList.add('imodal-on')
        if(modal.classList.contains('imodal-body-noscroll')){
            document.body.classList.add('imodal-body-noscroll')
        }
        

        modal.classList.add('on');
        this.gtag('imodal_open',{'imodal_id':modal.id,'imodal_name':modal.dataset.imodalName||''});
    },
    // el를 감싸고 있는 가장 가까운 imodal을 닫는다.
    closeClosest(el){
        let node = el.closest('.imodal');
        if(node){
            this.close(node);
        }
    },
    close(modal){
        if(!modal){
            modal = this.lastModal;
        }
        if(!modal){
            return;
        }
        if(!modal.classList.contains('imodal')){
            return;
        }
        document.body.classList.remove('imodal-on')
        document.body.classList.remove('imodal-body-noscroll')
        modal.classList.remove('on');
        this.gtag('imodal_close',{'imodal_id':modal.id,'imodal_name':modal.dataset.imodalName||''});
    },
    closeAll(){
        document.body.classList.remove('imodal-on')
        document.querySelectorAll('.imodal').forEach((modal)=>{
            modal.classList.remove('on');
        })
        this.gtag('imodal_closeAll');
    },
    gtag(event_name,event_params){
        if(!globalThis.gtag && !window.gtag){ return;   }
        if(imodal.debug){
            console.log('gtag',"event", event_name, event_params);
        }
        gtag("event", event_name, event_params);
        
    },
}
imodal.init();// 자동 이벤트 등록