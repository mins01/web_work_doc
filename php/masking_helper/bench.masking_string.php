<?php
require('masking_helper.php');


echo "SYSTEM INFO\n";
echo php_uname('s').' '.php_uname('r').' '.php_uname('v').' '.php_uname('m').' '."\n";

echo 'Current PHP version: ' . phpversion()."\n";
echo "Zend engine version: " . zend_version()."\n"."\n";


echo "START : masking_string\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    masking_string('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "END\n\n";


echo "START : preg_masking_string\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    preg_masking_string('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "END\n\n";

echo "START : iconv_masking_string\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    iconv_masking_string('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "END\n\n";

echo "START : mb_masking_string\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    mb_masking_string('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "END\n\n";


