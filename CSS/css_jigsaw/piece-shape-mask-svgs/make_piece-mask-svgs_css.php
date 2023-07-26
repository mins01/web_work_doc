<?php
$arr_top = ['n','0','p'];
$arr_right = ['n','0','p'];
$arr_bottom = ['n','0','p'];
$arr_left = ['n','0','p'];



$outs = array();
$outs[]= '@charset "utf-8";';
$outs[]= ':is(.piece-container.mask-svg .piece-shape, .piece-shape.mask-svg){ mask-size: 100% 100%; -webkit-mask-size: 100% 100%; mask-image: url(mask-svg-0000.svg);-webkit-mask-image: url(mask-svg-0000.svg);}';
foreach($arr_top as $top_k => $top){
    $sets = array();
    foreach($arr_right as $right_k => $right){
        foreach($arr_bottom as $bottom_k => $bottom){
            foreach($arr_left as $left_k => $left){
                $f_tail = "{$top}{$right}{$bottom}{$left}";
                $filename = "mask-svg-{$f_tail}.svg";
                $outs[]= ":is(.piece-container.mask-svg .piece-shape, .piece-shape.mask-svg)[data-shape-top=\"{$top}\"][data-shape-right=\"{$right}\"][data-shape-bottom=\"{$bottom}\"][data-shape-left=\"{$left}\"]{mask-image: url({$filename});-webkit-mask-image: url({$filename});}";
            }
        }
    }
}
echo implode("\n",$outs);

file_put_contents('piece-shape-mask-svgs.css',implode("\n",$outs));
