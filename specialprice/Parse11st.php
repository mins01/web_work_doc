<?
require_once('Selector.php');
require_once('ParseBase.php');

/**
 * 11st 쇼킹딜 베스트용,백화점&몰용
 */
class Parse11st extends ParseBase
{
	// private $mproxy;
	// public $isCached = 0;
	// public $isNotCached = 0;
	public $site = '11번가';
	function __construct($mproxy,$cache_lite)
	{
		parent::__construct($mproxy,$cache_lite);
	}

	function url2rows($url,$prefix='')
	{
		$body = $this->getUrl($url);
		$t = explode('templateData = ',$body);
		$t = explode('}]}};',$t[1]);
		$t = trim($t[0]).'}]}}';
		$json = iconv('cp949','utf-8',$t);
		// print_r($json);

		$t_rowss = json_decode($json,true);
		$t = current($t_rowss);
		$t_rows = $t['items'];
		// var_dump($t_rows);exit;

		$rows = array();
		foreach ($t_rows as $k => $r) {
			$logBody = $r['logBody'];
			$row = array();
			$row['site'] = $this->site;
			$row['label'] = '('.$row['site'].') '.$prefix.$logBody['content_name'];
			$row['price'] = $logBody['last_discount_price'];
			$row['price_number'] = preg_replace('/[^0-9]/','',$row['price']);
			// print_r($r3);
			// exit;
			$row['img'] = $r['prdImgUrl'];
			$row['link'] = $r['url1'];
			$row['freeShipping'] = (strpos($r['freeDlv'],'무료배송')!==false)?1:0;
			$rows[] = $row;
		}
		return $rows;
		// exit;


		// $dom = new SelectorDOM($body);
		// $tit_descs = $dom->select('.prd_info .fs_16');
		// print_r($tit_descs);
		// exit;
		// $sales = $dom->select('.sale_price');
		// $imgs = $dom->select('.prd_img > img');
		// $as = $dom->select('.box_pd > a');
		// $freeShips = $dom->select('.info_flag');
		// // print_r($freeShips);
		// // exit;
		// $rows = array();
		// foreach ($tit_descs as $k => $r) {
		// 	if($r['text'][0]=='{'){
		// 		continue;
		// 	}
		// 	$r2 = $sales[$k];
		// 	$r3 = $imgs[$k];
		// 	$r4 = $as[$k];
		// 	$r5 = $freeShips[$k];

		// 	$row = array();
		// 	$row['site'] = $this->site;
		// 	$row['label'] = '('.$row['site'].') '.$prefix.$r['text'];
		// 	$row['price'] = $r2['text'];
		// 	$row['price_number'] = preg_replace('/[^0-9]/','',$row['price']);
		// 	// print_r($r3);
		// 	// exit;
		// 	$row['img'] = $r3['attributes']['src'];
		// 	$row['link'] = $r4['attributes']['href'];
		// 	$row['freeShipping'] = (strpos($r5['text'],'무료배송')!==false)?1:0;
		// 	$rows[] = $row;
		// }
		// return $rows;
	}


}
