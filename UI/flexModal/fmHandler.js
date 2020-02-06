var fmHandler = (function(){
  function hide(ta,b){
    ta.classList.replace(b?'on':'off',!b?'on':'off');
  }
  var fmHandler = {
    "init":function(){
      window.addEventListener('load',function(){
        fmHandler.initEvent();
      })
    },
    "initEvent":function(){
      let modals = document.querySelectorAll('.fm-modal');
      modals.forEach((item, i) => {
        fmHandler.addModalEvent(item);
      });
      let boxs = document.querySelectorAll('.fm-box');
      boxs.forEach((item, i) => {
        fmHandler.addBoxEvent(item);
      });
    },
    "addModalEvent":function(modal){
      var closes = modal.querySelectorAll('.fm-close');
      closes.forEach((item, i) => {
        item.addEventListener('click',function(evt){
          fmHandler.onclickFbClose(this);
          return false;
        });
      });
    },
    "addBoxEvent":function(box){
      box.addEventListener('click',function(evt){
        fmHandler.closeBox(this);
        return false;
      });
    },
    "onclickFbClose":function(btn){
      let modal = btn.closest('.fm-modal');
      if(modal) modal.classList.replace('on','off');
      this.closeBox(modal);
    }
    ,"closeBox":function(evtTarget){
      let box = null;
      if(evtTarget.classList.contains('fm-box')){
        box = evtTarget
      }else{
        box = evtTarget.closest('.fm-box');
      }
      if(box){
        console.log("(.fm-modal.on .fm-close).length = ",box.querySelectorAll('.fm-modal.on .fm-close').length);
        if(box.querySelectorAll('.fm-modal.on .fm-close').length > 0){
          console.log("(.fm-modal.on .fm-close).length = ",box.querySelectorAll('.fm-modal.on .fm-close').length);
          return;
        }else{
          console.log("(.fm-modal.on .fm-close).length x = ",box.querySelectorAll('.fm-modal.on .fm-close').length);
          hide(box,true);
        }
      }
    }
  }
  return fmHandler;
})()
