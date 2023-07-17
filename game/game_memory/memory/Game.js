'use strict';

class Game{
    debug=false;
    board=null;
    constructor(){
        this.board = new Board;
        this.cards = this.board.cards;
    }

    init(n){
        this.board.init(n);
        this.draw();
    }
    draw(){
        this.board.draw();
    }
    selectCard(idx){
        let r = null
        if(r = this.board.selectCard(idx)){
            setTimeout(()=>{
                this.board.actionMatching();
                this.draw()
            },1000)
        }
        this.draw()
        return r;
    }
}