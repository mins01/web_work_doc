class Templater {
    static interpolate(str, data = {}) {
        try {
            const keys = ['data',...Object.keys(data)];
            const values = [data,...Object.values(data)];            
            const fn = new Function(...keys, `return \`${str}\`;`);
            return fn(...values);
        } catch (error) {
            error.interpolateString = str;
            // console.error('Template evaluation error:', error );
            console.error('Template evaluation string:', error.interpolateString );
            // throw error;
            return null;
        }
    }
    static renderTemplate(template, data = {}){
        const html = template.innerHTML;
        return this.renderHtml(html,data)
    }
    static renderHtml(html, data = {}){
        const resultHtml = this.interpolate(html, data);
        const temp = document.createElement('template');
        temp.innerHTML = resultHtml;
        return temp.content;
    }
}