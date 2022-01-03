<?php
/**
 * 비밀번호 검증용 
 * @param $text 검증대상 문자열
 * @param $min=8 최소 길이
 * @param $max=20 최대 길이
 * @param $combi=3 조합수 (0~4)(숫자, 알파벳 소문자, 알파벳 대문자, 특수기호(숫자 알파벳 이외의 글자))
*/
function validatePassword($text, $min=8, $max=20, $combi=3){
  $result = true;
  if(!preg_match('/^.{'.$min.','.$max.'}$/', $text)){
    if($min==$max){
      $result = "지정된 길이({$min})에 맞지 않습니다.";
    }else{
      $result = "지정된 길이(최소:{$min}, 최대:{$max})에 맞지 않습니다.";
    }
    return $result;
  }
  $combiCnt = 0;
  $combiCnt+=(preg_match('/[0-9]/', $text)?1:0); // 숫자
  $combiCnt+=(preg_match('/[a-z]/', $text)!=null?1:0); // 알파벳 소문자
  $combiCnt+=(preg_match('/[A-Z]/', $text)!=null?1:0); // 알파벳 대문자
  $combiCnt+=(preg_match('/[^0-9a-zA-Z]/', $text)!=null?1:0); //그외 글자
  if($combiCnt < $combi){
    $result = "숫자, 알파벳 소문자, 알파벳 대문자, 특수기호 중 {$combi} 종류가 조합되어야 합니다.";
    return $result;
  }
  return $result;
}