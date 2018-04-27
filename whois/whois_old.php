<?
$who = isset($_REQUEST['who'][0])?$_REQUEST['who']:'';
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>whois</title>
<style type="text/javascript">
	fieldset{padding:5px; margin:5px;}
	fieldset div{padding:5px; margin:5px;}
	
</style>
</head>
<body>
<fieldset><legend>Who Is?</legend>
<div style="text-align:right; margin-bottom:20px; ">
  <script type="text/javascript">
  function input_ipsearch(ip){
	  document.isp.query.value=ip;
	  document.isp.sWord.value=ip;
	  document.isp2.searchtext.value=ip;
	  document.isp3.queryinput.value=ip;
	  document.isp4.searchtext.value=ip;
	  document.isp5.query.value=ip;
  }
  window.onload = function(){
	input_ipsearch("<?=$who?>");
  }
  </script>
  <a name="search" ></a>
	
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr align="right">
    <td width="50%"><form name="isp" target="ip_info" method="post" action="http://whois.nic.or.kr/kor/whois.jsp" style="margin:0px; ">
      <strong style="text-decoration:line-through">사용하지 못하게 막혔음 KRNIC</strong>(국내용) : 
      <input name="query" type="text" class="box" onkeyup="input_ipsearch(this.value)" disabled="disabled" />
      <input name="sWord" type="hidden" class="box" />
      
      <input type="submit" name="formbutton12" style="background-color:#336699; border-color:#ffffff; color:#FFFFFF; " value="Whois!" disabled="disabled">
    </form></td>
    <td width="50%">
	<form name="isp2" action="http://wq.apnic.net/apnic-bin/whois.pl" method="post" enctype="application/x-www-form-urlencoded" target="ip_info" style="margin:0px; ">
	  <input type="hidden" value="advanced" name="form_type"/>
	  <input type="hidden" name="full_query_string"/>
  <input type="hidden" value="None" name="inverse_attributes">
  <input  type="hidden"  name="object_type" value="All">
  <strong>APNIC</strong>(아시아)  :
      <input name="searchtext" type="text" class="box" id="searchtext"  onkeyup="input_ipsearch(this.value)" size="20" />
      <input name="do_search" type="submit" id="do_search" style="background-color:#336699; border-color:#ffffff; color:#FFFFFF; " value="Whois!">
    </form></td>
  </tr>
  <tr align="right">
    <td><form action="http://whois.arin.net/ui" method="get" name="isp3" target="ip_info" style="margin:0px; ">
      <strong>ARIN</strong>(북미) :
      <input type="text" size="20" name="queryinput" class="box" onkeyup="input_ipsearch(this.value)"  />
      <input type="submit" style="background-color:#336699; border-color:#ffffff; color:#FFFFFF; " value="Whois!">
    </form></td>
    <td><form  enctype="multipart/form-data" action="http://www.ripe.net/whois" method="get" name="isp4" target="ip_info" style="margin:0px; ">
      <strong>RIPE</strong>(유럽) : 
      <input name="searchtext" type="text" class="box" id="searchtext3" size="20" onkeyup="input_ipsearch(this.value)"  />
      <input type="submit" name="formbutton1" style="background-color:#336699; border-color:#ffffff; color:#FFFFFF; " value="Whois!">
    </form></td>
  </tr>
  <tr align="right">
    <td><form action="http://lacnic.net/cgi-bin/lacnic/whois?lg=EN" method="post" name="isp5" target="ip_info" style="margin:0px; ">
      <strong>lacnic</strong>(남미) :
      <input name="query" type="text" class="box" id="query" size="20" onkeyup="input_ipsearch(this.value)"  />
      <input type="submit" style="background-color:#336699; border-color:#ffffff; color:#FFFFFF; " value="Whois!">
    </form></td>
    <td>&nbsp;</td>
  </tr>
</table>

</div>
  </fieldset>
<fieldset>
	<legend>참고</legend>
	KISA WHOIS : <a href="http://whois.nic.or.kr/kor/" target="_blank">http://whois.nic.or.kr/kor/</a>
	<br /> 
	왜인지 모르겠지만, 암호문자열이 추가되어서 해당창을 호출해서 보여줄 수 없게 바뀌였음.<br />
다른 곳에서는 안 그러는데 왜 그런지 모르겠음.<br />
국내용 쓰지 말고 <strong>APNIC(아시아)</strong>쪽을 대신 사용하실 바람.
</fieldset>	
<fieldset>
	<legend>Who Am I?</legend>
	<div>
		<ul>
			<li>
			IP
				<ul>
					<li><?=$_SERVER['REMOTE_ADDR']?></li>
				</ul>
			</li>
			<li>USER AGENT
				<ul>
					<li>
						<?=$_SERVER['HTTP_USER_AGENT']?>
						</li>
				</ul>
			</li>
			<li>REQUEST TIME
				<ul>
					<li>
					<?=$_SERVER['REQUEST_TIME']?>sec </li>
					<li>
						SERVER : <?=date('Y-m-d H:i:s',$_SERVER['REQUEST_TIME'])?>
					</li>
					<li>
						GMT :
						<?=gmdate('D, d M Y H:i:s',$_SERVER['REQUEST_TIME']).' GMT'?>
					</li>
				</ul>
			</li>
			<li>apache_request_headers
				<ul>
					<li>
						<div style="white-space:pre"><? print_r(apache_request_headers()); ?></div>
					</li>
				</ul>
			</li>
			<li>apache_response_headers
				<ul>
					<li>
						<div style="white-space:pre"><? print_r(apache_response_headers()); ?></div>
					</li>
				</ul>
			</li>
		</ul>

<? 
/*
echo  '<xmp>';
print_r($_SERVER); 
print_r($_); 
echo  '</xmp>';
*/
?>
</div>
</fieldset>
</body>
</html>
