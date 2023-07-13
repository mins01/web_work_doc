<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

/**
 * 20230713 : 쇼츠 구분 추가
 */

class WwwYoutubeCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230713';
    public static $service = 'youtube';
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

                if($rs['user_id']=='shorts'){ // 쇼츠 영상인 경우
                    $rs['post_id'] = isset($paths[2][0])?$paths[2]:null;
                }
            }
        }
        return $rs;
    }

    // 사용자 프로필 URL.
    public static function userUrl($rs){
        if(!isset($rs['user_id'])){return null;}
        if($rs['user_id'] == 'shorts'){
            return static::$site."/{$rs['user_id']}";
        }else{
            return static::$site."/@{$rs['user_id']}";
        }
    }

    // 게시글 URL
    public static function postUrl($rs){
        return isset($rs['post_id'])?static::$site."/watch?v={$rs['post_id']}":null;
    }
}