<?

$type = isset($_REQUEST['type'][0])?$_REQUEST['type']:'0'; //인코딩 타입
$mode = isset($_REQUEST['mode'][0])?$_REQUEST['mode']:'0'; //처리 모드
$disexp = isset($_REQUEST['disexp'][0])?$_REQUEST['disexp']:'0'; //확장자 사용안함

$enc = '';
switch($type){
	case '0': //euc-kr
		$enc = 'euc-kr';
		$t = 'x9H520Fi'; //한韓Ab
	break;
	case '1': //CP949
		$enc = 'cp949';
		$t = 'x9GY3vnbQWI='; //한샾韓Ab
	break;
	case '2': //GB2312
		$enc = 'gb2312';
		$t = 'tdjNvLn6QWI='; //地图国Ab
	break;
	case '3': //UTF-8
		$enc = 'utf-8';
		$t = '7ZWc7IO+6Z+T5Zu9QWI='; //한샾韓国Ab
	break;
}
$t = base64_decode($t);
if($disexp=='0'){
	$t.='.txt';
}

$fileName = $t; //파일이름

switch($mode){
	case '0': //native
		$fileName = $t; //파일이름
	break;
	case '1': //urlencode
		$fileName = urlencode($t);	
	break;
	case '2': //iconv(to EUC-KR)
		$fileName = iconv($enc,'euc-kr//IGNORE',$t);
	break;
}

$fileType = 'application/octet-stream;'; //파일타입
//$fileType = 'application/vnd.ms-excel';
header("Content-type: {$fileType}");
//header("Content-Disposition: attachment; filename=\"{$fileName}\" "); //가능하다면 직접 보여줌
header("Content-Disposition: attachment;"); //가능하다면 직접 보여줌
header("Content-Transfer-Encoding: binary"); 
//header("Content-Length: {$fileSize}");
echo $t,"\r\n",$fileName;
exit;
?>