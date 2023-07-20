<?php
$arr_top = ['n','0','p'];
$arr_right = ['n','0','p'];
$arr_bottom = ['n','0','p'];
$arr_left = ['n','0','p'];

foreach($arr_top as $top_k => $top){
    $sets = array();
    foreach($arr_right as $right_k => $right){
        foreach($arr_bottom as $bottom_k => $bottom){
            foreach($arr_left as $left_k => $left){
                $f_tail = "{$top}{$right}{$bottom}{$left}";
                $filename = "piece-mask-{$f_tail}.svg";
                $css = ".piece-shape[data-shape-top=\"{$top}\"][data-shape-right=\"{$right}\"][data-shape-bottom=\"{$bottom}\"][data-shape-left=\"{$left}\"]{mask: url({$filename});-webkit-mask: url({$filename});}";
                echo $css."\n";
            }
        }
    }
}


