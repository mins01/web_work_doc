<?
require_once('Selector.php');
require('Cache/Lite.php');

class ParseWemakeprice
{
	private $mproxy;
	public $isCached = 0;
	public $isNotCached = 0;
	function __construct($mproxy)
	{
		$this->mproxy = $mproxy;
	}

	function url2rows($url)
	{
		// $mp = new Mproxy();

		$options = array(
			// 'cacheDir' => dirname(__FILE__).'/data/',
			'cacheDir' => dirname(__FILE__).'/data.ignore/0_',
			'lifeTime' => 60*10,
			'pearErrorMode'=> 0,
			// 'masterFile'=> dirname(__FILE__).'/data.ignore/MASTER',
			'cacheFileMode'=>0777,
			'caching'=>true,
		);

		// $clf = new Cache_Lite_File($options);
		$clf = new Cache_Lite($options);
		$id = md5($url);

		if($body = $clf->get($id) ){
			$this->isCached++;
		}else{
			$mp = & $this->mproxy;
			$html = $mp->getContent($url);
			$body = $html['body'];
			$clf->save($body);
			$this->isNotCached++;
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
			$row['site'] = '위메프';
			$row['label'] = '('.$row['site'].') '.$r['text'];
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
