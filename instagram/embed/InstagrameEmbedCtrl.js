class InstagrameEmbedCtrl{
    static isInitedEvent = false
    static initEvent(){
        console.log('isInitedEvent',this.isInitedEvent);
        if(this.isInitedEvent){return;}
        window.addEventListener("message",(event)=>{
            this.onmessage(event);
        })
    }
    static onmessage(event){
        if(event.origin.indexOf('.instagram.com')=== -1){ return ; }
        // iframe 대상 찾기
        let target_iframe = null;
        let els = document.querySelectorAll('iframe.instagram-media');
        for(let i=0,m=els.length;i<m;i++){
            let el = els[i];
            if(el.contentWindow == event.source){
                target_iframe = el;
                break;
            }
        }
        if(!target_iframe){ console.warn('대상 인스타그램 iframe을 찾을 수 없습니다.');return; }
        // console.log('target_iframe',target_iframe,event.data);
        let data = JSON.parse(event.data);
        if(data.details && data.details.height){
            target_iframe.style.height = data.details.height+'px';
            let iecTarget = target_iframe.closest('.iec-wrap');
            if(iecTarget) iecTarget.classList.add('loaded');
        }
    }
    static openUrl(target_iframe,src){
        if(!target_iframe){ console.warn('InstagrameEmbedCtrl.open:target_iframe',target_iframe); return;}
        if(!src){console.warn('InstagrameEmbedCtrl.open:src',src); return;}
        console.log('InstagrameEmbedCtrl.open',target_iframe,src);
        let iecTarget = target_iframe.closest('.iec-wrap');
        if(iecTarget) iecTarget.classList.remove('loaded');
        target_iframe.src = src;
    }
    static replaceUrl(target_iframe,src){
        if(!target_iframe){ console.warn('InstagrameEmbedCtrl.open:target_iframe',target_iframe); return;}
        if(!src){console.warn('InstagrameEmbedCtrl.open:src',src); return;}
        console.log('InstagrameEmbedCtrl.open',target_iframe,src);
        let iecTarget = target_iframe.closest('.iec-wrap');
        if(iecTarget) iecTarget.classList.remove('loaded');

        target_iframe.contentWindow.location.replace(src)
    }
}