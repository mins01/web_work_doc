<?php
require('validatePassword.php');
echo '# 기본조건 테스트(8,20,3)',"\n";
$str='1234'; $r = validatePassword($str); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='1234567'; $r = validatePassword($str); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345678901234567890'; $r = validatePassword($str); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='123456789012345678901234'; $r = validatePassword($str); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345678'; $r = validatePassword($str); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='1234567a'; $r = validatePassword($str); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='123456Ba'; $r = validatePassword($str); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345!Ba'; $r = validatePassword($str); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";

echo '# 콤보2 테스트(8,20,2)',"\n";
$str='1234'; $r = validatePassword($str,8,20,2); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='1234567'; $r = validatePassword($str,8,20,2); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345678901234567890'; $r = validatePassword($str,8,20,2); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='123456789012345678901234'; $r = validatePassword($str,8,20,2); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345678'; $r = validatePassword($str,8,20,2); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='1234567a'; $r = validatePassword($str,8,20,2); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='123456Ba'; $r = validatePassword($str,8,20,2); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345!Ba'; $r = validatePassword($str,8,20,2); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";


echo '# 콤보4 테스트(8,20,4)',"\n";
$str='1234'; $r = validatePassword($str,8,20,4); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='1234567'; $r = validatePassword($str,8,20,4); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345678901234567890'; $r = validatePassword($str,8,20,4); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='123456789012345678901234'; $r = validatePassword($str,8,20,4); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345678'; $r = validatePassword($str,8,20,4); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='1234567a'; $r = validatePassword($str,8,20,4); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='123456Ba'; $r = validatePassword($str,8,20,4); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345!Ba'; $r = validatePassword($str,8,20,4); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";

echo '# 길이4, 콤보1 테스트(4,4,1)',"\n";
$str='1234'; $r = validatePassword($str,4,4,1); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='1234567'; $r = validatePassword($str,4,4,1); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345678901234567890'; $r = validatePassword($str,4,4,1); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='123456789012345678901234'; $r = validatePassword($str,4,4,1); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345678'; $r = validatePassword($str,4,4,1); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='1234567a'; $r = validatePassword($str,4,4,1); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='123456Ba'; $r = validatePassword($str,4,4,1); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
$str='12345!Ba'; $r = validatePassword($str,4,4,1); echo '테스트: '.$str.' => '.(($r===true)?'검증완료':$r),"\n";
