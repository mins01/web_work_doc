<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

class BlogNaverCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20240729';
    public static $service = 'naver_blog';
    public static $domain = 'blog.naver.com';
    public static $site = 'https://blog.naver.com';
    public static $debug = false;

    public static function urlinfo($url){
        $rs = static::getDefRs();
        // https://blog.naver.com/PostView.naver?blogId=popline&logNo=222953172387
        // https://blog.naver.com/bsakam/222998421358
        // https://m.blog.naver.com/bsakam/222998421358
        // https://m.blog.naver.com/PostView.naver?blogId=bsakam&logNo=222998421358&proxyReferer=
        $parsedUrl = parse_url($url);
        // print_r($parsedUrl);
        if($parsedUrl['path']=='/PostView.naver'){
            if(isset($parsedUrl['query'])){
                $get = array();
                parse_str($parsedUrl['query'],$get);
                if(isset($get['blogId'])) $rs['user_id'] = $get['blogId'];
                if(isset($get['logNo'])) $rs['post_id'] = $get['logNo'];
            }
        }else{
            if(isset($parsedUrl['path'])){
                $paths = explode('/',$parsedUrl['path']);
                // print_r($paths);
                if(isset($paths[1])) $rs['user_id'] = $paths[1];
                if(isset($paths[2])) $rs['post_id'] = $paths[2];
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
        return isset($rs['user_id'],$rs['post_id'])?static::$site."/{$rs['user_id']}/{$rs['post_id']}":null;
    }

}