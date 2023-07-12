<?php
namespace mins01\snsUrlinfo\modules;

class Module{
    public static $version = '20230712';
    public static $debug = false;
    public static $sns = 'default module';
    public static $defRs = array(
        'service'=>null,
        'user_id'=>null,
        'post_id'=>null,
    );

    public static function urlinfo($url){
        $rs = self::$defRs;
        return $rs;
    }
}