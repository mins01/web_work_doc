'use strict';

import Board from "./Board.js";
import Score from "./Score.js";

class Game{
    debug=false;
    board=null;
    score=null;
    running=false;
    checking=false;
    selecting=false;
    ended=false;
    initN=0;
    constructor(){
        this.score = new Score();
        this.board = new Board();
        this.board.score = this.score;
        this.cards = this.board.cards;
    }

    init(n){
        this.initN = n
        this.board.init(n);
    }
    ready(n){
        if(!n){
            n = this.initN;
        }
        console.log('게임 준비');
        this.ended = false;
        this.running = false;
        this.init(n)
        this.score.reset();
        this.onReady();
    }
    onReady(){
        console.log('onReady');
    }
    start(){
        console.log('게임 시작');
        this.running = true;
        this.score.start();
        this.onStart();
    }
    onStart(){
        this.draw();        
        console.log('onStart');
    }
    end(){
        console.log('게임 종료');
        this.running = false;
        this.ended = true;
        this.score.end();
        this.onEnd();
    }
    onEnd(){
        this.draw();
        console.log('onEnd');
    }
    draw(){
        // this.board.draw();
        let boxs = [];
        boxs.push("# idx:[num]");
        this.board.cards.forEach((card,idx)=>{
            if(card.found){
                boxs.push(`  #${idx}:${card.num}# : found`)    
            }else if(card.selected){
                boxs.push(`  <${idx}:${card.num}> : selected`)    
            }else{
                boxs.push(`  [${idx}:??]`)    
            }
        })
        console.log('# ==== CARDS ============================ #');
        console.log(boxs.join("\n"))
    }
    selectCard(idx){
        if(!this.running){
            console.log('게임 진행중이 아닙니다.');
            return false;
        }
        let r = null

        this.selecting = true;
        
        if(r = this.board.selectCard(idx)){
            this.checkCards();
        }
        this.draw()
        return r;
    }
    checkCards(){
        this.checking=true;
        setTimeout(()=>{
            this.checking = false;
            this.selecting = false;
            this.board.checkMatching();
            if(this.board.checkEnd()){
                return this.end();    
            }else{
                this.draw()
            }
        },1000)
    }
}

export default Game;