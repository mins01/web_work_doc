var fmHandler = (function(){
  //-- private 함수 목록
  var fns = {
    "hide":function(ta,b){
      ta.classList.replace(b?'on':'off',!b?'on':'off');
    },
    "hideContainer":function(evtTarget,b){
      let container = null;
      if(evtTarget.classList.contains('fm-container')){
        container = evtTarget
      }else{
        container = evtTarget.closest('.fm-container');
      }
      if(container){
        if(b){ //hide
          // console.log('container-hide');
          if(container.querySelectorAll('.fm-modal.on .fm-close').length > 0){
            return;
          }else{
            fns.hide(container,true);
            container.querySelectorAll('.fm-modal.on').forEach((item, i) => {
              fns.hide(item,true);
            });
          }
        }else{ //show
          if(container.querySelectorAll('.fm-modal.on').length > 0){
            fns.hide(container,false);
          }
        }

      }
    },
    "hideModal":function(modal,b){
      fns.hide(modal,b);
      fns.hideContainer(modal,b);
    },
    "hideAll":function(ta){
      // console.log('hideAll');
      var container = ta.closest('.fm-container');
      if(!container){return;}
      container.querySelectorAll('.fm-modal.on').forEach((item, i) => {
        fns.hideModal(item,true);
      });
    },
    "onclickFbClose":function(btn){
      let modal = btn.closest('.fm-modal');
      if(modal) fns.hideModal(modal,true);

    }
  }

  var fmHandler = {
    "initEvent":function(){
      let modals = document.querySelectorAll('.fm-modal:not(.fm-inited)');
      modals.forEach((item, i) => {
        fmHandler.addModalEvent(item);
      });
      let containers = document.querySelectorAll('.fm-container:not(.fm-inited)');
      containers.forEach((item, i) => {
        fmHandler.addContainerEvent(item);
      });
      return true;
    },
    "addModalEvent":function(modal){
      var closes = modal.querySelectorAll('.fm-close');
      closes.forEach((item, i) => {
        item.addEventListener('click',function(evt){
          fns.onclickFbClose(this);
          evt.stopPropagation();
          // evt.preventDefault();
          return false;
        });
      });
      modal.classList.add('fm-inited')
    },
    "addContainerEvent":function(container){
      container.addEventListener('click',function(evt){
        // fns.hideContainer(this,true);
        fns.hideAll(this);
        return false;
      });
      container.classList.add('fm-inited')
    },
    "hide":function(ta){
      fns.hideModal(ta,true);
    },
    "hideAll":function(ta){
      fns.hideAll(ta);
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
