<?
require_once('Selector.php');
require_once('ParseBase.php');

/**
 * 위메이크프라이스용
 */
class ParseWemakeprice extends ParseBase
{
	// private $mproxy;
	// public $isCached = 0;
	// public $isNotCached = 0;
	// public $cache_lite = null;
	public $site = '위메프';
	function __construct($mproxy,$cache_lite)
	{
		parent::__construct($mproxy,$cache_lite);
	}

	function url2rows($url,$prefix='')
	{
		$body = $this->getUrl($url);
		$dom = new SelectorDOM($body);
		$tit_descs = $dom->select('strong.tit_desc');
		$sales = $dom->select('.sale');
		$imgs = $dom->select('.box_thumb');
		$as = $dom->select('.link > a');
		$freeShips = $dom->select('.card_option');
		// print_r($freeShips);
		// exit;
		// print_r($sales);
		// exit;
		$rows = array();
		// echo count($tit_descs),'/',count($sales);
		
		foreach ($tit_descs as $k => $r) {
			$r2 = $sales[$k];
			$r3 = $imgs[$k];
			$r4 = $as[$k];
			$r5 = $freeShips[$k];
			$row = array();
			$row['site'] = '위메프';
			$row['label'] = '('.$row['site'].') '.$prefix.$r['text'];
			$row['price'] = $r2['text'];
			$row['price_number'] = preg_replace('/[^0-9]/','',$row['price']);
			$row['img'] = $r3['children'][0]['attributes']['original'];
			$row['link'] = $r4['attributes']['href'];
			$row['freeShipping'] = (strpos($r5['text'],'무료배송')!==false)?1:0;
			$rows[] = $row;
		}
		return $rows;
	}


}
