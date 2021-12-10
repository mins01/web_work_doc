<?php
require('maskingString.php');

echo maskingString('a'),"\n";
echo maskingString('ab'),"\n";
echo maskingString('abc'),"\n";
echo maskingString('abcd'),"\n";
echo maskingString('abcde'),"\n";
echo maskingString('abcdef'),"\n";
echo maskingString('abcdefg'),"\n";
echo maskingString('abcdefgh'),"\n";
echo maskingString('abcdefghi'),"\n";
echo maskingString('abcdefghij'),"\n";
echo maskingString('abcdefghijk'),"\n";
echo maskingString('abcdefghijkl'),"\n";
echo maskingString('abcdefghijklm'),"\n";
echo maskingString('abcdefghijklmn'),"\n";

echo maskingString('한'),"\n";
echo maskingString('한글'),"\n";
echo maskingString('한글테'),"\n";
echo maskingString('한글테스'),"\n";
echo maskingString('한글테스트'),"\n";
echo maskingString('한글테스트 '),"\n";
echo maskingString('한글테스트 잘'),"\n";
echo maskingString('한글테스트 잘되'),"\n";
echo maskingString('한글테스트 잘되나'),"\n";
echo maskingString('한글테스트 잘되나?'),"\n";

echo maskingString('한1'),"\n";
echo maskingString('한1글2'),"\n";
echo maskingString('한1글2테3'),"\n";
echo maskingString('한1글2테3스4'),"\n";
echo maskingString('한1글2테3스4트5'),"\n";
echo maskingString('한1글2테3스4트5 6'),"\n";
echo maskingString('한1글2테3스4트5 6잘7'),"\n";
echo maskingString('한1글2테3스4트5 6잘7되8'),"\n";
echo maskingString('한1글2테3스4트5 6잘7되8나9'),"\n";
echo maskingString('한1글2테3스4트5 6잘7되8나9?'),"\n";

echo maskingString('abcdefghijklmn',0),"\n";
echo maskingString('abcdefghijklmn',1),"\n";
echo maskingString('abcdefghijklmn',2),"\n";
echo maskingString('abcdefghijklmn',3),"\n";
echo maskingString('abcdefghijklmn',4),"\n";
echo maskingString('abcdefghijklmn',5),"\n";
echo maskingString('abcdefghijklmn',6),"\n";
echo maskingString('abcdefghijklmn',7),"\n";
echo maskingString('abcdefghijklmn',8),"\n";
echo maskingString('abcdefghijklmn',9),"\n";
echo maskingString('abcdefghijklmn',10),"\n";