var fmHandler = (function(){
  //-- private 함수 목록
  var fns = {
    "hide":function(ta,b){
      ta.classList.replace(b?'on':'off',!b?'on':'off');
    },
    "hideBox":function(evtTarget,b){
      let box = null;
      if(evtTarget.classList.contains('fm-box')){
        box = evtTarget
      }else{
        box = evtTarget.closest('.fm-box');
      }
      if(box){
        if(b){ //hide
          console.log('box-hide');
          if(box.querySelectorAll('.fm-modal.on .fm-close').length > 0){
            return;
          }else{
            fns.hide(box,true);
            box.querySelectorAll('.fm-modal.on').forEach((item, i) => {
              fns.hide(item,true);
            });
          }
        }else{ //show
          if(box.querySelectorAll('.fm-modal.on').length > 0){
            fns.hide(box,false);
          }
        }

      }
    },
    "hideModal":function(modal,b){
      fns.hide(modal,b);
      fns.hideBox(modal,b);
    },
    "onclickFbClose":function(btn){
      let modal = btn.closest('.fm-modal');
      if(modal) fns.hideModal(modal,true);

    }
  }

  var fmHandler = {
    "init":function(){
      window.addEventListener('load',function(){
        fmHandler.initEvent();
      })
    },
    "initEvent":function(){
      let modals = document.querySelectorAll('.fm-modal:not(.fm-inited)');
      modals.forEach((item, i) => {
        fmHandler.addModalEvent(item);
      });
      let boxs = document.querySelectorAll('.fm-box:not(.fm-inited)');
      boxs.forEach((item, i) => {
        fmHandler.addBoxEvent(item);
      });
      return true;
    },
    "addModalEvent":function(modal){
      var closes = modal.querySelectorAll('.fm-close');
      closes.forEach((item, i) => {
        item.addEventListener('click',function(evt){
          fns.onclickFbClose(this);
          return false;
        });
      });
      modal.classList.add('fm-inited')
    },
    "addBoxEvent":function(box){
      box.addEventListener('click',function(evt){
        fns.hideBox(this,true);
        return false;
      });
      box.classList.add('fm-inited')
    },
    "hideModal":function(ta,b){
      fns.hideModal(ta,b);
    },
    "hide":function(ta){
      fns.hideModal(ta,true);
    },
    "show":function(ta){
      fns.hideModal(ta,false);
    },
    "toggle":function(ta){
      var b = ta.classList.contains('on')
      fns.hideModal(ta,b);
    },


  }
  return fmHandler;
})()
