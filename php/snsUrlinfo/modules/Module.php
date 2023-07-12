<?php
namespace mins01\snsUrlinfo\modules;

class Module{
    public static $version = '20230712';
    public static $debug = false;
    public static $service = null;
    public static $domain = null;
    public static $site = null;
    public static $defRs = array(
        'service'=>null,
        'domain'=>null,
        'user_id'=>null,
        'post_id'=>null,
    );

    public static function getDefRs(){
        $rs = static::$defRs;
        $rs['service'] = static::$service;
        $rs['domain'] = static::$domain;
        return $rs;
    }
    public static function urlinfo($url){
        $rs = static::getDefRs();
        return $rs;
    }

    // 사용자 프로필 URL.
    public static function userUrl($rs){
        return isset($rs['user_id'])?static::$site."/{$rs['user_id']}":null;
    }

    // 게시글 URL
    public static function postUrl($rs){
        return isset($rs['user_id'],$rs['post_id'])?static::$site."/{$rs['user_id']}/{$rs['post_id']}":null;
    }
}