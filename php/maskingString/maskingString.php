<?php
function maskingString($str,$divBy=3){
	return mb_maskingString($str,$divBy);
}

function preg_maskingString($str,$divBy=3){
	preg_match_all('/./u',$str,$ss);
	$ss = isset($ss[0])?$ss[0]:array();
	$len = count($ss);
	$lenBy =$len/max(1,$divBy);
	$lenSt =  max(1,floor($lenBy));
    $lenMd=$len==2?2:min($len,$len-$lenSt);
		
	for($i=$lenSt,$m=$lenMd;$i<$m;$i++){
		$ss[$i] = '*';
	}
	return implode('',$ss);
}

function iconv_maskingString($str,$divBy=3){
	$len = iconv_strlen($str,'utf-8');
	$lenBy =$len/max(1,$divBy);
	$lenSt =  max(1,floor($lenBy));
    $lenMd=$len==2?2:min($len,$len-$lenSt);
	if($lenMd > $lenSt){
		return iconv_substr($str,0,$lenSt,'utf-8').str_repeat('*',$lenMd-$lenSt).iconv_substr($str,$lenMd,$len,'utf-8');
	}else{
		return $str;

	}
}

function mb_maskingString($str,$divBy=3){
	$len = mb_strlen($str,'utf-8');
	$lenBy =$len/max(1,$divBy);
	$lenSt =  max(1,floor($lenBy));
    $lenMd=$len==2?2:min($len,$len-$lenSt);
	if($lenMd > $lenSt){
		return mb_substr($str,0,$lenSt,'utf-8').str_repeat('*',$lenMd-$lenSt).mb_substr($str,$lenMd,$len,'utf-8');
	}else{
		return $str;

	}
}