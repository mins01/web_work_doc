<?
/**
* 테스트용 타겟 파일
*/
require('lib.php');

//sleep(1);
setcookie('TestTime','한글 "-" '.date('Y-m-d H:i:s'));
?><!DOCTYPE HTML>
<html>
	<head>
		<title>타겟페이지</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	</head>
	<body>
시작부분
<hr>
HEADER
<pre><? print_r(getallheaders())?></pre>
<hr>
GET
<pre><? print_r($_GET)?></pre>
<hr>
POST
<pre><? print_r($_POST)?></pre>
<hr>
COOKIE
<pre><? print_r($_COOKIE)?></pre>
<hr>
끝부분
	</body>
</html>
