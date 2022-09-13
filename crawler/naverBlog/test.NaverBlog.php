<?php
//https://pear.php.net/package/Services_JSON/download
include('pear/Services_JSON.php');

include('NaverBlog.php');



if(!isset($argv[1])){
    echo "use : php test.NaverBlog.php {NAVER_ID}";
    exit();
}
$id = $argv[1];

$nb = new NaverBlog();

$nb->crawling($id);
// $nb->crawlingFromFile('temp/mins01.json');

print_r($nb->data);
// print_r($nb->result);
