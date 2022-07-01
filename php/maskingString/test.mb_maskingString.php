<?php
require('maskingString.php');

echo mb_maskingString('a'),"\n";
echo mb_maskingString('ab'),"\n";
echo mb_maskingString('abc'),"\n";
echo mb_maskingString('abcd'),"\n";
echo mb_maskingString('abcde'),"\n";
echo mb_maskingString('abcdef'),"\n";
echo mb_maskingString('abcdefg'),"\n";
echo mb_maskingString('abcdefgh'),"\n";
echo mb_maskingString('abcdefghi'),"\n";
echo mb_maskingString('abcdefghij'),"\n";
echo mb_maskingString('abcdefghijk'),"\n";
echo mb_maskingString('abcdefghijkl'),"\n";
echo mb_maskingString('abcdefghijklm'),"\n";
echo mb_maskingString('abcdefghijklmn'),"\n";

echo mb_maskingString('한'),"\n";
echo mb_maskingString('한글'),"\n";
echo mb_maskingString('한글테'),"\n";
echo mb_maskingString('한글테스'),"\n";
echo mb_maskingString('한글테스트'),"\n";
echo mb_maskingString('한글테스트 '),"\n";
echo mb_maskingString('한글테스트 잘'),"\n";
echo mb_maskingString('한글테스트 잘되'),"\n";
echo mb_maskingString('한글테스트 잘되나'),"\n";
echo mb_maskingString('한글테스트 잘되나?'),"\n";

echo mb_maskingString('한1'),"\n";
echo mb_maskingString('한1글2'),"\n";
echo mb_maskingString('한1글2테3'),"\n";
echo mb_maskingString('한1글2테3스4'),"\n";
echo mb_maskingString('한1글2테3스4트5'),"\n";
echo mb_maskingString('한1글2테3스4트5 6'),"\n";
echo mb_maskingString('한1글2테3스4트5 6잘7'),"\n";
echo mb_maskingString('한1글2테3스4트5 6잘7되8'),"\n";
echo mb_maskingString('한1글2테3스4트5 6잘7되8나9'),"\n";
echo mb_maskingString('한1글2테3스4트5 6잘7되8나9?'),"\n";

echo mb_maskingString('abcdefghijklmn',0),"\n";
echo mb_maskingString('abcdefghijklmn',1),"\n";
echo mb_maskingString('abcdefghijklmn',2),"\n";
echo mb_maskingString('abcdefghijklmn',3),"\n";
echo mb_maskingString('abcdefghijklmn',4),"\n";
echo mb_maskingString('abcdefghijklmn',5),"\n";
echo mb_maskingString('abcdefghijklmn',6),"\n";
echo mb_maskingString('abcdefghijklmn',7),"\n";
echo mb_maskingString('abcdefghijklmn',8),"\n";
echo mb_maskingString('abcdefghijklmn',9),"\n";
echo mb_maskingString('abcdefghijklmn',10),"\n";