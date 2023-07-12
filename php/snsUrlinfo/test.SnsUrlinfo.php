<?php
require_once('SnsUrlinfo.php');
use mins01\snsUrlinfo\SnsUrlinfo;

$url = 'https://blog.naver.com/bsakam/222998421358';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);


$url = 'https://blog.naver.com/PostView.naver?blogId=popline&logNo=222953172387';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);


$url = 'https://m.blog.naver.com/bsakam/222998421358';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);

$url = 'https://m.blog.naver.com/PostView.naver?blogId=bsakam&logNo=222998421358&proxyReferer=';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);