<?
echo '# test.target.php START =======================',"\n";
echo '# REQUEST HEADER',"\n";
foreach (getallheaders() as $name => $value) {
    echo "[{$name}] $value\n";
}
echo '# _SERVER',"\n";
print_r($_SERVER);
echo '# _POST',"\n";
print_r($_POST);
echo '# _GET',"\n";
print_r($_GET);
echo '# _COOKIE',"\n";
print_r($_COOKIE);
echo '# BODY',"\n";
echo file_get_contents('php://input');
echo "\n",'# END =======================',"\n";
?>
