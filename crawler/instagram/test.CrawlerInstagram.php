<?php
require('CrawlerInstagram.php');

$cri = new CrawlerInstagram();
$shortcode = 'CgZKgZOLsOk';
$cri->mediaByShortcode($shortcode);