<?

$ls = file('emoji-test.txt'); //https://unicode.org/Public/emoji/11.0/emoji-test.txt
// print_r($ls);

$group = '';
$subgroup = '';
$rows = array();
$emojiGroup = array();
for($i=0,$m=count($ls);$i<$m;$i++){
	$line = trim($ls[$i]);
	// echo $line ,"[$i]\n";
	if(strpos($line,'# group: ')===0){
		$group = str_replace('# group: ','',$line);
		// echo $group;
		continue;
	}else	if(strpos($line,'# subgroup: ')===0){
		$subgroup = str_replace('# subgroup: ','',$line);
		// echo $subgroup;
		continue;
	}else if(strpos($line,'#')===0){
		continue;
	}else{
		$ret = array();
		// 1F600                                      ; fully-qualified     # 😀 grinning face
		preg_match('/([0-9A-Fa-f]{2,6}(?: [0-9A-Fa-f]{2,6})*)\s*; (fully-qualified|non-fully-qualified)\s*# (.*)$/',$line,$ret);
		if(count($ret)<3){
			continue;
		}
		$row =array(
			'htmlEntity'=>'',
			'text'=>'',
			'hexString'=>$ret[1],
			'qualified'=>$ret[2],
			'desc'=>$ret[3],
			'group'=>$group,
			'subgroup'=>$subgroup,
			'emojiGroup'=>$group.'/'.$subgroup,
		);
		if(!isset($emojiGroup[$row['emojiGroup']])){
			$emojiGroup[$row['emojiGroup']] = 0;
		}
		$emojiGroup[$row['emojiGroup']]++;
		// if(count($row['hexString'])>9){
		// 	continue;
		// }
		// $ret[0]=
		$ts = explode(' ',$row['hexString']);
		// $bins = $ts;
		for($i2=0,$m2=count($ts);$i2<$m2;$i2++){
			$ts[$i2] = '&#'.hexdec($ts[$i2]).';';
			//
			// $bins[$i2] = pack("H*" , (count($bins[$i2])%2==1?'0':'').$bins[$i2] );
			// echo ord($bins[$i2]);
		}
		$row['htmlEntity']=implode($ts);
		// $row['text'] = implode($bins);
		// $row['text'] = html_entity_decode($row['htmlEntity'],null,'UTF-8');
		// $row['text'] = mb_convert_encoding($row['htmlEntity'], 'UTF-8', 'HTML-ENTITIES');
		$row['text'] = preg_replace('/ .*$/','',$row['desc']);
		// $row['bin']=hex2bin(str_replace(' ','',$row['hexString']));
		// print_r($row);
		$rows[] = $row;
	}
}
header('Content-Type: application/javascript; charset=utf-8');
echo 'var emojiList = '.json_encode($rows).';';
echo 'var emojiGroup = '.json_encode($emojiGroup).';';
echo $x = <<<EOFX
var emojiGroups = {};
for(var i=0,m=emojiList.length;i<m;i++){
	var row = emojiList[i];
	if(!emojiGroups[row['emojiGroup']]) emojiGroups[row['emojiGroup']] = [];
	emojiGroups[row['emojiGroup']].push(row);
}
EOFX;

