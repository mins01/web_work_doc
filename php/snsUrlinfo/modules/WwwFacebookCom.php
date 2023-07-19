<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

/**
 * 20230719 릴스 추가되면서 생긴 버그 수정(post_id 를 잘못 처리함)
 */
class WwwFacebookCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230719';
    public static $service = 'facebook';
    public static $domain = 'www.facebook.com';
    public static $site = 'https://www.facebook.com';
    public static $debug = false;

    public static function urlinfo($url){
        $rs = static::getDefRs();
        // https://www.facebook.com/permalink.php?story_fbid=pfbid02EGimNAVpsxSKGjJt8H57fszy1jnJJWWufZ2V62xeXKsgDCHphAL84wyYNC9eb7GRl&id=100004105173588
        // https://www.facebook.com/geukseop/posts/pfbid02hKrdHgZmvkBs776rMoGhJ4mXAAxjNfgRNRKpAKhChkBimBc4gzqcqKVNAX58Xsgwl
        // https://www.facebook.com/geukseop/posts/pfbid0zNSBjgqg5BVevSdN5kWrJnQDFuJvR4kdhiNeMNtGa89U6pCzV8T5jVd1UA2hkMoGl


        $parsedUrl = parse_url($url);
        // print_r($parsedUrl);
        if($parsedUrl['path']=='/permalink.php' || $parsedUrl['path']=='/story.php' || $parsedUrl['path']=='/story.php/'){
            if(isset($parsedUrl['query'])){
                $get = array();
                parse_str($parsedUrl['query'],$get);
                if(isset($get['id'])) $rs['user_id'] = $get['id'];
                if(isset($get['story_fbid'])) $rs['post_id'] = $get['story_fbid'];
            }
        }else{
            if(isset($parsedUrl['path'])){
                $paths = explode('/',$parsedUrl['path']);
                // print_r($paths);
                if(isset($paths[1]) && $paths[1]=='reel'){ //릴스
                    if(isset($paths[1])) $rs['user_id'] = $paths[1];
                    if(isset($paths[2])) $rs['post_id'] = $paths[2];
                }else if(isset($paths[2]) && $paths[2]=='posts'){
                    if(isset($paths[1])) $rs['user_id'] = $paths[1];
                    if(isset($paths[3])) $rs['post_id'] = $paths[3];
                }
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
        if($rs['user_id']=='reel'){
            return isset($rs['post_id'])?static::$site."/{$rs['user_id']}/{$rs['post_id']}":null;
        }
        return isset($rs['post_id'])?static::$site."/{$rs['user_id']}/posts/{$rs['post_id']}":null;
    }
}