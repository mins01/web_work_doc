<?php
require('masking_helper.php');

echo iconv_masking_string('a'),"\n";
echo iconv_masking_string('ab'),"\n";
echo iconv_masking_string('abc'),"\n";
echo iconv_masking_string('abcd'),"\n";
echo iconv_masking_string('abcde'),"\n";
echo iconv_masking_string('abcdef'),"\n";
echo iconv_masking_string('abcdefg'),"\n";
echo iconv_masking_string('abcdefgh'),"\n";
echo iconv_masking_string('abcdefghi'),"\n";
echo iconv_masking_string('abcdefghij'),"\n";
echo iconv_masking_string('abcdefghijk'),"\n";
echo iconv_masking_string('abcdefghijkl'),"\n";
echo iconv_masking_string('abcdefghijklm'),"\n";
echo iconv_masking_string('abcdefghijklmn'),"\n";

echo iconv_masking_string('한'),"\n";
echo iconv_masking_string('한글'),"\n";
echo iconv_masking_string('한글테'),"\n";
echo iconv_masking_string('한글테스'),"\n";
echo iconv_masking_string('한글테스트'),"\n";
echo iconv_masking_string('한글테스트 '),"\n";
echo iconv_masking_string('한글테스트 잘'),"\n";
echo iconv_masking_string('한글테스트 잘되'),"\n";
echo iconv_masking_string('한글테스트 잘되나'),"\n";
echo iconv_masking_string('한글테스트 잘되나?'),"\n";

echo iconv_masking_string('한1'),"\n";
echo iconv_masking_string('한1글2'),"\n";
echo iconv_masking_string('한1글2테3'),"\n";
echo iconv_masking_string('한1글2테3스4'),"\n";
echo iconv_masking_string('한1글2테3스4트5'),"\n";
echo iconv_masking_string('한1글2테3스4트5 6'),"\n";
echo iconv_masking_string('한1글2테3스4트5 6잘7'),"\n";
echo iconv_masking_string('한1글2테3스4트5 6잘7되8'),"\n";
echo iconv_masking_string('한1글2테3스4트5 6잘7되8나9'),"\n";
echo iconv_masking_string('한1글2테3스4트5 6잘7되8나9?'),"\n";

echo iconv_masking_string('abcdefghijklmn',0),"\n";
echo iconv_masking_string('abcdefghijklmn',1),"\n";
echo iconv_masking_string('abcdefghijklmn',2),"\n";
echo iconv_masking_string('abcdefghijklmn',3),"\n";
echo iconv_masking_string('abcdefghijklmn',4),"\n";
echo iconv_masking_string('abcdefghijklmn',5),"\n";
echo iconv_masking_string('abcdefghijklmn',6),"\n";
echo iconv_masking_string('abcdefghijklmn',7),"\n";
echo iconv_masking_string('abcdefghijklmn',8),"\n";
echo iconv_masking_string('abcdefghijklmn',9),"\n";
echo iconv_masking_string('abcdefghijklmn',10),"\n";