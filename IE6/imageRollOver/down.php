<?
define('_FILE_DIR_','.');
$file = $_REQUEST['file'];
$file = str_replace('..','.',$file);
$filePath = _FILE_DIR_.'/'.$file;
if(!is_file($filePath)){
	header("HTTP/1.0 404 Not Found");	
	echo '파일이 존재하지 않음';	
	exit;
}

$fp = fopen($filePath,'r');
if(!$fp){
	header("HTTP/1.0 404 Not Found");	
	echo '파일 열기 실패';
	exit;
}

/**
* nocache 설정이 없으면 10분을 캐시하도록 한다.
*/
if(!isset($_REQUEST['nocache'][0])){
	$t = (60*10);
	header("Expires: ".gmdate("D, d M Y H:i:s", time()+$t)." GMT");
	header('Cache-Control:public, max-age = '.$t); 
}

$fileSize = filesize($filePath);

header("Content-Transfer-Encoding: binary"); 
header("Content-Length: {$fileSize}");
header("Content-Type: image/png");

while (!feof($fp)) {
  echo fread($fp, 1024);
}
fclose($fp);
exit;

?>