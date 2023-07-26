<?php
$fc = file_get_contents('_mask-svg-def.svg');

$arr_top = ['n','0','p'];
$arr_right = ['n','0','p'];
$arr_bottom = ['n','0','p'];
$arr_left = ['n','0','p'];

foreach($arr_top as $top){
    $sets = array();
    foreach($arr_right as $right){
        foreach($arr_bottom as $bottom){
            foreach($arr_left as $left){
                $setting = "top-{$top} right-{$right} bottom-{$bottom} left-{$left}";
                $f_tail = "{$top}{$right}{$bottom}{$left}";
                echo $setting."\n";
                echo $f_tail."\n";
                $filename = "mask-svg-{$f_tail}.svg";
                $cc = str_replace('{{setting}}',$setting,$fc);
                file_put_contents($filename,$cc);
            }
        }
    }
}


