/**
 * 템플릿 문자열을 데이터와 결합하여 HTML 또는 텍스트 결과를 생성하는 유틸리티 클래스입니다.
 *
 * @class Templater
 * @description
 * - Mustache 스타일의 `{{ }}` 또는 `{{{ }}}` 템플릿 구문을 지원합니다.
 * - HTML 이스케이프 처리, HTML 원본 출력, 문자열 복원(unescape) 등의 기능을 제공합니다.
 * - 데이터 바인딩과 함께 안전한 HTML 출력 및 DOM 변환이 가능합니다.
 * - `prepare()` → `interpolate()` → `toFragment()` 순서로 사용하는 것이 일반적입니다.
 *
 * @example
 * const html = `
 *   <h1>{{ title }}</h1>
 *   <p>{{{ htmlContent }}}</p>
 * `;
 *
 * const fragment = Templater.createByHtml(html, { title: '제목', htmlContent: '<b>굵게</b>' });
 * document.body.appendChild(fragment);
 *
 * @property {boolean} debug - 디버그 모드 활성화 여부
 *
 * @private
 * @property {Object.<string, undefined>|null} #defVars - 추출된 변수 목록 (prepare 단계에서 설정)
 * @property {string|null} #preparedStr - 가공된 템플릿 문자열
 *
 * @method prepare - 템플릿 문자열 준비 및 변수 추출
 * @method interpolate - 데이터와 함수 바인딩 후 최종 문자열 생성
 * @method toFragment - 최종 문자열을 DocumentFragment로 변환
 * @method extractVariables - 템플릿 내 변수명 추출
 * @method prepareTemplateString - 템플릿 문자열을 실행 가능한 형태로 변환
 *
 * @method static htmlEscape - 문자열을 HTML 엔티티로 변환
 * @method static htmlUnescape - HTML 엔티티를 일반 문자열로 복원
 * @method static htmlRaw - 가공 없이 문자열 그대로 반환
 * @method static createByTemplate - `<template>` 요소 기반 DocumentFragment 생성
 * @method static createByHtml - HTML 문자열 기반 DocumentFragment 생성
 * @method static createByText - 일반 텍스트 문자열 기반 DocumentFragment 생성
 */
class Templater {
    /**
     * 디버그 모드 활성화 여부를 설정합니다.
     * true일 경우, 템플릿 처리 중 발생한 오류 정보를 콘솔에 출력합니다.
     * 
     * @type {boolean}
     * @default false
     */
    debug = false;
    
