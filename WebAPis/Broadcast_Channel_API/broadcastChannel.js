var bc = new BroadcastChannel('test_channel');

bc.addEventListener('message',function(evt){
    let d = new Date();
    let li = document.createElement('li');
    li.textContent = '['+d.getMinutes()+':'+d.getSeconds()+'] '+evt.data;
    li.className="list-group-item";
    document.querySelector('#broadcast').insertBefore(li,document.querySelector('#broadcast').firstElementChild)
})

function sendMessage(val){
    bc.postMessage(document.title+': '+val);

    let d = new Date();
    let li = document.createElement('li');
    li.textContent = '['+d.getMinutes()+':'+d.getSeconds()+'] '+'ME: '+val;
    li.className="list-group-item";
    document.querySelector('#broadcast').insertBefore(li,document.querySelector('#broadcast').firstElementChild)
}