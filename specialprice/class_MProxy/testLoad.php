<?
/**
* 반복 호출 테스트
*/

//$url = "http://".$_SERVER["HTTP_HOST"].dirname($_SERVER['REQUEST_URI']).'/target.php';
//$url = "http://".$_SERVER["HTTP_HOST"].dirname($_SERVER['REQUEST_URI']).'/targetXml.php';
$url = "http://wwwdev.mins01.com/web_work/php/class_MProxy/proxy.php?URL=http%3A%2F%2Fwwwdev.mins01.com%2Fweb_work%2Fphp%2Fclass_MProxy%2FtargetXml.php&val01=값01&val02=값02&val03=값03&CONN_TIMEOUT=&EXEC_TIMEOUT=";

ob_implicit_flush(1); // 바로 출력하도록 설정(출력 버퍼가 동작 안한다)
ob_end_clean(); //출력 버퍼를 비운다.(이걸 안하면 이전 출력 버퍼가 데이터를 버퍼처리 하고있다.)

require('class.MProxy.php');
$mp = new MProxy();


$headers=getallheaders();
if($headers['Content-Type']=='application/x-www-form-urlencoded'){
	$postRaw = http_build_query($mp->stripslashesForArray($_POST));
}if($headers['Content-Type']=='multipart/form-data-encoded'){ //불완전, 현재 파일 업로드 지워안됨.
	$postRaw = http_build_query($mp->stripslashesForArray($_POST));
}else{ //그외의 경우 RAW POST값을 바로 사용한다.
	$postRaw = $mp->getRequestBody();
}

$cookieRaw = stripslashes($mp->http_build_cookie($mp->stripslashesForArray($_COOKIE)));
$opts = array();
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
	<?
	$TM0 = microtime(true);
	for($i=0,$m=100;$i<$m;$i++){
		$TM = microtime(true);
		$result = $mp->getContent($url,$postRaw,$cookieRaw,$headers, $opts);
		$TM2 = microtime(true)-$TM;
		echo "{$i} LOAD TIME : {$TM2} sec , cURL TIME{$result['curl_info']['CURLINFO_TOTAL_TIME']}<br>\n";
	}
	$TM2 = microtime(true)-$TM0;
	echo "TOTAL LOAD TIME : {$TM2} sec<br>\n";

	?>

	</body>
</html>
