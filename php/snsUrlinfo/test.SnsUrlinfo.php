<?php
require_once('SnsUrlinfo.php');
use mins01\snsUrlinfo\SnsUrlinfo;




$urls = array(
    'https://blog.naver.com/bsakam/222998421358',
    'https://blog.naver.com/PostView.naver?blogId=popline&logNo=222953172387',
    'https://m.blog.naver.com/bsakam/222998421358',
    'https://m.blog.naver.com/PostView.naver?blogId=bsakam&logNo=222998421358&proxyReferer=',
    'https://blog.naver.com/msjung0630',
    'http://instagram.com/hellogra__',
    'https://www.instagram.com/p/Cuhf5Jbpbu4/?img_index=1',
    'https://www.facebook.com/permalink.php?story_fbid=pfbid02EGimNAVpsxSKGjJt8H57fszy1jnJJWWufZ2V62xeXKsgDCHphAL84wyYNC9eb7GRl&id=100004105173588',
    'https://www.facebook.com/geukseop/posts/pfbid02hKrdHgZmvkBs776rMoGhJ4mXAAxjNfgRNRKpAKhChkBimBc4gzqcqKVNAX58Xsgwl',
    'https://m.facebook.com/story.php/?story_fbid=pfbid0xUJ7Jpum8iCBp31fZcZA4kP5rNcQzmoy7VBtVBmmXuXHVDT1yprWCV2VMTBjVpv8l&id=100031126815048',
    'https://m.facebook.com/story.php?story_fbid=pfbid02h2fN2HnnJdbAxroMnBMDQrXS45qvD4a82ckQY2tzs3bcVQpSTtZrdtAij1V6aWTjl&id=100031126815048',
    'https://twitter.com/@jinjinjara0807',
    'https://twitter.com/0Me3cQXsLSYrRxS/status/1637068317109395456?t=6O3ZdefCGY91GYLaqXuCew&s=19',
    'https://twitter.com/bata_bts2/status/1640690406810882050?s=46&t=mxBLHeEv-UsxrsxNz8fYUg',
    'https://twitter.com/bissnara/status/1592514650914304001',
    'https://story.kakao.com/pumpkin1027',
    'https://story.kakao.com/lhs7818/AWnugHnQQ90',
    'testStringXyz',
    'http://mins01.com/xxx/yyy/zzz',
);
foreach($urls as $url){
    $rs = SnsUrlinfo::urlinfo($url);
    echo "URL : {$url}\n";
    $json = json_encode($rs);
    echo "RESULT : {$json}\n";
    $userUrl = SnsUrlinfo::userUrl($rs);
    echo "userUrl : {$userUrl}\n";
    $postUrl = SnsUrlinfo::postUrl($rs);
    echo "postUrl : {$postUrl}\n";
    
    echo "\n";
}