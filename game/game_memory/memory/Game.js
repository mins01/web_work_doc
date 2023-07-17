'use strict';

import Board from "./Board.js";

class Game{
    debug=false;
    board=null;
    running=false;
    exited=false;
    constructor(){
        this.board = new Board;
        this.cards = this.board.cards;
    }

    init(n){
        this.board.init(n);
    }
    ready(n){
        this.exit = false;
        this.running = false;
        this.init(n)
        console.log('게임 준비');
    }
    start(){
        this.running = true;
        console.log('게임 시작');
        this.draw();
    }
    end(){
        console.log('게임 종료');
        this.draw();
        this.running = false;
        this.exit = true;

    }
    draw(){
        // this.board.draw();
        let boxs = [];
        boxs.push("# idx:[num,side,selected,found]");
        this.cards.forEach((card,idx)=>{
            if(card.found){
                boxs.push(`#${idx}:${card.num}# : found`)    
            }else if(card.selected){
                boxs.push(`<${idx}:${card.num}> : selected`)    
            }else{
                boxs.push(`[${idx}:??]`)    
            }
        })
        console.log(boxs.join("\n"))
    }
    selectCard(idx){
        if(!this.running){
            console.log('게임 진행중이 아닙니다.');
        }
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

export default Game;