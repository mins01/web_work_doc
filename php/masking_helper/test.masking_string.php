<?php
require('masking_helper.php');

echo masking_string('a'),"\n";
echo masking_string('ab'),"\n";
echo masking_string('abc'),"\n";
echo masking_string('abcd'),"\n";
echo masking_string('abcde'),"\n";
echo masking_string('abcdef'),"\n";
echo masking_string('abcdefg'),"\n";
echo masking_string('abcdefgh'),"\n";
echo masking_string('abcdefghi'),"\n";
echo masking_string('abcdefghij'),"\n";
echo masking_string('abcdefghijk'),"\n";
echo masking_string('abcdefghijkl'),"\n";
echo masking_string('abcdefghijklm'),"\n";
echo masking_string('abcdefghijklmn'),"\n";

echo masking_string('한'),"\n";
echo masking_string('한글'),"\n";
echo masking_string('한글테'),"\n";
echo masking_string('한글테스'),"\n";
echo masking_string('한글테스트'),"\n";
echo masking_string('한글테스트 '),"\n";
echo masking_string('한글테스트 잘'),"\n";
echo masking_string('한글테스트 잘되'),"\n";
echo masking_string('한글테스트 잘되나'),"\n";
echo masking_string('한글테스트 잘되나?'),"\n";

echo masking_string('한1'),"\n";
echo masking_string('한1글2'),"\n";
echo masking_string('한1글2테3'),"\n";
echo masking_string('한1글2테3스4'),"\n";
echo masking_string('한1글2테3스4트5'),"\n";
echo masking_string('한1글2테3스4트5 6'),"\n";
echo masking_string('한1글2테3스4트5 6잘7'),"\n";
echo masking_string('한1글2테3스4트5 6잘7되8'),"\n";
echo masking_string('한1글2테3스4트5 6잘7되8나9'),"\n";
echo masking_string('한1글2테3스4트5 6잘7되8나9?'),"\n";

echo masking_string('abcdefghijklmn',0),"\n";
echo masking_string('abcdefghijklmn',1),"\n";
echo masking_string('abcdefghijklmn',2),"\n";
echo masking_string('abcdefghijklmn',3),"\n";
echo masking_string('abcdefghijklmn',4),"\n";
echo masking_string('abcdefghijklmn',5),"\n";
echo masking_string('abcdefghijklmn',6),"\n";
echo masking_string('abcdefghijklmn',7),"\n";
echo masking_string('abcdefghijklmn',8),"\n";
echo masking_string('abcdefghijklmn',9),"\n";
echo masking_string('abcdefghijklmn',10),"\n";