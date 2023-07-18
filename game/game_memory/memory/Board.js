'use strict';

import Card from "./Card.js";


class Board{
    debug = false;
    cards = [];
    score = null;
    constructor(){
        this.cards = [];
    };
    consoleDebug(){
        if(this.debug) console.log.apply(console,[...arguments]);
    }
    consoleError(){
        if(this.debug) console.error.apply(console,[...arguments]);
    }
    init(n){
        this.generateCards(n);
        this.shuffleCards();
    }
    generateCards(halfN){
        this.cards = [];
        for(let i=0,m=halfN;i<m;i++){
            this.cards.push(new Card(i,1));
            this.cards.push(new Card(i,2));
        }
    };
    shuffleCards(){
        this.cards.sort(() => Math.random() - 0.5);
    }
    printCards(){
        this.consoleDebug('Board::printCards()');
        this.consoleDebug(this.cards);
        // this.cards.forEach((card,idx)=>{
        //     this.consoleDebug(idx,card);
        // })
    }
    draw(){
        let boxs = [];
        boxs.push("# idx:[num,side,selected,found]");
        this.cards.forEach((card,idx)=>{
            boxs.push(idx+":"+card);
        })
        console.log(boxs.join("\n"))
    }

    get selectedLength(){
        let length = 0;
        this.cards.forEach((card)=>{ if(card.selected) length++; })
        return length;
    }
    get notFoundLength(){
        let length = 0;
        this.cards.forEach((card)=>{ if(!card.found) length++; })
        return length;
    }
    get foundLength(){
        let length = 0;
        this.cards.forEach((card)=>{ if(card.found) length++; })
        return length;
    }
    selectCard(idx){
        if(this.cards[idx] === undefined){ this.consoleError("지정카드가 없음"); return false; }
        if(this.selectedLength >= 2){ this.consoleError("이미 2장 이상 선택되었음."); return false; }
        if(this.cards[idx].selected){ this.consoleError("이미 선택된 카드"); return false; }
        if(this.cards[idx].found){ this.consoleError("이미 찾은 카드"); return false; }
        this.cards[idx].selected = true;
        this.score.history.push(idx);
        let idxes = this.selectedCardIdxes();
        return (idxes.length == 2);
    }
    selectedCardIdxes(){
        let idxes = [];
        this.cards.forEach((card,idx)=>{
            if(card.selected) idxes.push(idx);
        })
        return idxes;
    }
    /**
     * 짝이 맞는 카드가 있는지 확인한다.
     */
    checkMatching(){
        let idxes = this.selectedCardIdxes();
        if(idxes.length < 2){ this.consoleDebug("선택된 카드 수가 2장 미만"); return false; }
        if(this.cards[idxes[0]].num != this.cards[idxes[1]].num){ return this.actionResetSelectedCard(); }
        if(this.cards[idxes[0]].num == this.cards[idxes[1]].num){ return this.actionMatchingSelectedCard(); }
    }
    actionResetSelectedCard(){
        this.consoleDebug("서로 다른 카드를 선택함","카드 초기화"); 
        this.cards.forEach((card,idx)=>{
            if(card.selected) card.selected = false;
        })
        return true;
    }
    actionMatchingSelectedCard(){
        this.consoleDebug("서로 같은 카드를 선택함","카드를 찾음");
        this.cards.forEach((card,idx)=>{
            if(card.selected){
                card.selected = false;
                card.found = true;
            }
        })
        return true;
    }
    checkEnd(){
        return (this.notFoundLength==0);
    }
}

export default Board;