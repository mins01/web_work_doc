<?
/**
* 해더로 xml만 표시해줌.
*/
//header("Content-type: text/xml");
header("Content-type: application/xml");
?>
<?
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
<hr />
HEADER
<pre><![CDATA[<? print_r(getallheaders())?>]]></pre>
<hr />
GET
<pre><![CDATA[<? print_r($_GET)?>]]></pre>
<hr />
POST
<pre><![CDATA[<? print_r($_POST)?>]]></pre>
<hr />
COOKIE
<pre><![CDATA[<? print_r($_COOKIE)?>]]></pre>
<hr />
끝부분
	</body>
</html>
