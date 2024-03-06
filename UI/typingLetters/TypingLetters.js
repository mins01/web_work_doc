class TypingLetters{
    container = null;
    letters = null;
    lettersIdx = 0;
    typings = null;
    intervalMs = 500;
    tm = null;
    running = false
    debug = false;
    constructor(container){
        this.container = container;
        this.letters = [];
        this.lettersIdx = 0;
        this.intervalMs = 500;
        this.tm = null;
        this.running = false
        this.debug = false;
    }
    stringToLetters(str){
        return Array.from(str.replace(/(\r\n|\r)/g,'\n'));
    }
    setIntervalMs(intervalMs){
        this.intervalMs = intervalMs;
        this.container.style.setProperty('--animation-duration',intervalMs+'ms');
    }
    init(){
        this.stop();
        this.lettersIdx = 0;
        this.clear()
    }
    start(){
        if(this.running){ console.warn('이미 실행중입니다.'); return false;}
        this.running = true;
        if(!this.draw()){
            this.stop();
            this.onend();
        }else{
            this.tm = setInterval(()=>{
                if(!this.draw()){
                    this.stop();
                    this.onend();
                }
            },this.intervalMs)
        }
        
        this.onstart()
    }
    onstart(){
        
    }
    stop(){
        if(!this.running) return false;
        this.running = false;
        if(this.tm){ clearInterval(this.tm); }
        this.tm = null;
        this.onstop();
    }
    onstop(){

    }
    onend(){

    }
    draw(){
        let letter = this.letters[this.lettersIdx];
        if(letter=== undefined){
            return false;
        }
        
        if(letter==="\n"){
            if(this.debug) console.log('draw','<br>');
            let brLetter = this.generateBrLetter()
            this.container.appendChild(brLetter);
        }else{
            if(this.debug)  console.log('draw',letter);
            let divLetter = this.generateDivLetter(letter)
            this.container.appendChild(divLetter)
        }
        
        this.lettersIdx++;
        this.ondraw(letter);
        return true;
    }
    ondraw(){

    }
    generateDivLetter(letter){
        let div = document.createElement('div');
        div.classList.add('letter');
        div.textContent = letter;
        return div;
    }
    generateBrLetter(letter){
        let div = document.createElement('br');
        div.classList.add('letter');
        return div;
    }
    clear(){
        this.container.innerHTML = '';
        this.onclear();
    }
    onclear(){

    }
}