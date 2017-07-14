<!doctype html>
<?
$def_arr = array(
	'label0'=>md5(rand(0,10)),
	'label1'=>md5(rand(0,10)),
	'label2'=>md5(rand(0,10)),
	'label3'=>md5(rand(0,10)),
	'label4'=>md5(rand(0,10)),
	'label5'=>sha1(rand(0,10)),
	'label6'=>sha1(rand(0,10)),
	'label7'=>sha1(rand(0,10)),
	'label8'=>sha1(rand(0,10)),
	'label9'=>sha1(rand(0,10)),
	);

function check_serialize($arr){
	$t = null;
	$tm = microtime(true);
	
	for($i=0,$m=1000;$i<$m;$i++){
		$t = serialize($arr);
	}
	return microtime(true)-$tm;
}
function check_unserialize($arr){
	$arr = serialize($arr);
	$t = null;
	$tm = microtime(true);
	
	for($i=0,$m=1000;$i<$m;$i++){
		$t = unserialize($arr);
	}
	return microtime(true)-$tm;
}
function check_json_encode($arr){
	$t = null;
	$tm = microtime(true);

	for($i=0,$m=1000;$i<$m;$i++){
		$t = json_encode($arr);
	}
	return microtime(true)-$tm;
}
function check_json_decode($arr){
	$arr = json_encode($arr);
	$t = null;
	$tm = microtime(true);
	
	for($i=0,$m=1000;$i<$m;$i++){
		$t = json_decode($arr,1);
	}
	return microtime(true)-$tm;
}
function check_var_export($arr){
	$t = null;
	$tm = microtime(true);

	for($i=0,$m=1000;$i<$m;$i++){
		$t = var_export($arr,1);
	}
	return microtime(true)-$tm;
}
function check_eval($arr){
	$arr = var_export($arr,1).';';
	$t = null;
	$tm = microtime(true);
	
	for($i=0,$m=1000;$i<$m;$i++){
		$t = eval($arr);
	}
	return microtime(true)-$tm;
}
function check_array_val($arr){
	$t = null;
	$tm = microtime(true);

	for($i=0,$m=1000;$i<$m;$i++){
		$t = $arr;
	}
	return microtime(true)-$tm;
}

?>
<?
$enc_secs = array();
$enc_secs[] = check_serialize($def_arr);
$enc_secs[] = check_json_encode($def_arr);
$enc_secs[] = check_var_export($def_arr);
$enc_secs[] = check_array_val($def_arr);

$enc_secs_i = 0;
$min_enc_secs=min($enc_secs);
$dec_secs = array();
$dec_secs[] = check_unserialize($def_arr);
$dec_secs[] = check_json_decode($def_arr);
$dec_secs[] = check_eval($def_arr);
$dec_secs[] = check_array_val($def_arr);

$dec_secs_i = 0;
$min_dec_secs=min($dec_secs);
?>
<html lang="ko">
<head>
	<title>Check Speed : String Serialize</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="공대여자" />
	<meta name="keywords" content="공대여자,웹,프로그래밍,DB,PHP,MySQL,ORACLE" />
	<meta name="classification" content="웹 프로그래밍" />
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<!-- meta og -->

	<meta property="og:title" content="공대여자 홈페이지">
	<!-- <meta property="og:description" content="공대여자 개인 홈페이지"> -->
	<meta name="og:image" content="http://www.mins01.com/img/logo.gif">
	<meta property="og:image:width" content="190">
	<meta property="og:image:height" content="70" />
	<meta property="og:site_name" content="Check Speed : String Serialize" />
	<meta property="og:type" content="website">

	<!-- 합쳐지고 최소화된 최신 CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">


	</head>
<body>
    <div class="container">
		<h1>Check Speed : String Serialize</h1>
		<table class="table table-condensed table-striped">
			<tr>
				<th>function</th>
				<th>sec (loop 1000)</th>
				<th class="text-right">%</th>
				<th> : </th>
				<th>function</th>
				<th>sec (loop 1000)</th>
				<th class="text-right">%</th>
			</tr>
			<tr>
				<th>serialize</th>
				<td><?=$enc_secs[$enc_secs_i]?></td>
				<td class="text-right"><?=sprintf('%.2f',($enc_secs[$enc_secs_i]/$min_enc_secs)*100) ?> %</td>
				<th> : </th>
				<th>unserialize</th>
				<td><?=$dec_secs[$enc_secs_i]?></td>
				<td class="text-right"><?=sprintf('%.2f',($dec_secs[$enc_secs_i]/$min_dec_secs)*100) ?> %</td>
			</tr>
			<? $enc_secs_i++;?>
			<tr>
				<th>json_encode</th>
				<td><?=$enc_secs[$enc_secs_i]?></td>
				<td class="text-right"><?=sprintf('%.2f',($enc_secs[$enc_secs_i]/$min_enc_secs)*100) ?> %</td>
				<th> : </th>
				<th>json_decode</th>
				<td><?=$dec_secs[$enc_secs_i]?></td>
				<td class="text-right"><?=sprintf('%.2f',($dec_secs[$enc_secs_i]/$min_dec_secs)*100) ?> %</td>
			</tr>
			<? $enc_secs_i++;?>
			<tr>
				<th>var_export</th>
				<td><?=$enc_secs[$enc_secs_i]?></td>
				<td class="text-right"><?=sprintf('%.2f',($enc_secs[$enc_secs_i]/$min_enc_secs)*100) ?> %</td>
				<th> : </th>
				<th>eval</th>
				<td><?=$dec_secs[$enc_secs_i]?></td>
				<td class="text-right"><?=sprintf('%.2f',($dec_secs[$enc_secs_i]/$min_dec_secs)*100) ?> %</td>
			</tr>
			<? $enc_secs_i++;?>
			<tr>
				<th>callbyvalue array</th>
				<td><?=$enc_secs[$enc_secs_i]?></td>
				<td class="text-right"><?=sprintf('%.2f',($enc_secs[$enc_secs_i]/$min_enc_secs)*100) ?> %</td>
				<th> : </th>
				<th>callbyvalue array</th>
				<td><?=$dec_secs[$enc_secs_i]?></td>
				<td class="text-right"><?=sprintf('%.2f',($dec_secs[$enc_secs_i]/$min_dec_secs)*100) ?> %</td>
			</tr>

		</table>

		<hr>
		<fieldset>
			<legend>$def_arr (기준 배열)</legend>
			<code><pre>$def_arr = <? var_export($def_arr); ?></pre></code>
		</fieldset>
		<fieldset>
			<legend>테스트해본 이유</legend>
			<p>다른 사람이 짠 소스에서 외부 호출시 JSON문자열을 보여주고, 내부 소스에서 사용시 JSON문자열 가져온 후 그걸 다시 JSON 디코드 하도록 처리된 소스를 봤다.<br>
			아무리 생각해봐도 무의미한 동작이었고, 그와 비슷한 동작하는 것을 만들었는데, 외부호출시 JSON 문자열 리턴, 내보호출시 배열로 값을 처리하도록 해서 줬다.(물론 이쪽이 더 효율적일 것이라고 생각해서)<br>
			그 효율이라는걸 테스트 해보기 위한 페이지이다.<br>
			</p>
			<p>결과는 내부 동작에서도 json_encode,json_decode를 사용했다면 단순 배열 리턴보다 약 100배+150배=250배 느리다.</p>
		</fieldset>
	</div>
</body>
</html>