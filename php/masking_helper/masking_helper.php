<?php

/**
 * https://github.com/mins01/web_work_doc/tree/master/php/masking_helper
 * php 마스킹용 헬퍼
 */

function masking_string($str,$divBy=3){
	return mb_masking_string($str,$divBy);
}

function preg_masking_string($str,$divBy=3){
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

function iconv_masking_string($str,$divBy=3){
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

function mb_masking_string($str,$divBy=3){
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


function masking_phone($str){
    $arr = explode('-',$str);
    if(isset($arr[1])){
        $arr[1] = str_repeat('*',strlen($arr[1]));
        return implode('-',$arr);
    }else{
        return masking_string($str);
    }	
}
function masking_email($str){
    $arr = explode('@',$str);
    if(isset($arr[1])){
        $arr[0] = masking_string($arr[0]);
        return implode('@',$arr);
    }else{
        return masking_string($str);
    }	
}

// 2차배열에서 key 기준으로 마스킹 처리한다.
// masking_rows($rows,array('name'=>array('masking_string'),'tel'=>array('masking_phone'),'email'=>array('masking_email')));
function masking_rows(& $rows, $confs=array()){
    foreach($rows as & $row){
        masking_row($row, $confs);
    }
}
function masking_row(& $row, $confs=array()){
    foreach($confs as $confK => $confArgs ){
        if(is_array($row) && isset($row[$confK])){
            $method = $confArgs[0];
            $args = isset($confArgs[1])?$confArgs[1]:array();
            array_unshift($args,$row[$confK]);
            $row[$confK] = call_user_func_array($method,$args);
        }else if(isset($row->{$confK})){
            $method = $confArgs[0];
            $args = isset($confArgs[1])?$confArgs[1]:array();
            array_unshift($args,$row->{$confK});
            $row->{$confK} = call_user_func_array($method,$args);
        }
    }
}
