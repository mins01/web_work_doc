<?
require('Mproxy.php');
require('Selector.php');
require('Cache/Lite.php');
require('ParseWemakeprice.php');
require('Parse11st.php');

$mp = new Mproxy();
$options = array(
	// 'cacheDir' => dirname(__FILE__).'/data/',
	'cacheDir' => dirname(__FILE__).'/data.ignore/0_',
	'lifeTime' => 60*10,
	'pearErrorMode'=> 0,
	// 'masterFile'=> dirname(__FILE__).'/data.ignore/MASTER',
	'cacheFileMode'=>0777,
	'caching'=>true,
);
$cl = new Cache_Lite($options);
$pw = new ParseWemakeprice($mp,$cl);
$pa = new Parse11st($mp,$cl);
$rowss = array();
// $rowss['슈퍼투데이특가'] =$pw->url2rows('http://promotion.wemakeprice.com/promotion/g/supertoday'); //슈퍼투데이 특가
// $rowss['투데이특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/todaysale'); // 투데이 특가
// $rowss['요일특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/montosun'); // 요일특가
// $rowss['플레이특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/playday'); // 플레이특가
// $rowss['게릴라특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/guerrilla'); // 게릴라특가
// $rowss['명예의전당'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/hall_of_fame'); // 명예의전당
// $rowss['위클리브랜드'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/todaybrand'); // 위클리븐랜드
// $rowss['모닝심야특가'] = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/timesale'); // 모닝특가

// $t_rows = $pw->url2rows('http://promotion.wemakeprice.com/promotion/g/supertoday',''); //슈퍼투데이 특가
// print_r($t_rows);

// $rows = array();
// $t_rows = $pa->url2rows('http://deal.11st.co.kr/browsing/DealAction.tmall?method=getThemeCtgr&dispCtgrNo=129400','[디지털특가] '); //옥션특가, 디지털
// $t_rows = $pa->url2rows('http://deal.11st.co.kr/browsing/DealAction.tmall?method=getDealBest','[베스트특가] '); //11번가 쇼킹딜, 디지털
$t_rows = $pa->url2rows('http://deal.11st.co.kr/browsing/DealAction.tmall?method=getDepartmentDeal','[백화점&몰] '); //11번가 쇼킹딜, 베스트


print_r($t_rows);
