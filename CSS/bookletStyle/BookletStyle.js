
class BookletStyle{

    constructor(booklet){
        this.booklet = booklet;

        this.booklet.addEventListener('click',(event)=>{this.onclick(event)})

        this.pagePrev = null;
        this.pageCurr = null;
        this.pageNext = null;
        this.pages = [];
        this.reset();
    }

    reset(){
        this.pagePrev=null;
        this.pageCurr=null;
        this.pageNext=null;
        this.init()
        this.setPageByIdx(0);
    }

    init(){
        this.pages = this.booklet.querySelectorAll('.booklet-page')
        this.pages.forEach((page,idx) => {
            page.dataset.idx = idx;
        });
        this.booklet.classList.add('on')
    }

    setPageByIdx(idx){
        idx = parseInt(idx,10)
        let pages = this.pages
        if(!pages || !pages.length){ return; }
        pages.forEach((page,idx) => {
            delete page.dataset.state;
        });
        this.pagePrev=null;
        this.pageCurr=null;
        this.pageNext=null;

        if(idx !==null && pages[idx]){
            pages[idx].dataset.state = 'curr';
            this.pageIdx = idx;
            this.pageCurr = pages[idx];
            this.setPagePrevByIdx(idx-1);
            this.setPageNextByIdx(idx+1);            
        }
    }

    setPagePrevByIdx(idx){
        if(!this.pages[idx]) return false;
        this.pages[idx].dataset.state = 'prev';
        this.pagePrev = this.pages[idx];
        return this.pagePrev;
    }
    setPageNextByIdx(idx){
        if(!this.pages[idx]) return false;
        this.pages[idx].dataset.state = 'next';
        this.pageNext = this.pages[idx];
        return this.pageNext;
    }
    change(idx){
        if(idx == this.pageIdx){return false;}
        else if(idx < this.pageIdx){
            this.booklet.dataset.action='to-prev';
            this.pageCurr.addEventListener("animationend", (event) => {
                this.booklet.dataset.action='';
                this.setPageByIdx(idx);
            },{once:true});
        }
        else if(idx > this.pageIdx){
            this.booklet.dataset.action='to-next';
            this.pageCurr.addEventListener("animationend", (event) => {
                this.booklet.dataset.action='';
                this.setPageByIdx(idx);
            },{once:true});
        }
    }
    prev(idx=null){
        if(idx !== null){ if(!this.setPagePrevByIdx(idx)){console.warn('이동할 이전 페이지가 없습니다.'); return false;} }
        if(!this.pagePrev){ console.warn('이전 페이지가 없습니다.'); return false; }
        this.change(this.pagePrev.dataset.idx)
    }
    next(idx=null){
        if(idx !== null){ if(!this.setPageNextByIdx(idx)){console.warn('이동할 다음 페이지가 없습니다.'); return false;} }
        if(!this.pageNext){ console.warn('다음 페이지가 없습니다.'); return false; }
        this.change(this.pageNext.dataset.idx)
    }
    page(idx){       
        if(idx == this.pageIdx){return false;}
        else if(idx < this.pageIdx){this.prev(idx)}
        else if(idx > this.pageIdx){this.next(idx)}
    }
    first(){
        let idx = 0;
        this.page(idx);
    }
    last(){
        let idx = this.length -1;
        this.page(idx);
    }
    get length(){
        return this.pages.length
    }

    onclick(event){
        const target = event.target
        if(target.closest('.clickable')){
            if(target.closest('.booklet-page-part.left')){
                this.prev();
            }
            if(target.closest('.booklet-page-part.right')){
                this.next();
            }
        }

    }
}