<?php
namespace mins01\snsUrlinfo\modules;
require_once(dirname(__FILE__).'/Module.php');

/**
 * 20230714 : 최초 추가. www 는 user_id 로 안 씀!
 */

class TistoryCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230714';
    public static $service = 'tistory';
    public static $domain = 'tistory.com';
    public static $site = 'https://{user_id}.tistory.com';
    public static $debug = false;

    public static function urlinfo($url){
        $rs = static::getDefRs();
        // http://instagram.com/hellogra__
        // https://www.instagram.com/p/Cuhf5Jbpbu4/?img_index=1
        // https://www.instagram.com/p/Cuhf5Jbpbu4/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==
        // https://www.instagram.com/reels/Ctkboz4Jqng/
        $parsedUrl = parse_url($url);
        $subDomain = str_replace('.tistory.com','',strtolower($parsedUrl['host']));
        if(isset($subDomain[0]) && $subDomain !== 'www'){ // www 는 제외한다.
            $rs['user_id'] = $subDomain;
            if(isset($parsedUrl['path'])){
                $paths = explode('/',$parsedUrl['path']);
                if(isset($paths[1])) $rs['post_id'] = $paths[1];
            }
        }
        return $rs;
    }

    // 사용자 프로필 URL.
    public static function userUrl($rs){
        return isset($rs['user_id'])?str_replace('{user_id}',$rs['user_id'],static::$site):null;
    }

    // 게시글 URL
    public static function postUrl($rs){
        return isset($rs['post_id'],$rs['user_id'])?str_replace('{user_id}',$rs['user_id'],static::$site).'/'.$rs['post_id']:null;
    }
}