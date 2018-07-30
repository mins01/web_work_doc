<?
header('Content-Type: application/json');
if(isset($_GET['cors']) && $_GET['cors']=='1'){
	header('Access-Control-Allow-Origin: *');	
}




echo '{"msg":"SUCCESS"}';