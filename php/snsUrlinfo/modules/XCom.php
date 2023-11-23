<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/TwitterCom.php');

class XCom extends \mins01\snsUrlinfo\modules\TwitterCom{
    public static $version = '20231123';
    public static $service = 'x(twitter)';
    public static $domain = 'x.com';
    public static $site = 'https://x.com';
    public static $debug = false;
}