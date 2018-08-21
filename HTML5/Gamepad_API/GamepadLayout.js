/**
 * GamepadLayout
 * @type {Object}
 * 한글
 */
var GamepadLayout = {
  "init":function(){
    window.addEventListener("gamepadconnected", this.connect);
    window.addEventListener("gamepaddisconnected", this.disconnect);
    window.addEventListener("load", this.drawLayout);
  },
  "boxes":function(idx,div){

  },
  "controller":[null,null,null,null,null,null],
  "connect":function(evt){
    // GamepadLayout.controller[evt.gamepad.index] = evt.gamepad;
    console.log('Gamepad connected.');
    // console.log(GamepadLayout.controller);
    GamepadLayout.drawLayout()
    GamepadLayout.startInterval(1);
  },
  "disconnect":function(evt){
    delete GamepadLayout.controller;
    console.log('Gamepad disconnected.');
    GamepadLayout.startInterval(0);
  },
  "drawLayout":function(){
    var gs = navigator.getGamepads();
    console.log('gamepad count',gs.length)
    $(".gamepads").html('');
    for(var i=0,m=gs.length;i<m;i++){
      $(".gamepads").append('<li class="list-group-item"><div class="gamepad gamepad-'+i+'" data-type="xbox" style="margin:0 auto;"></div></li>');
      var $div = $(".gamepad-"+i);
      $div.attr('data-type','null').attr('data-index',i).html('')
      console.log('clear ',i)
      if(!gs[i]) continue;
      var gp = gs[i];
      if(gp.id.toLowerCase().indexOf('xbox')>-1){
        $div.attr('data-type','xbox');
      }else{
        $div.attr('data-type','usb');
      }

      for(var i2=0,m2=gp.buttons.length;i2<m2;i2++){
        // console.log('.gamepad-'+i+' .buttons-'+i2);
        $div.append('<div class="before-label after-label infobox button button-'+i2+'" data-label="btn #'+i2+'"></div>')
      }
      for(var i2=0,m2=gp.axes.length;i2<m2;i2++){
        $div.append('<div class="before-label after-label infobox axes axes-'+i2+'" data-label="axes #'+i2+'"><input type="range" data-label="axes #'+i2+'"  value="0" step="0.01" min="-1" max="1" disabled  /></div>');
      }
      $div.append('<div class="infoboxes">\
        <div class="before-label after-label info info-id" data-label="id"></div>\
        <div class="before-label after-label info info-index" data-label="index"></div>\
        <div class="before-label after-label info info-mapping" data-label="mapping"></div>\
        <div class="before-label after-label info info-connected" data-label="connected"></div>\
        <div class="before-label after-label info info-timestamp" data-label="timestamp"></div>\
        <button type="button" name="button" class="btn btn-sm btn-info testRumble" onclick="GamepadLayout.testRumble($(this).parents(\'.gamepad\').attr(\'data-index\'))">test Rumble</button>\
        </div>'

      );


    }
  },
  "tm":null,
  "startInterval":function(b){
    if(this.tm){
      clearInterval(this.tm);
    }
    if(b){
      this.tm = setInterval(this.sync,100)
    }else{
      this.sync();
    }

  },
  "sync":function(){
    // console.log("동작")
    // console.log(GamepadLayout.controller)
    // var c = GamepadLayout.controller;
    // console.log(GamepadLayout.controller);
    var c = navigator.getGamepads();;
    for(i=0,m=c.length;i<m;i++){
      var gp = c[i]
      if(!gp){
        $('.gamepad-'+i+' .info-id').html('');
        $('.gamepad-'+i+' .info-index').html(i)
        $('.gamepad-'+i+' .info-mapping').html('')
        $('.gamepad-'+i+' .info-connected').html('')
        $('.gamepad-'+i+' .info-timestamp').html('')
        $('.gamepad-'+i).attr('data-id','')
        $('.gamepad-'+i).attr('data-index',i)
        $('.gamepad-'+i).attr('data-mapping','')
        $('.gamepad-'+i).attr('data-connected','')
        $('.gamepad-'+i).attr('data-timestamp','')
        continue;

      }
      $('.gamepad-'+i).attr('data-id',gp.id)
      $('.gamepad-'+i).attr('data-index',gp.index)
      $('.gamepad-'+i).attr('data-mapping',gp.mapping)
      $('.gamepad-'+i).attr('data-connected',gp.connected)
      $('.gamepad-'+i).attr('data-timestamp',gp.timestamp)
      $('.gamepad-'+i+' .info-id').html(gp.id)
      $('.gamepad-'+i+' .info-index').html(gp.index)
      $('.gamepad-'+i+' .info-mapping').html(gp.mapping)
      $('.gamepad-'+i+' .info-connected').html(gp.connected)
      $('.gamepad-'+i+' .info-timestamp').html(gp.timestamp)

      for(var i2=0,m2=gp.buttons.length;i2<m2;i2++){
        // console.log('.gamepad-'+i+' .buttons-'+i2);
        $('.gamepad-'+i+' .button-'+i2).attr('data-value',gp.buttons[i2].value.toFixed(2)).attr('data-pressed',gp.buttons[i2].pressed?'1':'0')
      }
      for(var i2=0,m2=gp.axes.length;i2<m2;i2++){
        // console.log('.gamepad-'+i+' .axes-'+i2);
        $('.gamepad-'+i+' .axes-'+i2 +' input').prop('value',gp.axes[i2]);
        $('.gamepad-'+i+' .axes-'+i2 ).attr('data-value',gp.axes[i2].toFixed(2));
      }
    }
  },
  "testRumble":function(idx){
    var gs = navigator.getGamepads();;
    console.log(gs);
    if(!gs[idx]){
      console.log('fail : testRumble',idx)
      alert('fail : testRumble '+idx)
      return false;
    }
    var g = gs[idx];
    if(!g.vibrationActuator){
      console.log('fail : g.vibrationActuator ',idx)
      alert('fail : g.vibrationActuator '+idx)
      return false;
    }
    g.vibrationActuator.playEffect(g.vibrationActuator.type, {
        startDelay: 100,
        duration: 2000,
        weakMagnitude: 0.5,
        strongMagnitude: 1
    });
    console.log('playEffect : testRumble',idx)
  }

}
