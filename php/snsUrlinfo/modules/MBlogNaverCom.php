<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/BlogNaverCom.php');

class MBlogNaverCom extends \mins01\snsUrlinfo\modules\BlogNaverCom{
    public static $domain = 'm.blog.naver.com';
    public static $site = 'https://m.blog.naver.com';
}