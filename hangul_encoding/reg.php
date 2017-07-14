<?
$str = 'aวัbcฑÛ	๙Ûaูþ 
จฑ1';
echo "===========","\n";
echo $str,"\n";
echo "===========","\n";
$x = array();
echo "CHAR:HEX","\n"; 
echo "-----------","\n";
preg_match_all('/[x00-x7f,\s]|[^x00-x7f]./',$str,$x); 
foreach($x[0] as $v){
	echo $v,':';
	if(strlen($v)==2){
		echo dechex(ord($v[0])),"+";
		echo dechex(ord($v[1])),"\n";		
	}else{
		echo dechex(ord($v[0])),"\n";
	}
}
echo "===========","\n";
?>