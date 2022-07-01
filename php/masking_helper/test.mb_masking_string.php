<?php
require('masking_helper.php');

echo mb_masking_string('a'),"\n";
echo mb_masking_string('ab'),"\n";
echo mb_masking_string('abc'),"\n";
echo mb_masking_string('abcd'),"\n";
echo mb_masking_string('abcde'),"\n";
echo mb_masking_string('abcdef'),"\n";
echo mb_masking_string('abcdefg'),"\n";
echo mb_masking_string('abcdefgh'),"\n";
echo mb_masking_string('abcdefghi'),"\n";
echo mb_masking_string('abcdefghij'),"\n";
echo mb_masking_string('abcdefghijk'),"\n";
echo mb_masking_string('abcdefghijkl'),"\n";
echo mb_masking_string('abcdefghijklm'),"\n";
echo mb_masking_string('abcdefghijklmn'),"\n";

echo mb_masking_string('한'),"\n";
echo mb_masking_string('한글'),"\n";
echo mb_masking_string('한글테'),"\n";
echo mb_masking_string('한글테스'),"\n";
echo mb_masking_string('한글테스트'),"\n";
echo mb_masking_string('한글테스트 '),"\n";
echo mb_masking_string('한글테스트 잘'),"\n";
echo mb_masking_string('한글테스트 잘되'),"\n";
echo mb_masking_string('한글테스트 잘되나'),"\n";
echo mb_masking_string('한글테스트 잘되나?'),"\n";

echo mb_masking_string('한1'),"\n";
echo mb_masking_string('한1글2'),"\n";
echo mb_masking_string('한1글2테3'),"\n";
echo mb_masking_string('한1글2테3스4'),"\n";
echo mb_masking_string('한1글2테3스4트5'),"\n";
echo mb_masking_string('한1글2테3스4트5 6'),"\n";
echo mb_masking_string('한1글2테3스4트5 6잘7'),"\n";
echo mb_masking_string('한1글2테3스4트5 6잘7되8'),"\n";
echo mb_masking_string('한1글2테3스4트5 6잘7되8나9'),"\n";
echo mb_masking_string('한1글2테3스4트5 6잘7되8나9?'),"\n";

echo mb_masking_string('abcdefghijklmn',0),"\n";
echo mb_masking_string('abcdefghijklmn',1),"\n";
echo mb_masking_string('abcdefghijklmn',2),"\n";
echo mb_masking_string('abcdefghijklmn',3),"\n";
echo mb_masking_string('abcdefghijklmn',4),"\n";
echo mb_masking_string('abcdefghijklmn',5),"\n";
echo mb_masking_string('abcdefghijklmn',6),"\n";
echo mb_masking_string('abcdefghijklmn',7),"\n";
echo mb_masking_string('abcdefghijklmn',8),"\n";
echo mb_masking_string('abcdefghijklmn',9),"\n";
echo mb_masking_string('abcdefghijklmn',10),"\n";