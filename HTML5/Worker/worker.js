let cnt = 0;
let on = 1;
function infLoop(){
    let lastCall = new Date();
    // for(var i = 0,m=loop;i<m;i++){
    while(cnt<5000){
        console.log('on',on);
        cnt += 1;
        if(on==0){
            postMessage({'js':'worker.js','lastCall':lastCall.toISOString(), 'on':on, 'cnt':cnt});
            break;
        }
    }
}
onmessage = function(event) {
    console.log('Worker: Message received from main script');
    let lastCall = new Date();
    on = event.data.on;
    console.log({'js':'worker.js','lastCall':lastCall.toISOString(), 'on':on, 'cnt':cnt});
    if(on==1){
        cnt = 0;
        infLoop();
    }
}



