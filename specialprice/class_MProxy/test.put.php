<?
$url = "http://".$_SERVER["HTTP_HOST"].dirname($_SERVER['REQUEST_URI']).'/target.php';
require('class.MProxy.php');

$mproxy = new Mproxy();

$url = 'http://'.$_SERVER['HTTP_HOST'].str_replace('test.put.php','test.target.php',$_SERVER['REQUEST_URI']);
$postRaw=null;
$postRaw='하하';
$cookieRaw=null;
$headers=array();
$opts = array();

// $opts[CURLOPT_PUT]=true;

echo $url;

$res = $mproxy->getContent($url,$postRaw,$cookieRaw,$headers, $opts);
print_r($res);
echo "\n ------------------=------------------------- ";
$res = $mproxy->get($url,$cookieRaw,$headers, $opts);
print_r($res);
echo "\n ------------------=------------------------- ";
$res = $mproxy->post($url,$postRaw,$cookieRaw,$headers, $opts);
print_r($res);
echo "\n ------------------=------------------------- ";
$res = $mproxy->put($url,$postRaw,$cookieRaw,$headers, $opts);
print_r($res);
echo "\n ------------------=------------------------- ";


?>
