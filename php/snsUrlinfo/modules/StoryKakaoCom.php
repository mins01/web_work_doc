<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

class StoryKakaoCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230712';
    public static $service = 'kakao story';
    public static $domain = 'story.kakao.com';
    public static $site = 'https://story.kakao.com';
    public static $debug = false;
    // protected static $defRs = array(
    //     'service'=>null,
    //     'user_id'=>null,
    //     'post_id'=>null,
    // );

    public static function urlinfo($url){
        $rs = static::getDefRs();
        // https://story.kakao.com/pumpkin1027
        // https://story.kakao.com/lhs7818/AWnugHnQQ90
        $parsedUrl = parse_url($url);
        // print_r($parsedUrl);
        if(isset($parsedUrl['path'])){
            $paths = explode('/',$parsedUrl['path']);
            // print_r($paths);
            if(isset($paths[1])) $rs['user_id'] = $paths[1];
            if(isset($paths[2])) $rs['post_id'] = $paths[2];
        }
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