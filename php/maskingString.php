<?php
function maskingString($str,$divBy=3){
	preg_match_all('/./u',$str,$ss);
	$ss = isset($ss[0])?$ss[0]:array();
	$len = count($ss);
	$lenBy =$len/max(1,$divBy);
	$lenSt =  max(1,floor($lenBy));
    $lenMd=$len==2?$lenSt+1:min($len,$len-$lenSt);
		
	for($i=$lenSt,$m=$lenMd;$i<$m;$i++){
		$ss[$i] = '*';
	}
	return implode('',$ss);
}