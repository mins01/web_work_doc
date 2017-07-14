<?

$filename = 'logo.gif';

$b = file_get_contents($filename);

echo base64_encode($b);
exit;


?>