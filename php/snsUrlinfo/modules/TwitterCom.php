<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

class TwitterCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230712';
    public static $service = 'twitter';
    public static $domain = 'twitter.com';
    public static $site = 'https://twitter.com';
    public static $debug = false;
    // protected static $defRs = array(
    //     'service'=>null,
    //     'user_id'=>null,
    //     'post_id'=>null,
    // );

    public static function urlinfo($url){
        $rs = static::getDefRs();
        // https://twitter.com/0Me3cQXsLSYrRxS/status/1637068317109395456?t=6O3ZdefCGY91GYLaqXuCew&s=19
        // https://twitter.com/bata_bts2/status/1640690406810882050?s=46&t=mxBLHeEv-UsxrsxNz8fYUg
        // https://twitter.com/bissnara/status/1592514650914304001'
        $parsedUrl = parse_url($url);
        // print_r($parsedUrl);
        if(isset($parsedUrl['path'])){
            $paths = explode('/',$parsedUrl['path']);
            // print_r($paths);
            if(isset($paths[1])) $rs['user_id'] = $paths[1];
            if(isset($paths[3])) $rs['post_id'] = $paths[3];

            if($rs['user_id'][0]=='@'){
                $rs['user_id'] = substr($rs['user_id'],1);
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
        return isset($rs['user_id'],$rs['post_id'])?static::$site."/{$rs['user_id']}/status/{$rs['post_id']}":null;
    }
}