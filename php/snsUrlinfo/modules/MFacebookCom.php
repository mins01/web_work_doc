<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/WwwFacebookCom.php');

class MFacebookCom extends \mins01\snsUrlinfo\modules\WwwFacebookCom{
    public static $domain = 'm.facebook.com';
    public static $site = 'https://m.facebook.com';
}