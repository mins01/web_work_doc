var flexBanner = (function(){
  var flexBanner = {
    "init":function(){
      window.addEventListener('load',function(){
        flexBanner.initEvent();
      })

    },
    "initEvent":function(){
      var banners = document.querySelectorAll('.fb-banner');
      banners.forEach((item, i) => {
        flexBanner.addEvent(item);
      });

    },
    "addEvent":function(banner){
      var closes = banner.querySelectorAll('.fb-close');
      closes.forEach((item, i) => {
        item.addEventListener('click',function(evt){
          flexBanner.clickFbClose(this);
        });
      });
    },
    "clickFbClose":function(btn){
      let banner = btn.closest('.fb-banner');
      if(banner) banner.classList.replace('on','off');
    }
  }
  return flexBanner;
})()
