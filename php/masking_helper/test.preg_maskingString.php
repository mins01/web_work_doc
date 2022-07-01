<?php
require('masking_helper.php');

echo preg_maskingString('a'),"\n";
echo preg_maskingString('ab'),"\n";
echo preg_maskingString('abc'),"\n";
echo preg_maskingString('abcd'),"\n";
echo preg_maskingString('abcde'),"\n";
echo preg_maskingString('abcdef'),"\n";
echo preg_maskingString('abcdefg'),"\n";
echo preg_maskingString('abcdefgh'),"\n";
echo preg_maskingString('abcdefghi'),"\n";
echo preg_maskingString('abcdefghij'),"\n";
echo preg_maskingString('abcdefghijk'),"\n";
echo preg_maskingString('abcdefghijkl'),"\n";
echo preg_maskingString('abcdefghijklm'),"\n";
echo preg_maskingString('abcdefghijklmn'),"\n";

echo preg_maskingString('한'),"\n";
echo preg_maskingString('한글'),"\n";
echo preg_maskingString('한글테'),"\n";
echo preg_maskingString('한글테스'),"\n";
echo preg_maskingString('한글테스트'),"\n";
echo preg_maskingString('한글테스트 '),"\n";
echo preg_maskingString('한글테스트 잘'),"\n";
echo preg_maskingString('한글테스트 잘되'),"\n";
echo preg_maskingString('한글테스트 잘되나'),"\n";
echo preg_maskingString('한글테스트 잘되나?'),"\n";

echo preg_maskingString('한1'),"\n";
echo preg_maskingString('한1글2'),"\n";
echo preg_maskingString('한1글2테3'),"\n";
echo preg_maskingString('한1글2테3스4'),"\n";
echo preg_maskingString('한1글2테3스4트5'),"\n";
echo preg_maskingString('한1글2테3스4트5 6'),"\n";
echo preg_maskingString('한1글2테3스4트5 6잘7'),"\n";
echo preg_maskingString('한1글2테3스4트5 6잘7되8'),"\n";
echo preg_maskingString('한1글2테3스4트5 6잘7되8나9'),"\n";
echo preg_maskingString('한1글2테3스4트5 6잘7되8나9?'),"\n";

echo preg_maskingString('abcdefghijklmn',0),"\n";
echo preg_maskingString('abcdefghijklmn',1),"\n";
echo preg_maskingString('abcdefghijklmn',2),"\n";
echo preg_maskingString('abcdefghijklmn',3),"\n";
echo preg_maskingString('abcdefghijklmn',4),"\n";
echo preg_maskingString('abcdefghijklmn',5),"\n";
echo preg_maskingString('abcdefghijklmn',6),"\n";
echo preg_maskingString('abcdefghijklmn',7),"\n";
echo preg_maskingString('abcdefghijklmn',8),"\n";
echo preg_maskingString('abcdefghijklmn',9),"\n";
echo preg_maskingString('abcdefghijklmn',10),"\n";