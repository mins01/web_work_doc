<?php
header("Content-Type: text/event-stream");


echo "event: message\n";
echo "data: START\n\n";

$count = 5;
while ($count > 0) {
    $data = array('count'=>$count);
    echo "id: countdown_{$count}\n";
    echo "event: countdown\n";
    echo "data: {$count}\n\n";
    while (ob_get_level() > 0) {
        ob_end_flush();
    }
    flush();
    if ( connection_aborted() ) break;
    sleep(1);
    $count--;
}

$data = array('count'=>$count);
echo "id: countdown_{$count}\n";
echo "event: countdown\n";
echo "data: {$count}\n\n";

echo "event: message\n";
echo "data: END\n\n";

exit(0);