class TemplateToCustomElement{
    static defineAll(){
        document.querySelectorAll('template[data-tagname]:not([data-ttce-on])').forEach((template)=>{
            this.define(template)
        })
    }
    static define(template){
        // 태그명
        const data_tagname = template.dataset.tagname??null;
        if(data_tagname === null){
            throw new Error('not exists data-tagname');
        }
        // 부모 클래스
        const data_extends = template.dataset.extends??'HTMLElement';
        const ttce_extends = globalThis[data_extends];
        console.log(data_extends,ttce_extends);

        const ttce_tagname = data_tagname;
        // 옵션
        const data_option = template.dataset.option??null;
        const ttce_option = (data_option !== null)?JSON.parse(data_option):null;

        if(customElements.get(ttce_tagname)){
            throw new Error(`exists data-tagname ${ttce_tagname}`);

        }


        // 제어 클래스
        const ttce_class = class extends ttce_extends {
            ttce_template = null;
            constructor() {
                super();
                this.ttce_template = template;
                this.attachShadow({mode: 'open'}).appendChild(this.ttce_template.content.cloneNode(true));
            }
        };
        // 커스텀 이벤트 등록
        customElements.define(ttce_tagname,ttce_class,ttce_option);
        console.log(ttce_tagname,ttce_class,ttce_option);

        // 처리됨을 표시
        template.dataset.ttceOn = (new Date()).toISOString();
    }
}