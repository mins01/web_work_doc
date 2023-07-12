<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

class InstagramCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230712';
    public static $service = 'instagram';
    public static $domain = 'instagram.com';
    public static $site = 'https://instagram.com';
    public static $debug = false;

    public static function urlinfo($url){
        $rs = static::getDefRs();
        // http://instagram.com/hellogra__
        // https://www.instagram.com/p/Cuhf5Jbpbu4/?img_index=1
        // https://www.instagram.com/p/Cuhf5Jbpbu4/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==
        $parsedUrl = parse_url($url);
        // print_r($parsedUrl);
        if(isset($parsedUrl['path'])){
            $paths = explode('/',$parsedUrl['path']);
            // print_r($paths);
            if($paths[1] =='p'){
                if(isset($paths[2])) $rs['post_id'] = $paths[2];
            }else{
                if(isset($paths[1])) $rs['user_id'] = $paths[1];
            }
        }
        return $rs;
    }

    // 사용자 프로필 URL.
    public static function userUrl($rs){
        return isset($rs['user_id'])?static::$site."/{$rs['user_id']}":null;
    }

    // 게시글 URL
    public static function postUrl($rs){
        return isset($rs['post_id'])?static::$site."/p/{$rs['post_id']}":null;
    }
}