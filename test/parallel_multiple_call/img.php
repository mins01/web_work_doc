<?php
sleep(1);
// usleep(20000);
$img_path = dirname(__FILE__).'/img.gif';
// echo $img_path;exit;

$fp = fopen($img_path, 'rb');
header("Content-Type: image/gif");
// header("Content-Length: " . filesize($name));
// dump the picture and stop the script
fpassthru($fp);
fclose($fp);

// passthru($img_path);