    /**
     * `prepare()` 호출 시 추출된 변수명 목록을 저장하는 비공개 필드입니다.
     * 변수명은 키로, 값은 `undefined`로 설정된 객체입니다.
     * 
     * @type {Object.<string, undefined>|null}
     * @private
     */
    #defVars = null;
    /**
     * `prepare()` 호출 시 생성된 가공된 템플릿 문자열을 저장하는 비공개 필드입니다.
     * 
     * @type {string|null}
     * @private
     */
    #preparedStr = null;
    
    
    /**
    * 템플릿 문자열을 준비하여 변수명을 추출하고, 기본 변수 객체를 생성합니다.
    * 선택적으로 템플릿 문자열 내의 HTML 엔티티를 unescape 처리할 수 있습니다.
    *
    * @param {string} str - 준비할 템플릿 문자열입니다.
    * @param {boolean} [useHtmlUnescape=false] - true일 경우, HTML 엔티티를 원래 문자로 변환합니다. <-- 중요함 일반 TEXT 기준이면 false, HTML엔티티 처리된것이면 true.
    * @returns {{ defVars: Object.<string, undefined>, preparedStr: string }} 
    * 반환값:
    *  - `defVars`: 추출된 변수명을 키로 하고 값이 `undefined`인 객체
    *  - `preparedStr`: 가공된 템플릿 문자열 (HTML unescape 여부에 따라 다름)
    *
    * @throws {TypeError} 입력값이 문자열이 아닐 경우 예외가 발생합니다.
    */
    prepare(str, useHtmlUnescape=false){
        if (typeof str !== "string") { throw new TypeError('Only strings are supported.'); }
        const varNames = this.extractVariables(str); // 문자열 내부에 선언된 변수 뽑아오기
        const defVars = this.#defVars = varNames.reduce((acc, key) => { acc[key] = undefined; return acc; }, {});
        const preparedStr = this.#preparedStr = this.prepareTemplateString(str,useHtmlUnescape);
        return {defVars,preparedStr}
    }
    /**
    * 준비된 템플릿 문자열에 데이터를 바인딩하여 최종 문자열을 반환합니다.
    * 
    * @param {Object} [data={}] - 템플릿에 바인딩할 데이터 객체입니다. (키-값 쌍)
    * @param {Object} [fns={}] - 템플릿에서 사용할 추가 함수들입니다.
    * @returns {string|null} 최종 렌더링된 문자열을 반환합니다. 오류 발생 시 `null`을 반환합니다.
    * 
    * @throws {Error} `prepare()` 메서드가 선행되지 않았거나 템플릿 처리 중 오류가 발생할 경우 예외가 발생합니다.
    * 
    * @description
    * - `prepare()` 메서드로 미리 정의된 템플릿과 변수 목록을 사용하여, 주어진 데이터와 함수들을 바인딩합니다.
    * - 템플릿 내부에서는 전달된 데이터, 함수, 시스템 함수(`htmlEscape`, `htmlRaw`)를 모두 사용할 수 있습니다.
    * - 오류 발생 시 디버그 모드에서는 상세한 정보를 콘솔에 출력합니다.
    */
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
    
    /**
    * 데이터를 바인딩한 템플릿 문자열을 DOM의 DocumentFragment 형태로 반환합니다.
    *
    * @param {Object} [data={}] - 템플릿에 바인딩할 데이터 객체입니다. (키-값 쌍)
    * @param {Object} [fns={}] - 템플릿에서 사용할 추가 함수들입니다.
    * @returns {DocumentFragment} - 렌더링된 HTML을 포함하는 DocumentFragment 객체입니다.
    *
    * @description
    * - `interpolate()` 메서드를 사용하여 템플릿 문자열에 데이터를 바인딩한 후,
    * - 해당 HTML 문자열을 `<template>` 요소에 삽입하고, `DocumentFragment`로 변환하여 반환합니다.
    * - 반환된 `DocumentFragment`는 DOM에 직접 삽입하거나 추가적인 조작이 가능합니다.
    */
    toFragment(data = {}, fns = {}){
        const resultHtml = this.interpolate(data,fns);
        const temp = document.createElement('template');
        temp.innerHTML = resultHtml;
        return temp.content;
    }
    
    /**
    * 주어진 `<template>` 요소를 기반으로 템플릿을 렌더링하고 DocumentFragment로 반환합니다.
    *
    * @param {HTMLTemplateElement} templateEmement - 사용할 `<template>` DOM 요소입니다.
    * @param {Object} [data={}] - 템플릿에 바인딩할 데이터 객체입니다.
    * @param {Object} [fns={}] - 템플릿에서 사용할 추가 함수들입니다.
    * @returns {DocumentFragment} 렌더링된 DocumentFragment입니다.
    */
    static createByTemplate(templateEmement, data = {}, fns={}){
        return this.createByHtml(templateEmement.innerHTML, data, fns)
    }
    
    /**
    * HTML 문자열을 기반으로 템플릿을 렌더링하고 DocumentFragment로 반환합니다.
    * (HTML 엔티티가 자동 unescape 처리됩니다)
    *
    * @param {string} html - 사용할 HTML 템플릿 문자열입니다.
    * @param {Object} [data={}] - 템플릿에 바인딩할 데이터 객체입니다.
    * @param {Object} [fns={}] - 템플릿에서 사용할 추가 함수들입니다.
    * @returns {DocumentFragment} 렌더링된 DocumentFragment입니다.
    */
    static createByHtml(html, data = {}, fns={}){        
        const instance = new this()
        instance.prepare(html,true)
        return instance.toFragment(data,fns);
    }
    
