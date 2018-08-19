/**
 * GamepadLayout
 * @type {Object}
 * 한글
 */
var GamepadLayout = {
  "init":function(){
    window.addEventListener("gamepadconnected", this.connect);
    window.addEventListener("gamepaddisconnected", this.disconnect);
  },
  "boxes":function(idx,div){

  },
  "controller":[null,null,null,null,null,null],
  "connect":function(evt){
    GamepadLayout.controller[evt.gamepad.index] = evt.gamepad;
    console.log('Gamepad connected.');
    console.log(GamepadLayout.controller);
    GamepadLayout.startInterval(1);
  },
  "disconnect":function(evt){
    delete GamepadLayout.controller;
    console.log('Gamepad disconnected.');
    GamepadLayout.startInterval(0);
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
        $('.gamepad-'+i+' .info-index').html('')
        $('.gamepad-'+i+' .info-mapping').html('')
        $('.gamepad-'+i+' .info-connected').html()
        $('.gamepad-'+i+' .info-timestamp').html('')
        continue;

      }
      $('.gamepad-'+i+' .info-id').html(gp.id);
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
      return false;
    }
    var g = gs[idx];
    if(!g.vibrationActuator){
      console.log('fail : g.vibrationActuator ',idx)
      return false;
    }
    g.vibrationActuator.playEffect(g.vibrationActuator.type, {
        startDelay: 0,
        duration: 5000,
        weakMagnitude: 0.5,
        strongMagnitude: 1
    });
    console.log('playEffect : testRumble',idx)
  }

}
