class Templater {
    static debug = false;
    // 문자열 준비하기
    static prepare(str){
        const varNames = this.extractVarNames(str); // 문자열 내부에 선언된 변수 뽑아오기
        const defVars = varNames.reduce((acc, key) => { acc[key] = undefined; return acc; }, {});
        const preparedStr =  this.prepareTemplateString(str);
        return {defVars,preparedStr}
    }
    // 값 끼워넣고 템플릿 리터럴로 변경
    static interpolate(str, data = {}, fns = {}) {
        try {
            const $SYS = { // 시스템 베이스 객체
                htmlEscape:this.htmlEscape,
                htmlRaw:this.htmlRaw,
            }
            //-- 여기서부터
            const {defVars,preparedStr} = this.prepare(str);
            //-- 여기까지가 전처리


            const $ARGS = { ...defVars, ... fns ,  data:data, ...data, }
            const $ARGSKeys = Object.keys($ARGS);
            const fnBody = `
                    const { ${ $ARGSKeys.join(' , ') } } = $ARGS;
                    return \`${preparedStr}\`;
                `;
            const fn = new Function('$SYS','$ARGS', fnBody);
            return fn($SYS,$ARGS);
        } catch (error) {
            if(this.debug){
                error.interpolateString = str;
                console.error('Template evaluation error:', error );
                console.error('Template evaluation string:', error.interpolateString );
                console.error('Template evaluation data:', data );
                console.error('Template evaluation fns:', fns );
                throw error;
            }
            return null;
        }
    }

    // <template> 기준으로 처리하기
    static renderTemplate(template, data = {}){
        const html = template.innerHTML;
        return this.renderHtml(html,data)
    }
    // HTML 문자열 기준으로 처리
    static renderHtml(html, data = {}){
        const resultHtml = this.interpolate(html, data);
        const temp = document.createElement('template');
        temp.innerHTML = resultHtml;
        return temp.content;
    }

    //======= 유틸함수 모음
    // html escape
    static htmlEscape(str) {
        console.log('in-htmlEscape',str);
        
        if (typeof str !== "string") return str;

        return str
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
    // raw html
    static htmlRaw(str){
        return str
    }
    // 변수 분리해내기
    static extractVarNames(str){
        console.log('in-extractVarNames',str);
        if (typeof str !== "string") return str;
        const regex = /(?<!\\)\{\{\s*([\w$]+)(?:\.[\w$.]+)?\s*\}\}/g;
        
        const matches = Array.from(str.matchAll(regex));
        const varNames = matches.map(match => match[1]);
        return varNames;
    }
    // 템플릿 문자열 준비하기
    static prepareTemplateString(str){
        return str
            .replace(/\\(\{+)/g,'\${ $SYS.htmlRaw( "$1" ) }') // { escape 
            .replace(/\{\{\{\s*([^\}]*)\}\}\}/g,'\${ $SYS.htmlRaw( $1 ) }') // html raw 
            .replace(/\{\{\s*([^\}]*)\}\}/g,'\${ $SYS.htmlEscape( $1 ) }') // html escape
            ;
    }
}