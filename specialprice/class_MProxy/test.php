<?
$url = "http://".$_SERVER["HTTP_HOST"].dirname($_SERVER['REQUEST_URI']).'/target.php';
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>프록시.php 테스트</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<script>
		var TM = 0;
		function startTM(){
			TM = (new Date()).getTime();
		}
		function endTM(){
			if(TM == 0){return false;}
			var TM2 = (new Date()).getTime() - TM;
			TM = 0;
			document.getElementById('times').value = TM2+' msec \n'+document.getElementById('times').value;;
		}
		function onsubmitEvent(f){
			startTM();
		}
		</script>
	</head>
	<body>
	<form action="proxy.php" method="get" target="ifm0" onsubmit="onsubmitEvent(this)">
		<input type="text" name="URL" value="<?=htmlspecialchars($url)?>">
		<input type="text" name="val01" value="값01">
		<input type="text" name="val02" value="값02">
		<input type="text" name="val03" value="값03">
		<hr>
		CONN_TIMEOUT(기본 5초,0이면 무제한)<input type="text" size="4" name="CONN_TIMEOUT" value="">
		EXEC_TIMEOUT(기본 5초,0이면 무제한)<input type="text" size="4" name="EXEC_TIMEOUT" value="">
		
		<input type="submit" value="get전송">
	</form>
<hr>
	<form action="proxy.php" method="post" target="ifm0" onsubmit="onsubmitEvent(this)">
		<input type="text" name="URL" value="<?=htmlspecialchars($url)?>">
		<input type="text" name="val01" value="값01">
		<input type="text" name="val02" value="값02">
		<input type="text" name="val03" value="값03">
		<hr>
		CONN_TIMEOUT(기본 5초,0이면 무제한)<input type="text" size="4" name="CONN_TIMEOUT" value="">
		EXEC_TIMEOUT(기본 5초,0이면 무제한)<input type="text" size="4" name="EXEC_TIMEOUT" value="">
		<input type="submit" value="post전송">
	</form>
<hr>
<div>
	<div style="float:left;width:600px;">
		<div style="padding:5px">
			<iframe onload="endTM()" name="ifm0" src="proxy.php" height="400;" style="width:100%;display:block;margin:0; border-size;0"></iframe>
		</div>
	</div>
	<div style="float:left;width:100px;">
		<div style="padding:5px">
			<textarea id="times" style="width:100%;display:block;margin:0; border-size;0; height:400px;"></textarea>
		</div>
	</div>
</div>

	</body>
</html>
