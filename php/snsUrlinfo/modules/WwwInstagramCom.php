<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/InstagramCom.php');

class WwwInstagramCom extends \mins01\snsUrlinfo\modules\InstagramCom{
    public static $domain = 'www.instagram.com';
    public static $site = 'https://www.instagram.com';
}