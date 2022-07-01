<?php
require('maskingString.php');

echo "START : mb_maskingString\n";
$tm = microtime(1);
for($i=0,$m=100000;$i<$m;$i++){
    mb_maskingString('한1글2테3스4트5 6잘7되8나9?');
}
$tm2 = microtime(1)-$tm;
$me = memory_get_peak_usage();
echo "loop : $i\n"; 
echo "time : {$tm2} sec\n"; 
echo "memory peak : {$me} byte\n";
echo "END\n";