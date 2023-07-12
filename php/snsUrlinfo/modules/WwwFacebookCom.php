<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

class WwwFacebookCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230712';
    public static $service = 'facebook';
    public static $debug = false;
    // protected static $defRs = array(
    //     'service'=>null,
    //     'user_id'=>null,
    //     'post_id'=>null,
    // );

    public static function urlinfo($url){
        $rs = self::$defRs;
        $rs['service'] = self::$service;
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
            if(isset($parsedUrl['path'][3])){
                $paths = explode('/',$parsedUrl['path']);
                // print_r($paths);
                if(isset($paths[1])) $rs['user_id'] = $paths[1];
                if(isset($paths[3])) $rs['post_id'] = $paths[3];
            }
        }
        return $rs;
    }
}