<?
$str = isset($_REQUEST['str'][0])?$_REQUEST['str']:'';
$charset = isset($_REQUEST['charset'][0])?$_REQUEST['charset']:'';
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?=$charset?>" />
<title>encode/decode</title>
<script type="text/javascript">
//<![CDATA[
	var str = "<?=str_replace('"','\\"',$str)?>";
//]]>
</script>
<style type="text/css">
	.title{background-color:#CCCCCC; padding-left:1em}
	.table{border-collapse:collapse; border:1px solid gray;}
	.table td{border:1px solid gray;}
</style>
</head>
<body>
<h1>encode/decode</h1>
<ul>
	<li>String
		<ul>
			<li>Input String
				<ul>
					<li><?=$str?></li>
				</ul>
			</li>
			<li>input Query String
				<ul>
					<li><?=htmlspecialchars($_SERVER['QUERY_STRING'])?></li>
				</ul>
			</li>
			<li>
				<form action="?" style="margin:0; padding:0;">
					charset : <input name="charset" type="text" value="<?=$charset?>" size="8" maxlength="8" />
					<select onchange="this.form.charset.value=this.value">
						<option value="">##charset##</option>
						<option value="">#NONE#</option>
						<option value="utf-8">utf-8</option>
						<option value="euc-kr">euc-kr</option>
						<option value="cp949">cp949</option>
						<option value="gb2312">gb2312</option>
					</select>
					<br />
					string : <input type="text" size="40" maxlength="2000" name="str" value="<?=htmlspecialchars($str)?>" />
					<input type="submit" value="submit" />
				</form>
			</li>
		</ul>
	</li>
</ul>
<table width="100%" border="1" cellpadding="3" cellspacing="0" class="table">
	<tr>
		<td width="10%">&nbsp;</td>
		<td width="40%" height="20" align="center"><strong>ENCODE</strong></td>
		<td width="40%" align="center"><strong>DECODE</strong></td>
	</tr>
	<tr>
		<td rowspan="8" class="title">URL</td>
		<td height="20" class="title">urlencode</td>
		<td class="title">urldecode</td>
	</tr>
	<tr>
		<td height="20"><?=htmlspecialchars(urlencode($str))?></td>
		<td><?=htmlspecialchars(urldecode($str))?></td>
	</tr>
	<tr>
		<td height="20" class="title">rawurlencode</td>
		<td class="title">rawurldecode</td>
	</tr>
	<tr>
		<td height="20"><?=htmlspecialchars(rawurlencode($str))?></td>
		<td><?=htmlspecialchars(rawurldecode($str))?></td>
	</tr>
	<tr>
		<td height="20" class="title">encodeURI (JS)</td>
		<td class="title">decodeURI (JS)</td>
	</tr>
	<tr>
		<td height="20"><script type="text/javascript">
					document.write(encodeURI(str))
					</script></td>
		<td><script type="text/javascript">
					document.write(decodeURI(str))
					</script></td>
	</tr>
	<tr>
		<td height="20" class="title">encodeURIComponent (JS) </td>
		<td class="title">decodeURIComponent (JS) </td>
	</tr>
	<tr>
		<td height="20"><script type="text/javascript">
					document.write(encodeURIComponent(str))
					</script></td>
		<td><script type="text/javascript">
					document.write(decodeURIComponent(str))
					</script></td>
	</tr>
	<tr>
		<td rowspan="2" class="title">ESCAPE</td>
		<td height="20" class="title">escape (JS) </td>
		<td class="title">unescape (JS)</td>
	</tr>
	<tr>
		<td height="20"><script type="text/javascript">
					document.write(escape(str))
					</script></td>
		<td><script type="text/javascript">
					document.write(unescape(str))
					</script></td>
	</tr>
	<tr>
		<td rowspan="4" class="title">HTML</td>
		<td height="20" class="title">htmlspecialchars</td>
		<td class="title">html_entity_decode</td>
	</tr>
	<tr>
		<td height="20"><?=htmlspecialchars(htmlspecialchars($str))?></td>
		<td rowspan="3"><?=htmlspecialchars(@html_entity_decode($str))?></td>
	</tr>
	<tr>
		<td height="20" class="title">htmlentities</td>
	</tr>
	<tr>
		<td height="20"><?=htmlspecialchars(htmlentities($str))?></td>
	</tr>
	<tr>
		<td rowspan="2" class="title">BASE64</td>
		<td height="20" class="title">base64_encode</td>
		<td class="title">base64_decode</td>
	</tr>
	<tr>
		<td height="20"><?=base64_encode($str)?></td>
		<td><?=base64_decode($str)?></td>
	</tr>
	<tr>
		<td rowspan="4" class="title">HASH</td>
		<td height="20" class="title">md5</td>
		<td rowspan="4">NONE</td>
	</tr>
	<tr>
		<td height="20"><?=md5($str)?></td>
	</tr>
	<tr>
		<td height="20" class="title">sha1</td>
	</tr>
	<tr>
		<td height="20"><?=sha1($str)?></td>
	</tr>
</table>
<p>&nbsp;</p>
</body>
</html>
