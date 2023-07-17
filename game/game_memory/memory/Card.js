'use strict';

class Card{
    num=0; //1~n , 0:NONE
    side=0; // n 번재 카드 , 0:NONE
    selected=false; // 현재 선택된 카드
    found=false; // 짝이 맞아서 찾은 카드
    constructor(num,side){
        this.num = num;
        this.side = side;
    }
    toString(){
        return JSON.stringify([ this.num, this.side, this.selected?'O':'X', this.found?'O':'X' ]);
    }
}

export default Card;