<?
if(strtolower(ini_get('zlib output compression'))=='off'){
	ob_start("ob_gzhandler"); //압축전송
}


require('Mproxy.php');
require('Selector.php');
require('ParseWemakeprice.php');



$t = 60*60*1;
header("Expires: ".gmdate("D, d M Y H:i:s", time()+$t)." GMT");
header('Cache-Control:public, max-age = '.$t);



$mp = new Mproxy();
$pw = new ParseWemakeprice($mp);
$rowss = array();
// $rowss['슈퍼투데이특가'] =$pw->url2rows('http://promotion.wemakeprice.com/promotion/g/supertoday'); //슈퍼투데이 특가
// $rowss['투데이특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/todaysale'); // 투데이 특가
// $rowss['요일특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/montosun'); // 요일특가
// $rowss['플레이특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/playday'); // 플레이특가
// $rowss['게릴라특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/guerrilla'); // 게릴라특가
// $rowss['명예의전당'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/hall_of_fame'); // 명예의전당
// $rowss['위클리브랜드'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/todaybrand'); // 위클리븐랜드
// $rowss['모닝심야특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/timesale'); // 모닝특가
$rows = array();
$t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/supertoday'); //슈퍼투데이 특가
$rows = array_merge($rows,$t_rows);
$t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/todaysale'); // 투데이 특가
$rows = array_merge($rows,$t_rows);
$t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/montosun'); // 요일특가
$rows = array_merge($rows,$t_rows);
$t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/playday'); // 플레이특가
$rows = array_merge($rows,$t_rows);
$t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/guerrilla'); // 게릴라특가
$rows = array_merge($rows,$t_rows);
$t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/hall_of_fame'); // 명예의전당
$rows = array_merge($rows,$t_rows);
$t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/todaybrand'); // 위클리븐랜드
$rows = array_merge($rows,$t_rows);
$t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/timesale'); // 모닝특가
$rows = array_merge($rows,$t_rows);

function cmp_function($a,$b){
	return (int)$a['price_number']>(int)$b['price_number'];
}
usort ( $rows , 'cmp_function' ); //낮은 가격순 소팅
?>
<!doctype html>
<html lang="ko" >
<head>
	<title>특가모음 </title>
	<meta charset="utf-8">
	<meta http-equiv="Content-Script-Type" content="text/javascript">
	<meta http-equiv="Content-Style-Type" content="text/css">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- jquery 관련 -->
	<script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>

	<!-- 부트스트랩 4 : IE8지원안됨! -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"  crossorigin="anonymous"></script>
	<!-- vue.js -->
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<!-- meta og -->

	<meta property="og:title" content="특가모음">
	<meta property="og:description" content="특가무음">
	<meta name="og:image" content="http://www.mins01.com/img/logo.gif">
	<meta property="og:image:width" content="190">
	<meta property="og:image:height" content="70" />
	<meta property="og:site_name" content="특가무음" />
	<meta property="og:type" content="website">

	<!-- //meta og -->
	<style>
	.d-none {
	    display: none!important;
	}
	</style>

	<script>
	var defClass = 'a.r-link';
	function filter(f){
		var w = f.w.value.toLowerCase().replace(/"/g,'\\"');

		var defClass2 = '';

		// console.log(defClass);
		$(defClass).each(function(idx,el){
			$(el).removeClass('d-none');
		})
		if(w.length>0){
			$(defClass+':not([data-label*="'+w+'"])').each(function(idx,el){
				$(el).addClass('d-none');
			})
		}
		if(f.freeShipping.checked){
			defClass2 ='[data-freeShipping="1"]'
			$(defClass+':not('+defClass2+')').each(function(idx,el){
				$(el).addClass('d-none');
			})
		}
		sync_num();
	}
	function sync_num(){
		$("#r-num").text($(defClass+":not(.d-none)").length);
	}
	$(function(){
		sync_num();
	})
	</script>
</head>
<body>
	<div class="container">
		<h1>특가모음 </h1>
		<h3>위메프 (<span id="r-num">##</span>)</h3>
		<form action="#" onsubmit="filter(this);return false;" onkeyup="this.onsubmit()"  onchange="this.onsubmit()">
			<ul class="list-group mb-1">
				<li class="list-group-item">
					<div class="input-group mb-1">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<label class="m-0 p-0"><input type="checkbox" name="freeShipping" aria-label="Checkbox for following text input">무료배송</label>
							</div>
						</div>
						<input type="text" name="w" class="form-control" placeholder="필터링" aria-label="필터링" aria-describedby="basic-addon2">
						<div class="input-group-append">
							<button class="btn btn-outline-secondary" type="submit">필터링</button>
						</div>
					</div>
				</li>
			</ul>
		</form>



		<div class="list-group">
			<? foreach($rows as $k2 => $r): ?>
			<a class="list-group-item r-link d-flex justify-content-between align-items-center"
				target="_blank" href="<?=htmlspecialchars($r['link'])?>"
				data-freeShipping="<?=$r['freeShipping']?>" data-label="<?=htmlspecialchars(strtolower($r['label']))?>"
					data-price_number="<?=htmlspecialchars($r['price_number'])?>">
				<?=htmlspecialchars($r['label'])?>
				<span class="badge <?=htmlspecialchars($r['freeShipping'])?' badge-info':' badge-danger'?> m-0 "><?=htmlspecialchars($r['price'])?> <?=htmlspecialchars($r['freeShipping'])?' / [무배]':''?> </span>

			</a >
			<? endforeach; ?>
		</div>
	</div>
	<ul>
		<li>
			Lib License
		</li>
		<li>
		Selector : MIT https://github.com/tj/php-selector 
		</li>
	</ul>
	<div class="text-right">
		cached : <?=$pw->isCached?>,not cached : <?=$pw->isNotCached?>
	</div>

</body>
</html>
<?
if(strtolower(ini_get('zlib output compression'))=='off'){
	ob_end_flush();
}
?>