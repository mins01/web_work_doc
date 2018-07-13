<?
require_once('Selector.php');

/**
 * 11st 쇼킹딜용
 */
class ParseBase
{
	private $mproxy;
	private $cache_lite;
	public static $isCached = 0;
	public static $isNotCached = 0;
	public $site = '-';
	function __construct($mproxy,$cache_lite)
	{
		$this->mproxy = $mproxy;
		$this->cache_lite = $cache_lite;
	}

	function getUrl($url)
	{
		// $mp = new Mproxy();


		// $clf = new Cache_Lite_File($options);
		// $clf = new Cache_Lite($options);
		$clf = $this->cache_lite;
		$id = md5($url);

		if($body = $clf->get($id) ){
			ParseBase::$isCached++;
		}else{
			$mp = & $this->mproxy;
			$html = $mp->getContent($url);
			$body = $html['body'];
			$clf->save($body);
			ParseBase::$isNotCached++;
		}
		return $body;
	}
}
