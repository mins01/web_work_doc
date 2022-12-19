<?php
require('CrawlerInstagram.php');

$cri = new CrawlerInstagram();
// $cri->debug = 1;
$cri->conn_timeout = 10;
$cri->exec_timeout = 10;
$username = 'gongdaeyeoja';
$data = $cri->webProfileInfoByUsername($username); /// 만드는 중
// print_r($mediaData);
// print_r(json_encode($mediaData,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));