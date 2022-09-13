<?php
//https://pear.php.net/package/Services_JSON/download
// include('pear/Services_JSON.php');

$conf = include('temp/confTwitter.php');

include('src/Twitter.php');



if(!isset($argv[1])){
    echo "use : php test.Twitter.php {NAVER_ID}";
    exit();
}
$id = $argv[1];

$sud = new Twitter();
$sud->setConf($conf);

$sud->crawling($id);
// $nb->crawlingFromFile('temp/naverblog-mins01.json');

print_r($sud->data);
// print_r($nb->result);
