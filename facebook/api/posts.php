<?

require 'lib/Facebook_api.php';

$fa = new Facebook_api();
$id = '365134967244791';
$secret = '--';
$accessToken = $fa->getAccessToken($id,$secret);
// print_r($accessToken);
// exit;
$app_token = $accessToken['access_token'];
// $app_token = 'xxxx';

$data = array(
	'access_token'=>$app_token,
	'fields'=>'id,message,link,attachments',
	'limit'=>3,
);
// $res = $fa->api('get','/1363699303728495/posts',http_build_query($data));
$res = $fa->api('get','/domeggook.gng/posts',http_build_query($data));
print_r($res);
?><hr />
<?
require('facebook-php-sdk/src/facebook.php');

$facebook = new Facebook(array(
  'appId'  => '365134967244791',
  'secret' => '-',
));
// Get User ID
$user = $facebook->getUser();
// $facebook->setAccessToken($access_token);
$res = $facebook->api('/domeggook.gng/posts?limit=10');
print_r($res);