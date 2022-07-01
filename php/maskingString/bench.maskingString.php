<?php
require('maskingString.php');


echo "SYSTEM INFO\n";
echo php_uname('s').' '.php_uname('r').' '.php_uname('v').' '.php_uname('m').' '."\n";

echo 'Current PHP version: ' . phpversion()."\n";
echo "Zend engine version: " . zend_version()."\n"."\n";


echo "START : maskingString\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    maskingString('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "END\n\n";


echo "START : preg_maskingString\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    preg_maskingString('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "END\n\n";

echo "START : iconv_maskingString\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    iconv_maskingString('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "END\n\n";

echo "START : mb_maskingString\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    mb_maskingString('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "END\n\n";


