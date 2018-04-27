<!doctype html>
<html lang="ko" >
<head>
	<title>whois</title>
	<meta charset="<?=$charset?>">
	<meta http-equiv="Content-Script-Type" content="text/javascript">
	<meta http-equiv="Content-Style-Type" content="text/css">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
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
	
	<meta property="og:title" content="whois">
	<meta property="og:description" content="whois">
	<meta name="og:image" content="http://www.mins01.com/img/logo.gif">
	<meta property="og:image:width" content="190">
	<meta property="og:image:height" content="70" />
	<meta property="og:site_name" content="whois" />
	<meta property="og:type" content="website">
	
	<!-- //meta og -->
	
	<style>
	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	    color: red;
	    opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 */
	    color: red;
	}

	::-ms-input-placeholder { /* Microsoft Edge */
	    color: red;
	}

	.result-str{
		border-radius: 0.5em; border-width: 0px 2px 0px 2px; border-style: solid; border-color: gray;
		word-break: break-all;
	}
	</style>
	
	<script>
	//<!--
	$(function(){
		$(".sync-input-1").on("change",function(){
			$(".sync-input-1").val(this.value);
		})
	})
	//-->
	</script>
	
</head>
<body>
	<div class="container">
		<h1>Whois</h1>
		
		<ul class="list-group">
			<li class="list-group-item list-group-item-info">
				IP info
			</li>			
			<li class="list-group-item">
				<form action="http://wq.apnic.net/apnic-bin/whois.pl" method="post" enctype="application/x-www-form-urlencoded" target="win_ip_info_1">
					<input type="hidden" value="advanced" name="form_type"/>
					<input type="hidden" name="full_query_string"/>
					<input type="hidden" value="None" name="inverse_attributes">
					<input  type="hidden"  name="object_type" value="All">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">IP</span>
						</div>
						<input type="text" class="form-control sync-input-1" name="searchtext" placeholder="127.0.0.1" title="IPv4 111.222.123.231" pattern="^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}" required>
						<div class="input-group-append">
					    <button class="btn btn-outline-info" style="width:12em;" type="submit">Whois? APNIC(아시아)</button>
					  </div>
					</div>
				</form>
			</li>
			<li class="list-group-item">
				<form action="http://whois.arin.net/ui" method="get" target="win_ip_info_2">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">IP</span>
						</div>
						<input type="text" class="form-control  sync-input-1" name="queryinput" placeholder="127.0.0.1" title="IPv4 111.222.123.231" pattern="^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}" required>
						<div class="input-group-append">
							<button class="btn btn-outline-info" style="width:12em;"  type="submit">Whois? ARIN(북미)</button>
						</div>
					</div>
				</form>
			</li>
			<li class="list-group-item">
				<form enctype="multipart/form-data" action="http://www.ripe.net/whois" method="get" target="win_ip_info_3">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">IP</span>
						</div>
						<input type="text" class="form-control  sync-input-1" name="searchtext" placeholder="127.0.0.1" title="IPv4 111.222.123.231" pattern="^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}" required>
						<div class="input-group-append">
							<button class="btn btn-outline-info" style="width:12em;"  type="submit">Whois? RIPE(유럽)</button>
						</div>
					</div>
				</form>
			</li>
			<li class="list-group-item">
				<form action="http://lacnic.net/cgi-bin/lacnic/whois?lg=EN" method="post" target="win_ip_info_4">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">IP</span>
						</div>
						<input type="text" class="form-control  sync-input-1" name="query" placeholder="127.0.0.1" title="IPv4 111.222.123.231" pattern="^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}" required>
						<div class="input-group-append">
							<button class="btn btn-outline-info" style="width:12em;"  type="submit">Whois? lacnic(남미)</button>
						</div>
					</div>
				</form>
			</li>			
			
			<li class="list-group-item list-group-item-info">
				DOMAIN
			</li>
			<li class="list-group-item">
				<a class="btn btn-link"  target="win_dn_1" href='https://후이즈검색.한국'>https://후이즈검색.한국</a>
				<a class="btn btn-link"  target="win_dn_2" href='https://www.whois.com/whois/'>https://www.whois.com/whois/</a>
				
			</li>
			<li class="list-group-item list-group-item-info">
				Who are U?
			</li>
			<li class="list-group-item">
				<dl class="row">
					<dt class="col-md-4 ">YOUR IP</dt>	
					<dd class="result-str col-md-8"><?=$_SERVER['REMOTE_ADDR']?></dd>
				</dl>
				<dl class="row">
					<dt class="col-md-4 ">USER AGENT</dt>	
					<dd class="result-str col-md-8"><?=htmlspecialchars($_SERVER['HTTP_USER_AGENT'])?></dd>
				</dl>
				<dl class="row">
					<dt class="col-md-4 ">REQUEST_TIME</dt>	
					<dd class="result-str col-md-8">
						<dl class="row">
							<dt class="col-md-4 ">SEC</dt>	
							<dd class="result-str col-md-8"><?=htmlspecialchars($_SERVER['REQUEST_TIME'])?> sec</dd>
						</dl>
						<dl class="row">
							<dt class="col-md-4 ">DATETIME</dt>	
							<dd class="result-str col-md-8"><?=htmlspecialchars(date('Y-m-d H:i:s',$_SERVER['REQUEST_TIME']))?></dd>
						</dl>
						<dl class="row">
							<dt class="col-md-4 ">GMT</dt>	
							<dd class="result-str col-md-8"><?=htmlspecialchars(gmdate('D, d M Y H:i:s',$_SERVER['REQUEST_TIME']).' GMT')?></dd>
						</dl>
					</dd>
				</dl>
				
				<ul class="list-group">
					<li class="list-group-item list-group-item-success">
						apache_request_headers
					</li>
					<li class="list-group-item">
						<? foreach(apache_request_headers() as $k=>$v): ?>
							<dl class="row">
								<dt class="col-md-4 "><?=htmlspecialchars($k)?></dt>	
								<dd class="result-str col-md-8"><?=htmlspecialchars($v)?></dd>
							</dl>
						<? endforeach; ?>
					</li>
				</li>
				<ul class="list-group">
					<li class="list-group-item list-group-item-success">
						apache_response_headers
					</li>
					<li class="list-group-item">
						<? foreach(apache_response_headers() as $k=>$v): ?>
							<dl class="row">
								<dt class="col-md-4 "><?=htmlspecialchars($k)?></dt>	
								<dd class="result-str col-md-8"><?=htmlspecialchars($v)?></dd>
							</dl>
						<? endforeach; ?>
					</li>
				</li>				
			</li>
		</ul>
	</div>

</body>
</html>