<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

class WwwYoutubeCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230712';
    public static $service = 'facebook';
    public static $domain = 'www.youtube.com';
    public static $site = 'https://www.youtube.com';
    public static $debug = false;


    public static function urlinfo($url){
        $rs = static::getDefRs();
        // https://www.youtube.com/watch?v=v_apulgKO1E
        // https://www.youtube.com/@user-pr3of4iy4u


        $parsedUrl = parse_url($url);
        // print_r($parsedUrl);
        if($parsedUrl['path']=='/watch'){
            if(isset($parsedUrl['query'])){
                $get = array();
                parse_str($parsedUrl['query'],$get);
                if(isset($get['v'])) $rs['post_id'] = $get['v'];
            }
        }else{
            if(isset($parsedUrl['path'][1])){
                $paths = explode('/',$parsedUrl['path']);
                if(isset($paths[1])) $rs['user_id'] = preg_replace('/^@/','',$paths[1]);
            }
        }
        return $rs;
    }

    // 사용자 프로필 URL.
    public static function userUrl($rs){
        return isset($rs['user_id'])?static::$site."/@{$rs['user_id']}":null;
    }

    // 게시글 URL
    public static function postUrl($rs){
        return isset($rs['post_id'])?static::$site."/watch?v={$rs['post_id']}":null;
    }
}