class NoScrollInputHandler{
    lastInnerText = '';
    lastSelectionRange = null;
    addEventListener(target=window){
        target.addEventListener('beforeinput',(event)=>{
            if(event.target.classList.contains('no-scroll-input')){
                return this.handleBeforeinput(event)
            }
        })
        target.addEventListener('input',(event)=>{
            if(event.target.classList.contains('no-scroll-input')){
                return this.handleInput(event)
            }
        })
        target.addEventListener('compositionstart',(event)=>{
            if(event.target.classList.contains('no-scroll-input')){
                return this.handleInput(event)
            }
        })
        
    }
    handleBeforeinput(event){
        const target = event.target;
        this.lastInnerText = target.innerText
        this.lastSelectionRange = this.getSelectionRange();
        console.log('저장',this.lastSelectionRange);
        
        return 
    }
    handleInput(event){
        const target = event.target;
        const overflowed = target.scrollHeight > target.clientHeight || target.scrollWidth > target.clientWidth;
        if (overflowed) {
            // // 이전 상태로 복원
            // target.innerText = this.lastInnerText;
            // console.log('복원',this.lastSelectionRange);
            // this.setSelectionRange(this.lastSelectionRange);

            const inputType = event.inputType;
            const dataLength = event?.data?.length??1
            const range = this.getSelectionRange();
            const startOffset = range.endOffset-dataLength;
            
            console.log(inputType,event,range.endOffset,range.startOffset);
            if(startOffset>0 && startOffset != range.endOffset){
                range.setStart(range.commonAncestorContainer,startOffset);
                range.deleteContents()
                range.setEnd(range.commonAncestorContainer,startOffset);
            }else{
                range.startContainer.parentNode.removeChild(range.startContainer);
                console.log('줄바꿈?',range,range.startContainer,range.endContainer);
                
            }

            return false;
        }
        return 
    }
    getSelectionRange(){
        const selection = window.getSelection();
        if (!selection.rangeCount) return null;
        return selection.getRangeAt(0).cloneRange();
    }
    setSelectionRange(savedRange) {
        if (!savedRange) return;
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedRange);
    }
}