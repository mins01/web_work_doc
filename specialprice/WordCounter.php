<?
/**
 * 단어 통계용
 */
class WordCounter
{
	public $rs = array();
	function __construct(){
		
	}
	function reset(){
		$this->rs = array();
	}
	function add($str){
		$str = preg_replace('/\([^)]+\)/','',$str);		
		$str = preg_replace('/\[[^)]+\]/','',$str);		
		$str = preg_replace('/\~/',' ~',$str);
		$str = preg_replace('/\s{2,}/',' ',$str);		
		$str = trim($str);
		$arr = preg_split('/[\s,;]/',$str);
		// var_dump($arr);
		$this->addArr($arr);
	}
	function addArr($arr){
		foreach($arr as $v){
			if(!isset($this->rs[$v])){
				$this->rs[$v] = 0;
			}
			$this->rs[$v]++;
		}
	}
	function getResult($limit){
		$rs = $this->rs;
		arsort($rs,SORT_NUMERIC);
		return array_slice($rs,0,$limit);
	}
}