<?
require_once('Selector.php');

class ParseWemakeprice
{
	private $mproxy;
	public $isCached = false;
	function __construct($mproxy)
	{
		$this->mproxy = $mproxy;
	}

	function url2rows($url)
	{
		// $mp = new Mproxy();

		$options = array(
			// 'cacheDir' => dirname(__FILE__).'/data/',
			'cacheDir' => '/tmp/1_',
			'lifeTime' => 60*10,
			'pearErrorMode'=> 0,
			'masterFile'=> dirname(__FILE__).'/data.ignore/MASTER',
		);

		$clf = new Cache_Lite_File($options);
		$id = md5($url);

		if($body = $clf->get($id) ){
			$this->isCached = true;
		}else{
			$mp = & $this->mproxy;
			$html = $mp->getContent($url);
			$body = $html['body'];
			$clf->save($body);
			$this->isCached = false;
		}

		$dom = new SelectorDOM($body);
		$tit_descs = $dom->select('.tit_desc');
		$sales = $dom->select('.sale');
		$imgs = $dom->select('.box_thumb');
		$as = $dom->select('.link > a');
		$freeShips = $dom->select('.card_option');
		// print_r($freeShips);
		// exit;
		$rows = array();
		foreach ($tit_descs as $k => $r) {
			$r2 = $sales[$k];
			$r3 = $imgs[$k];
			$r4 = $as[$k];
			$r5 = $freeShips[$k];
			$row = array();
			$row['label'] = $r['text'];
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
