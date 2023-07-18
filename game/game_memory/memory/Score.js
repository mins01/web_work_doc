'use strict';


class Score{
    history=[];
    dateStart=null;
    dateEnd=null;
    constructor(){
        
    }
    reset(){
        this.history = [];
        this.dateStart = null;
        this.dateEnd = null;
    }
    start(){
        this.dateStart = new Date();
    }
    end(){
        this.dateEnd = new Date();
    }
    gapSeconds(){
        if(!this.dateStart) return null;
        let dateEnd = this.dateEnd?this.dateEnd:new Date();
        return (dateEnd.getTime()-this.dateStart.getTime())/1000;
    }
}

export default Score;