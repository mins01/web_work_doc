class TemplateHandler{
    target = null;
    template = null;
    _data = null;

    static htmlToDoc(html){
        const doc = (new DOMParser()).parseFromString(html, 'text/html');
        // console.log(doc);
        return doc.body.firstChild;
    }


    constructor(target , template){
        this.target = target
        this.template = template;
        // this._shadowRoot = this.target.attachShadow({mode: 'open'})
        this._data = [];
    }
    set data(newData){
        if(newData===null || newData===undefined){ // null 등이면 빈 배열로 변경
            newData = [];
        }else if(Array.isArray(newData)){ // 배열이면 그냥 저장

        }else{ //그 외면 배열 속에 넣어서 저장
            newData = [newData];
        }

        this._data = newData;
        this.drawData();
        this.draw();
    }
    get data(){
        return this._data;
    }
    
    drawData(){
        console.log('drawData');
        this.target.innerHTML = '';
        this.data.forEach((d)=>{
            let div = document.createElement('div');
            div.classList.add('template-data');
            for(let k0 in d){
                let v0 = d[k0];
                this.drawDataForSlots(div,v0,k0)
            }
            this.target.append(div)
        });
    }
    drawDataForSlots(div,v0,k0){
        console.log('drawDataForSlots',[...arguments]);

        if(Array.isArray(v0)){
            for(let k1 in v0){
                let v1 = v0[k1];
                this.drawDataForSlots(div,v1,k0);
            }
        }else{
            if(v0 instanceof HTMLElement){
                v0.slot = k0
                div.append(v0);
            }else{
                let span = document.createElement('span');
                span.slot = k0;
                span.append(v0);
                div.append(span);
            }
            
            
        }
    }

    draw(){
        // let data = this.data;
        let data = this.target.querySelectorAll('.template-data:not(.template-data-shadow)');

        // var clone = document.importNode(this.template.content, true);
        data.forEach((d) => {
            console.log(d);
            d.attachShadow({mode: 'open'}).appendChild(document.importNode(this.template.content, true));
            d.classList.add('template-data-shadow')
        });
        console.log(typeof data);
        // if(typeof data)
    }
}