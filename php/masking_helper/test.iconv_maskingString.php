<?php
require('masking_helper.php');

echo iconv_maskingString('a'),"\n";
echo iconv_maskingString('ab'),"\n";
echo iconv_maskingString('abc'),"\n";
echo iconv_maskingString('abcd'),"\n";
echo iconv_maskingString('abcde'),"\n";
echo iconv_maskingString('abcdef'),"\n";
echo iconv_maskingString('abcdefg'),"\n";
echo iconv_maskingString('abcdefgh'),"\n";
echo iconv_maskingString('abcdefghi'),"\n";
echo iconv_maskingString('abcdefghij'),"\n";
echo iconv_maskingString('abcdefghijk'),"\n";
echo iconv_maskingString('abcdefghijkl'),"\n";
echo iconv_maskingString('abcdefghijklm'),"\n";
echo iconv_maskingString('abcdefghijklmn'),"\n";

echo iconv_maskingString('한'),"\n";
echo iconv_maskingString('한글'),"\n";
echo iconv_maskingString('한글테'),"\n";
echo iconv_maskingString('한글테스'),"\n";
echo iconv_maskingString('한글테스트'),"\n";
echo iconv_maskingString('한글테스트 '),"\n";
echo iconv_maskingString('한글테스트 잘'),"\n";
echo iconv_maskingString('한글테스트 잘되'),"\n";
echo iconv_maskingString('한글테스트 잘되나'),"\n";
echo iconv_maskingString('한글테스트 잘되나?'),"\n";

echo iconv_maskingString('한1'),"\n";
echo iconv_maskingString('한1글2'),"\n";
echo iconv_maskingString('한1글2테3'),"\n";
echo iconv_maskingString('한1글2테3스4'),"\n";
echo iconv_maskingString('한1글2테3스4트5'),"\n";
echo iconv_maskingString('한1글2테3스4트5 6'),"\n";
echo iconv_maskingString('한1글2테3스4트5 6잘7'),"\n";
echo iconv_maskingString('한1글2테3스4트5 6잘7되8'),"\n";
echo iconv_maskingString('한1글2테3스4트5 6잘7되8나9'),"\n";
echo iconv_maskingString('한1글2테3스4트5 6잘7되8나9?'),"\n";

echo iconv_maskingString('abcdefghijklmn',0),"\n";
echo iconv_maskingString('abcdefghijklmn',1),"\n";
echo iconv_maskingString('abcdefghijklmn',2),"\n";
echo iconv_maskingString('abcdefghijklmn',3),"\n";
echo iconv_maskingString('abcdefghijklmn',4),"\n";
echo iconv_maskingString('abcdefghijklmn',5),"\n";
echo iconv_maskingString('abcdefghijklmn',6),"\n";
echo iconv_maskingString('abcdefghijklmn',7),"\n";
echo iconv_maskingString('abcdefghijklmn',8),"\n";
echo iconv_maskingString('abcdefghijklmn',9),"\n";
echo iconv_maskingString('abcdefghijklmn',10),"\n";