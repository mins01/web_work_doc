class Templater {
    debug = false;
    // 문자열 준비하기
    #defVars = null;
    #preparedStr = null;
    prepare(str){
        if (typeof str !== "string") { throw new TypeError('Only strings are supported.'); }
        const varNames = this.extractVariables(str); // 문자열 내부에 선언된 변수 뽑아오기
        const defVars = this.#defVars = varNames.reduce((acc, key) => { acc[key] = undefined; return acc; }, {});
        const preparedStr = this.#preparedStr = this.prepareTemplateString(str);
        return {defVars,preparedStr}
    }
    // 값 끼워넣고 템플릿 리터럴로 변경
    interpolate(data = {}, fns = {}) {
        const $SYS = { // 시스템 베이스 객체
            htmlEscape:this.constructor.htmlEscape,
            htmlRaw:this.constructor.htmlRaw,
        }
        const defVars = this.#defVars
        const preparedStr = this.#preparedStr
        if(defVars===null || preparedStr=== null){
            throw('required prepare()');
        }
        //-- 여기까지가 전처리
        const $ARGS = { ...defVars, ... fns ,  data:data, ...data, }
        const $ARGSKeys = Object.keys($ARGS);
        const fnBody = `
                const { ${ $ARGSKeys.join(' , ') } } = $ARGS;
                return \`${preparedStr}\`;
            `;
        try {
            const fn = new Function('$SYS','$ARGS', fnBody);
            return fn($SYS,$ARGS);
        } catch (error) {
            if(this.debug){
                error.preparedStr = preparedStr;
                console.error('Template evaluation error:', error );
                console.error('Template evaluation preparedStr:', error.preparedStr );
                console.error('Template evaluation data:', data );
                console.error('Template evaluation fns:', fns );
                throw error;
            }
            return null;
        }
    }
    toFragment(data = {}, fns = {}){
        const resultHtml = this.interpolate(data,fns);
        const temp = document.createElement('template');
        temp.innerHTML = resultHtml;
        return temp.content;
    }

    // <template> 기준으로 처리하기
    static createByTemplate(templateEmement, data = {}, fns={}){
        return this.createByHtml(templateEmement.innerHTML, data, fns)
    }
    // HTML 문자열 기준으로 처리
    static createByHtml(html, data = {}, fns={}){
        const instance = new this()
        instance.prepare(this.htmlUnescape(html))
        return instance.toFragment(data,fns);
    }

    //======= 유틸함수 모음
    // html escape
    
    static htmlEscape(str){
        if (typeof str !== "string") return str;
        return str
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
    htmlEscape(str) {
        return this.constructor.htmlEscape(str)
    }
    static htmlUnescape(str) {
        if (typeof str !== 'string') return str;
        return str
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, '&');
    }
    htmlUnescape(str) {
        return this.constructor.htmlUnescape(str)
    }
    // raw html
    static htmlRaw(str){
        return str
    }
    htmlRaw(str) {    
        return this.constructor.htmlRaw(str)
    }
    //======= 파싱용
    extractVariables(str) {    
        return this.constructor.extractVariables(str)
    }
    static extractVariables(str) {
        const mustacheRegex = /\{\{([\s\S]*?)\}\}/g;
        // 점(.) 또는 ?. 으로 연결된 변수명 추출
        const variableRegex = /\b[a-zA-Z_$][\w$]*(?:\?*\.[a-zA-Z_$][\w$]*)*\b/g;
        const variables = new Set();

        let match;
        while ((match = mustacheRegex.exec(str)) !== null) {
            let content = match[1];

            // 문자열 리터럴 제거 (단순)
            content = content.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '');

            const vars = content.match(variableRegex);
            if (vars) {
            vars.forEach(v => {
                // 옵셔널 체이닝, 점(.) 구분자로 분리 (?. 포함)
                const firstVar = v.split(/\.|\?\./)[0];
                variables.add(firstVar);
            });
            }
        }

        return [...variables];
    }
    // 템플릿 문자열 준비하기
    prepareTemplateString(str){
        // console.log('in-prepareTemplateString',str);

        return str
            // .replace(/\\$(\{+)/g,(match, p1) => `\\$${p1}`) // { escape  \${+~ => \${+
            .replace(/\$(\{+)/g,(match, p1) => `\\\$${p1}`) // { escape  ${+~ => \${+
            .replace(/(?<![\\$\{])\{\{\{\s*([^\}]*)\}\}\}/g,'\${ $SYS.htmlRaw( $1 ) }') // html raw 
            // .replace(/(?<![\\$\{])\{\{\s*([^\}]*)\}\}/g,'\${ $SYS.htmlEscape( $1 ) }') // html escape
            .replace(/(?<![\\$\{])\{\{\s*([^\}]*)\}\}/g,(match, p1) => { return `\${ $SYS.htmlEscape( ${p1} ) }` }) // html escape
            ;
    }
}