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

$url = 'https://blog.naver.com/msjung0630';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);




$url = 'http://instagram.com/hellogra__';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);

$url = 'https://www.instagram.com/p/Cuhf5Jbpbu4/?img_index=1';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);


$url = 'https://www.facebook.com/permalink.php?story_fbid=pfbid02EGimNAVpsxSKGjJt8H57fszy1jnJJWWufZ2V62xeXKsgDCHphAL84wyYNC9eb7GRl&id=100004105173588';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);

$url = 'https://www.facebook.com/geukseop/posts/pfbid02hKrdHgZmvkBs776rMoGhJ4mXAAxjNfgRNRKpAKhChkBimBc4gzqcqKVNAX58Xsgwl';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);


$url = 'https://m.facebook.com/story.php/?story_fbid=pfbid0xUJ7Jpum8iCBp31fZcZA4kP5rNcQzmoy7VBtVBmmXuXHVDT1yprWCV2VMTBjVpv8l&id=100031126815048';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);

// https://www.facebook.com/geukseop/posts/pfbid02hKrdHgZmvkBs776rMoGhJ4mXAAxjNfgRNRKpAKhChkBimBc4gzqcqKVNAX58Xsgwl 의 모바일 페이지
$url = 'https://m.facebook.com/story.php?story_fbid=pfbid02h2fN2HnnJdbAxroMnBMDQrXS45qvD4a82ckQY2tzs3bcVQpSTtZrdtAij1V6aWTjl&id=100031126815048';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);



$url = 'https://twitter.com/@jinjinjara0807';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);
$url = 'https://twitter.com/0Me3cQXsLSYrRxS/status/1637068317109395456?t=6O3ZdefCGY91GYLaqXuCew&s=19';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);
$url = 'https://twitter.com/bata_bts2/status/1640690406810882050?s=46&t=mxBLHeEv-UsxrsxNz8fYUg';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);
$url = 'https://twitter.com/bissnara/status/1592514650914304001';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);

$url = 'https://story.kakao.com/pumpkin1027';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);


$url = 'https://story.kakao.com/lhs7818/AWnugHnQQ90';
$rs = SnsUrlinfo::urlinfo($url);
print_r($url);echo "\n";
print_r($rs);



