<?
$url = 'http://www.weather.go.kr/wid/queryDFSRSS.jsp?zone='.$_GET['zone'];

require('php/XML2Array.php');
require('php/Mproxy.php');
$mp = new Mproxy();
$res = $mp->getContent($url);
$xml = $res['body'];
// $xml = file_get_contents($url);


$arr = XML2Array::createArray($xml);
header('Content-Type: application/json');
if(defined('JSON_UNESCAPED_UNICODE')){
	echo json_encode($arr,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
}else{
	echo json_encode($arr);
}

exit;
?>