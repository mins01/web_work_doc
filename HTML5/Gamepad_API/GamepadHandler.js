let GamepadHandler = (function(){
  var version = "2019050511";
  var log = console.log;



  var timer ={
    "version":version,
    "tm":null,
    "interval":100,
    "start":function(){
      this.stop();
      this.tm = setInterval(function(){
        GamepadHandler.sync();
      },this.interval);
    },
    "stop":function(){
      if(this.tm!=null){clearInterval(this.tm);}
      this.tm=null;
    }
  }
  var afihis = {}; //pressed 를 위한 히스토리용
  var GamepadHandler = {
    "buttonRepeatInterval":100,
    "axesThreshold":0.5,
    "setup":function(on){
      if(on){
        log('GamepadHandler.setUp(1)','addEventListener gamepadconnected,gamepaddisconnected');
        window.addEventListener("gamepadconnected", this.connect);
        window.addEventListener("gamepaddisconnected", this.disconnect);
      }else{
        log('GamepadHandler.setUp(0)','removeEventListener gamepadconnected,gamepaddisconnected');
        window.removeEventListener("gamepadconnected", this.connect);
        window.removeEventListener("gamepaddisconnected", this.disconnect);
        this.setSync(false);
      }
    },
    "onconnect":function(evt){

    },
    "ondisconnect":function(evt){

    },
    "onbuttonpress":function(gamepadPressDatas){
      console.log(gamepadPressDatas);
    },
    "connect":function(evt){
      log('GamepadHandler.connect()');
      GamepadHandler.setSync(true);
      GamepadHandler.onconnect(evt);
    },
    "disconnect":function(){
      log('GamepadHandler.disconnect()');
      GamepadHandler.setSync(false);
      GamepadHandler.ondisconnect(evt);
    },
    "setSync":function(on){
      if(on){
        timer.start();
      }else{
        timer.stop();
      }
    },
    "sync":function(){
      // log('GamepadHandler.sync()');
      var gps = navigator.getGamepads();;
      var gp = null;
      var gpis = (new Array(gps.length)).fill(null);
      var gpi = {};
      var time = (new Date()).getTime();
      var btnId = '';
      var btnPressedData = new Array(gps.length)
      var buttonChanged = false;

      var axesThresholdP = this.axesThreshold;
      var axesThresholdM = this.axesThreshold * -1;
      for(i=0,m=gps.length;i<m;i++){
        if(gps[i]==null){continue;}
        gp = gps[i];
        gpi = {
          "id":gp.id,
          "index":gp.index,
          "mapping":gp.mapping,
          "connected":gp.connected,
          "timestamp":gp.timestamp,
          "time":time,
          "axes":gp.axes.slice(0),
          "buttons":(new Array(gp.buttons.length)).fill(0),
        }
        gpis[i]=gpi;
        var btnId ='';
        if(btnPressedData[i]==null) btnPressedData[i] = new Array(gp.buttons.length);
        for(var i2=0,m2=gp.buttons.length;i2<m2;i2++){
          btnId = gp.index+':b'+i2
          if(gp.buttons[i2].pressed){
            // log(gpi.buttons[i2],time-afihis[btnId],time,afihis[btnId])
            if(afihis[btnId]==null){afihis[btnId]=0;}
            if( time-afihis[btnId] >= this.buttonRepeatInterval){
              gpi.buttons[i2] = gp.buttons[i2].value;
              afihis[btnId] = time;
              buttonChanged = true;
            }
          }else{
            if(afihis[btnId]!=0){
              afihis[btnId] = 0;
              buttonChanged = true;
            }
            gpi.buttons[i2] = 0;
          }
        }
        // if(gpi.buttons[0]==1){log(gpi.buttons[0],time-afihis["0:0"],time,afihis["0:0"]);} //for debug

        for(var i2=0,m2=gp.axes.length;i2<m2;i2++){
          var v = gp.axes[i2];
          btnId = gp.index+':a'+i2
          if(v > axesThresholdP || v < axesThresholdM ){
            // log(gpi.buttons[i2],time-afihis[btnId],time,afihis[btnId])
            if(afihis[btnId]==null){afihis[btnId]=0;}
            if( time-afihis[btnId] >= this.buttonRepeatInterval){
              gpi.axes[i2] = gp.axes[i2];
              afihis[btnId] = time;
              buttonChanged = true;
            }
          }else{
            if(afihis[btnId]!=0){
              afihis[btnId]=0;
              buttonChanged = true;
            }
            gpi.axes[i2] = 0;

          }
        }

        if(buttonChanged){ //버튼이 눌러졌을때만, AXES 따로 할려했지만, AXES를 나누는 것도.. 뭐하고..
          // console.log(gpis[0].buttons);
          this.onbuttonpress(gpis);
        }

      }

    },
    "rumble":function(idx,startDelay,duration,weakMagnitude,strongMagnitude){
      var gps = navigator.getGamepads();;

      if(!gps[idx]){
        console.error('fail : rumble ','GamepadHandler.rumble('+Array.prototype.slice.call(arguments).join(',')+')')
        return false;
      }
      var gp = gps[idx];
      if(!gp.vibrationActuator){
        console.error('fail : gp.vibrationActuator ','GamepadHandler.rumble('+Array.prototype.slice.call(arguments).join(',')+')');
        alert('fail : gp.vibrationActuator '+idx)
        return false;
      }
      gp.vibrationActuator.playEffect(gp.vibrationActuator.type, {
          startDelay: startDelay,
          duration: duration,
          weakMagnitude: weakMagnitude,
          strongMagnitude: strongMagnitude
      });
      console.log('GamepadHandler.rumble('+Array.prototype.slice.call(arguments).join(',')+')')
    },
    "weekRumble":function(idx,duration){
      this.rumble(idx,0,duration,0.5,0.5);
    }
    ,
    "strongRumble":function(idx,duration){
      this.rumble(idx,0,duration,1,1);
    }
  }
  return GamepadHandler;
})()
