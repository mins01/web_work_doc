
var menubar = (function(){
  var menubar = {
    "init":function(){

      document.addEventListener('click',this.on_click_toggle_sub)

    },
    "hideAll":function(){
      var els = document.querySelectorAll('.menu-sub.on');
      els.forEach((item, i) => {
        item.classList.remove('on')
      });
    },
    "showToClosest":function(menu_item){
      var menu_sub = menu_item.querySelector('.menu-sub')
      if(menu_sub){
        menu_sub.classList.add('on')
      }
      menu_sub = menu_item.closest('.menu-sub')
      while(menu_sub){
        menu_sub.classList.add('on');
        menu_sub = menu_sub.parentNode.closest('.menu-sub');
      }
    },
    "on_click_toggle_sub":function(evt){
      menubar.toggle_sub(evt.target);
    },
    "toggle_sub":function(ta){
      var els = null
      if(!ta.closest('.menubar')){
        this.hideAll();
        return;
      }
      if(ta.hasAttribute('data-toggle-sub')!==true ){
        return;
      }
      var menu_item = ta.closest('.menu-item');
      if(!menu_item){
        return;
      }
      var menu_sub = menu_item.querySelector('.menu-sub.on');
      if(menu_sub){
        menu_sub.classList.remove('on');
        return;
      }
      this.hideAll();
      this.showToClosest(menu_item);
    }
  }
  return menubar;
})()
