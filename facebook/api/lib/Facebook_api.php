<?
require(dirname(__FILE__).'/Mproxy.php');



class Facebook_api {
	public $mp = null;
	public $mp_opt= array(
		CURLOPT_SSL_VERIFYPEER=>0,
		CURLOPT_SSL_VERIFYHOST=>0,
	);
	function __construct(){
		$this->mp = new Mproxy();
	}
	function getAccessToken($id,$secret){
		$url = "https://graph.facebook.com/oauth/access_token?client_id={$id}&client_secret={$secret}&grant_type=client_credentials";
		
		echo $url;
		
		$res = $this->mp->get($url,null,array(),$this->mp_opt);
		if(!$res['errorno']){
			return json_decode($res['body'],1);
		}
		return null;
		

	}

	function api($method,$url_path,$data){
		if($method=='get'){
			$url = "https://graph.facebook.com/v2.10{$url_path}?{$data}";
			$res = $this->mp->get($url,null,array(),$this->mp_opt);
			if(!$res['errorno']){
				return json_decode($res['body'],1);
			}
			return null;
		}
	}
}

// https://developers.facebook.com/tools/explorer/365134967244791?method=GET&path=1363699303728495%2Fposts&version=v2.10

// https://graph.facebook.com/oauth/client_code?access_token=...&client_secret=...&redirect_uri=...&client_id=...
// curl -i -X GET \
//  "https://graph.facebook.com/v2.10/1363699303728495/posts?access_token=365134967244791%7CY4tKb8GYKt9MOTlNyShzy2VQnDk"