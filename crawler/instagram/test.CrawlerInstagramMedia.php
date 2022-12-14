<?php
require('CrawlerInstagram.php');

$cri = new CrawlerInstagram();
// $cri->debug = 1;
$cri->conn_timeout = 10;
$cri->exec_timeout = 10;
$shortcode = 'CgZKgZOLsOk';
$mediaData = $cri->mediaByShortcode($shortcode);
// print_r($mediaData);
print_r(json_encode($mediaData,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));