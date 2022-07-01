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


function maskingPhone($str){
    $arr = explode('-',$str);
    if(isset($arr[1])){
        $arr[1] = str_repeat('*',strlen($arr[1]));
        return implode('-',$arr);
    }else{
        return maskingString($str);
    }	
}
function maskingEmail($str){
    $arr = explode('@',$str);
    if(isset($arr[1])){
        $arr[0] = maskingString($arr[0]);
        return implode('@',$arr);
    }else{
        return maskingString($str);
    }	
}

// 2차배열에서 key 기준으로 마스킹 처리한다.
// maskingRows($data['list'],array('name'=>array('maskingString'),'phone'=>array('maskingPhone')));
function maskingRows(& $rows, $confs=array()){
    foreach($rows as & $row){
        if(is_array($row)){
            maskingRowForArray($row, $confs);
        }else{
            maskingRowForObject($row, $confs);
        }
    }
}
function maskingRowForArray(& $row, $confs=array()){
    foreach($confs as $confK => $confArgs ){
        if(isset($row[$confK])){
            $method = $confArgs[0];
            $args = isset($confArgs[1])?$confArgs[1]:array();
            array_unshift($args,$row[$confK]);
            $row[$confK] = call_user_func_array($method,$args);
        }
    }
}
function maskingRowForObject(& $row, $confs=array()){
    foreach($confs as $confK => $confArgs ){
        if(isset($row->{$confK})){
            $method = $confArgs[0];
            $args = isset($confArgs[1])?$confArgs[1]:array();
            array_unshift($args,$row->{$confK});
            $row->{$confK} = call_user_func_array($method,$args);
        }
    }
    
}