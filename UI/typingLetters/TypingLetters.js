class TypingLetters{
    divTypingLetters = null;
    letters = null;
    lettersIdx = 0;
    typings = null;
    intervalMs = 500;
    tm = null;
    running = false
    constructor(divTypingLetters){
        this.divTypingLetters = divTypingLetters;
        this.letters = [];
        this.lettersIdx = 0;
        this.intervalMs = 500;
        this.tm = null;
        this.running = false
    }

    init(){
        this.lettersIdx = 0;
        this.clear()
    }
    start(){
        if(this.running){ console.log('이미 실행중입니다.'); return false;}
        this.running = true;
        this.tm = setInterval(()=>{
            if(!this.draw()){
                this.stop();
            }
        },this.intervalMs)
    }
    stop(){
        this.running = false;
        if(this.tm){ clearInterval(this.tm); }
        this.tm = null;
    }
    draw(){
        let letter = this.letters[this.lettersIdx];
        if(letter=== undefined){
            return false;
        }
        console.log('draw',letter);
        let divLetter = this.generateDivLetter(letter)
        this.divTypingLetters.appendChild(divLetter)
        this.lettersIdx++;
        return true;
    }
    generateDivLetter(letter){
        let div = document.createElement('div');
        div.classList.add('letter');
        div.textContent = letter;
        return div;
    }
    clear(){
        this.divTypingLetters.innerHTML = '';
    }
}