const wk1 = window.Worker?new Worker("worker.js"):null;
const wk2 = window.Worker?new Worker("worker.js"):null;
const wk3 = window.Worker?new Worker("worker.js"):null;
    
if(wk1){
    wk1.onmessage = (event)=>{
        // console.log('Main: Message received from worker script');
        console.log('wk1',event.data);
    }
    wk1.onmessageerror  = (error)=>{
        console.log('error',error);
    }
    wk1.infLoop = function(on){
        this.postMessage({on:on});
    }
}
if(wk2){
    wk2.onmessage = (event)=>{
        // console.log('Main: Message received from worker script');
        console.log('wk2',event.data);
    }
    wk2.onmessageerror  = (error)=>{
        console.log('error',error);
    }
    wk2.infLoop = function(on){
        this.postMessage({on:on});
    }
}
if(wk3){
    wk3.onmessage = (event)=>{
        // console.log('Main: Message received from worker script');
        console.log('wk3',event.data);
    }
    wk3.onmessageerror  = (error)=>{
        console.log('error',error);
    }
    wk3.infLoop = function(on){
        this.postMessage({on:on});
    }
}

let cnt = 0;
let on = 1;
function infLoop(){
    let lastCall = new Date();
    // for(var i = 0,m=loop;i<m;i++){
    while(1){
        console.log('on',on);
        cnt += 1;
        if(on==0){
            postMessage({'js':'worker.js','lastCall':lastCall.toISOString(), 'on':on});
            break;
        }
    }
}
