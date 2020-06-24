<?
$charset = isset($_REQUEST['charset'][0])?$_REQUEST['charset']:'utf-8';
header('Content-Type: text/html; charset='.$charset);

if($charset=='EUC-KR'){
	$hp_charset = '';

}else{
	$hp_charset  = $charset;
}
// ini_set( 'default_charset', $hp_charset);
ini_set( 'default_charset', 'utf-8');


$str = isset($_REQUEST['str'][0])?$_REQUEST['str']:'';
if (get_magic_quotes_gpc()) {
	$str = stripslashes($str);
}


// function html_escape($str){
// 	global $hp_charset;
// 	$r = htmlspecialchars($str);
// 	return $r;
// }

function html_escape($var, $double_encode = TRUE)
{
	global $charset;

	$hp_charset  = $charset;
	if($hp_charset=='EUC-KR'){
		$hp_charset = 'ISO-8859-1';
	}
	if (empty($var))
	{
		return $var;
	}

	if (is_array($var))
	{
		return array_map('html_escape', $var, array_fill(0, count($var), $double_encode));
	}

	return htmlspecialchars($var, ENT_QUOTES, $hp_charset, $double_encode);
}

?><!doctype html>
<html lang="ko" >
<head>
	<title>encode/decode</title>
	<meta charset="<?=$charset?>">
	<meta http-equiv="Content-Script-Type" content="text/javascript">
	<meta http-equiv="Content-Style-Type" content="text/css">
	<meta http-equiv="Content-Type" content="text/html; charset=<?=$charset?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- jquery  -->
	<script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>

	<!-- bootstrap 4 -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"  crossorigin="anonymous"></script>


	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<!-- meta og -->

	<meta property="og:title" content="encode/decode">
	<meta property="og:description" content="encode/decode">
	<meta name="og:image" content="http://www.mins01.com/img/logo.gif">
	<meta property="og:image:width" content="190">
	<meta property="og:image:height" content="70" />
	<meta property="og:site_name" content="encode/decode" />
	<meta property="og:type" content="website">

	<!-- //meta og -->

	<style>
	.result-str{
		border-radius: 0.5em; border-width: 0px 2px 0px 2px; border-style: solid;
		word-break: break-all;
	}
	.type-enc .result-str{border-color: #FFC107}
	.type-dec .result-str{border-color: #B5E61D}
	.type-hash .result-str{border-color: #7F7F7F}
	.type-info .result-str{border-color: #abc}
	</style>

	<script>
	//<!--
	var str = <?=json_encode($str)?>;
	//-->

	</script>

</head>
<body>
	<div class="container">
		<h1>ENCODE/DECODE</h1>

		<ul class="list-group">

			<li class="list-group-item">
				<form action="" method="get">
					<div class="input-group">
						<input type="text" name="str" value="<?=html_escape($str)?>" maxlength="1000" class="form-control" placeholder="String" aria-label="String">
						<div class="input-group-append">
							<select name="charset" class="custom-select">
								<option value="">charset</option>
								<option value="">#NONE#</option>
								<option value="UTF-8" <?=$charset=='UTF-8'?'selected':''?> >UTF-8</option>
								<option value="ISO-8859-1" <?=$charset=='ISO-8859-1'?'selected':''?> >ISO-8859-1</option>
								<option value="ISO-8859-5" <?=$charset=='ISO-8859-5'?'selected':''?> >ISO-8859-5</option>
								<option value="ISO-8859-15" <?=$charset=='ISO-8859-15'?'selected':''?> >ISO-8859-15</option>
								<option value="cp866" <?=$charset=='cp866'?'selected':''?> >cp866</option>
								<option value="cp1251" <?=$charset=='cp1251'?'selected':''?> >cp1251</option>
								<option value="cp1252" <?=$charset=='cp1252'?'selected':''?> >cp1252</option>
								<option value="KOI8-R" <?=$charset=='KOI8-R'?'selected':''?> >KOI8-R</option>
								<option value="BIG5" <?=$charset=='BIG5'?'selected':''?> >BIG5</option>
								<option value="GB2312" <?=$charset=='GB2312'?'selected':''?> >GB2312</option>
								<option value="BIG5-HKSCS" <?=$charset=='BIG5-HKSCS'?'selected':''?> >BIG5-HKSCS</option>
								<option value="Shift_JIS" <?=$charset=='Shift_JIS'?'selected':''?> >Shift_JIS</option>
								<option value="EUC-JP" <?=$charset=='EUC-JP'?'selected':''?> >EUC-JP</option>
								<option value="MacRoman" <?=$charset=='MacRoman'?'selected':''?> >MacRoman</option>
								<option value="EUC-KR" <?=$charset=='EUC-KR'?'selected':''?> >EUC-KR</option>
								<option value="EUC-KR" <?=$charset=='EUCKR'?'selected':''?> >EUCKR</option>
								<option value="" <?=$charset==''?'selected':''?> >default_charset</option>
							</select>
						</div>
						<div class="input-group-append">
							<button class="btn btn-outline-secondary" type="submit">Submit</button>
						</div>
					</div>
				</form>

			</li>
			<li class="list-group-item type-info">
				<div class="row">
					<div class="col-lg-3 text-info function-str">
						INPUT RAW :
					</div>
					<div class="col-lg-9  bg-light result-str ">
						<xmp><?=$str?></xmp>
					</div>
				</div>

			</li>
			<li class="list-group-item list-group-item-info">
				URL
			</li>
			<li class="list-group-item">
				<div class="row mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[php] urlencode
					</div>
					<div class="col-lg-9  bg-light result-str ">
						<?=html_escape(urlencode($str))?>
					</div>
				</div>
				<div class="row  mb-1 type-dec">
					<div class="col-lg-3 text-info function-str">
						[php] urldecode
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(urldecode($str))?>
					</div>
				</div>
				<div class="row  mb-1 type-enc">
					<div class="col-lg-3 text-info function-str">
						[php] rawurlencode
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(rawurlencode($str))?>
					</div>
				</div>
				<div class="row  mb-1  type-dec">
					<div class="col-lg-3 text-info function-str">
						[php] rawurldecode
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(rawurldecode($str))?>
					</div>
				</div>
				<div class="row  mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[JS] encodeURI
					</div>
					<div class="col-lg-9  bg-light result-str">
						<script> document.write(encodeURI(str))</script>
					</div>
				</div>
				<div class="row  mb-1  type-dec">
					<div class="col-lg-3 text-info function-str">
						[JS] decodeURI
					</div>
					<div class="col-lg-9  bg-light result-str">
						<script> document.write(decodeURI(str))</script>
					</div>
				</div>
				<div class="row  mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[JS] encodeURIComponent
					</div>
					<div class="col-lg-9  bg-light result-str">
						<script> document.write(encodeURIComponent(str))</script>
					</div>
				</div>
				<div class="row  mb-1  type-dec">
					<div class="col-lg-3 text-info function-str">
						[JS] decodeURIComponent
					</div>
					<div class="col-lg-9  bg-light result-str">
						<script> document.write(decodeURIComponent(str))</script>
					</div>
				</div>
			</li>
			<li class="list-group-item list-group-item-info">
				ESCAPE
			</li>
			<li class="list-group-item">
				<div class="row  mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[JS] escape
					</div>
					<div class="col-lg-9  bg-light result-str">
						<script> document.write(escape(str))</script>
					</div>
				</div>
				<div class="row  mb-1  type-dec">
					<div class="col-lg-3 text-info function-str">
						[JS] unescape
					</div>
					<div class="col-lg-9  bg-light result-str">
						<script> document.write(unescape(str))</script>
					</div>
				</div>
			</li>
			<li class="list-group-item list-group-item-info">
				JSON
			</li>
			<li class="list-group-item">
				<div class="row  mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[PHP] json_encode
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(json_encode($str))?>
					</div>
				</div>
				<div class="row  mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[PHP] json_decode
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=var_dump(json_decode($str))?>
					</div>
				</div>
				<div class="row  mb-1  type-dec">
					<div class="col-lg-3 text-info function-str">
						[JS] JSON.stringify
					</div>
					<div class="col-lg-9  bg-light result-str">
						<script> document.write(JSON.stringify(str))</script>
					</div>
				</div>
				<div class="row  mb-1  type-dec">
					<div class="col-lg-3 text-info function-str">
						[JS] JSON.parse
					</div>
					<div class="col-lg-9  bg-light result-str">
						<script> document.write(JSON.parse(str))</script>
					</div>
				</div>
			</li>
			<li class="list-group-item list-group-item-info">
				HTML
			</li>
			<li class="list-group-item">
				<div class="row  mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[PHP] html_escape
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(html_escape($str))?>
					</div>
				</div>
				<div class="row  mb-1  type-dec">
					<div class="col-lg-3 text-info function-str">
						[PHP] html_entity_decode
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(html_entity_decode($str))?>
					</div>
				</div>
				<div class="row  mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[PHP] htmlentities
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(htmlentities($str))?>
					</div>
				</div>

			</li>
			<li class="list-group-item list-group-item-info">
				BASE64
			</li>
			<li class="list-group-item">
				<div class="row  mb-1  type-enc">
					<div class="col-lg-3 text-info function-str">
						[PHP] base64_encode
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(base64_encode($str))?>
					</div>
				</div>
				<div class="row  mb-1  type-dec">
					<div class="col-lg-3 text-info function-str">
						[PHP] base64_decode
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(base64_decode($str))?>
					</div>
				</div>
			</li>
			<li class="list-group-item list-group-item-info">
				HASH
			</li>
			<li class="list-group-item">
				<div class="row  mb-1  type-hash">
					<div class="col-lg-3 text-info function-str">
						[PHP] md5
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(md5($str))?>
					</div>
				</div>
				<div class="row  mb-1 type-hash">
					<div class="col-lg-3 text-info function-str">
						[PHP] sha1
					</div>
					<div class="col-lg-9  bg-light result-str">
						<?=html_escape(sha1($str))?>
					</div>
				</div>
				<? foreach (hash_algos() as $v):
					$r = hash($v, $str, false);
					// printf("%-12s %3d %s\n", $v, strlen($r), $r);

					?>
					<div class="row  mb-1 type-hash">
						<div class="col-lg-3 text-info function-str">
							[PHP] hash(<?=$v?>,~~)
						</div>
						<div class="col-lg-9  bg-light result-str">
							<?=html_escape($r)?>
						</div>
					</div>
				<? endforeach;?>
			</li>
		</ul>
	</div>
	<div class="text-danger text-center">
		* PHP버전이 높아지면서, htmlspecialchars 를 사용할 경우 EUC-KR은 지원안된다!
	</div>
</body>
</html>
