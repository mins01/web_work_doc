var G_echo = {
	"init":function(){
		$(".input-button-in").prop('tm',0);
		$(".input-button-in:enabled").on("pointerdown",function(el){
			this.tm = (new Date()).getTime();
			$(this).attr('data-focus','1');
			G_echo.message("Push")
		}).on("pointerup",function(el){
			G_echo.add(this.tm,(new Date()).getTime());
			$(this).attr('data-focus','0');
			G_echo.message("Release")
		})
	},
	"message":function(msg){
		$("#message-box").html(msg);
	},
	"add":function(tm0,tm1){
		console.log(tm0,tm1,tm1-tm0);
		setTimeout(function(delay){
			return function(){
					G_echo.echo(delay);
			}
		}(tm1-tm0),3000)
	},
	"echo":function(delay){
		G_echo.message("On")
		navigator.vibrate(0);
		navigator.vibrate(delay);
		$(".input-button-out").attr('data-focus','1');
		setTimeout(function(){
			$(".input-button-out").attr('data-focus','0');
			G_echo.message("Off")
		},delay)
		
		console.log(delay);
	},
	"stop":function(){ //제대로 동작 안할꺼다.
		navigator.vibrate(0);
		$(".input-button-out").attr('data-focus','0');
	}
	
}