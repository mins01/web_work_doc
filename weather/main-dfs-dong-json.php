<?
$url = 'http://www.weather.go.kr/weather/process/main-dfs-dong-json.jsp?type='.$_GET['type'].'&wideCode='.$_GET['wideCode'].'&cityCode='.$_GET['cityCode'];

// require('php/XML2Array.php');
require('php/Mproxy.php');
$mp = new Mproxy();
$res = $mp->getContent($url);
// $xml = $res['body'];
$arr = $res['body'];
// $xml = file_get_contents($url);
// $arr = XML2Array::createArray($xml);


$tm = 60*60*24;
header('Content-Type: application/json');
header("Expires: ".gmdate("D, d M Y H:i:s", time()+$tm)." GMT");
header('Cache-Control:public, max-age = '.$tm);

echo $arr;

exit;