    /**
    * 일반 텍스트 문자열을 기반으로 템플릿을 렌더링하고 DocumentFragment로 반환합니다.
    * (HTML 엔티티 unescape 처리를 하지 않습니다)
    *
    * @param {string} text - 사용할 일반 텍스트 템플릿 문자열입니다.
    * @param {Object} [data={}] - 템플릿에 바인딩할 데이터 객체입니다.
    * @param {Object} [fns={}] - 템플릿에서 사용할 추가 함수들입니다.
    * @returns {DocumentFragment} 렌더링된 DocumentFragment입니다.
    */
    static createByText(text, data = {}, fns={}){        
        const instance = new this()
        instance.prepare(text,false) //unescape 처리 안한다.
        return instance.toFragment(data,fns);
    }
    
    //======= 유틸함수 모음
    /**
    * 문자열을 HTML 엔티티로 변환합니다. (HTML Escape)
    *
    * @param {string} str - 변환할 문자열입니다.
    * @returns {string} HTML 엔티티로 변환된 문자열입니다. 입력이 문자열이 아니면 원본 그대로 반환합니다.
    */
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
    /**
    * HTML 엔티티로 변환된 문자열을 원래 문자열로 되돌립니다. (HTML Unescape)
    *
    * @param {string} str - 되돌릴 문자열입니다.
    * @returns {string} 복원된 원래 문자열입니다. 입력이 문자열이 아니면 원본 그대로 반환합니다.
    */
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
    /**
    * 주어진 문자열을 가공하지 않고 그대로 반환합니다. (Raw HTML)
    *
    * @param {string} str - 반환할 문자열입니다.
    * @returns {string} 입력된 문자열 그대로 반환합니다.
    */
    static htmlRaw(str){
        return str
    }
    htmlRaw(str) {    
        return this.constructor.htmlRaw(str)
    }
    
    
    //======= 파싱용
    /**
    * 주어진 템플릿 문자열 내에서 변수명을 추출하여 배열로 반환합니다.
    *
    * @param {string} str - 변수명을 추출할 템플릿 문자열입니다.
    * @returns {string[]} 추출된 변수명들의 배열입니다.
    */
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
    
    /**
    * 템플릿 문자열을 실행 가능한 템플릿 문자열로 변환하여 반환합니다.
    * 선택적으로 HTML 엔티티를 unescape 처리할 수 있습니다.
    *
    * @param {string} str - 변환할 템플릿 문자열입니다.
    * @param {boolean} [useHtmlUnescape=false] - true일 경우, 템플릿 내 HTML 엔티티를 복원합니다.
    * @returns {string} 실행 가능한 템플릿 문자열입니다.
    */
    prepareTemplateString(str,useHtmlUnescape=false){
        // console.log('in-prepareTemplateString',str);
        
        return str
        // .replace(/\\$(\{+)/g,(match, p1) => `\\$${p1}`) // { escape  \${+~ => \${+
        .replace(/\$(\{+)/g,(match, p1) => `\\\$${p1}`) // { escape  ${+~ => \${+
        .replace(/(?<![\\$\{])\{\{\{\s*([^\}]*)\}\}\}/g,'\${ $SYS.htmlRaw( $1 ) }') // html raw 
        // .replace(/(?<![\\$\{])\{\{\s*([^\}]*)\}\}/g,'\${ $SYS.htmlEscape( $1 ) }') // html escape
        .replace(/(?<![\\$\{])\{\{\{\s*([^\}]*)\}\}\}/g,(match, p1) => {
            if(useHtmlUnescape){ p1 = this.htmlUnescape(p1); }
            return `\${ $SYS.htmlRaw( ${p1} ) }` 
        }) // html raw 
        .replace(/(?<![\\$\{])\{\{\s*([^\}]*)\}\}/g,(match, p1) => {
            if(useHtmlUnescape){ p1 = this.htmlUnescape(p1); }
            return `\${ $SYS.htmlEscape( ${p1} ) }` 
        }) // html escape
        ;
    }
}