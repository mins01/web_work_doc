<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

class TwitterCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230712';
    public static $service = 'twitter';
    public static $debug = false;
    // protected static $defRs = array(
    //     'service'=>null,
    //     'user_id'=>null,
    //     'post_id'=>null,
    // );

    public static function urlinfo($url){
        $rs = self::$defRs;
        $rs['service'] = self::$service;
        // http://instagram.com/hellogra__
        // https://www.instagram.com/p/Cuhf5Jbpbu4/?img_index=1
        // https://www.instagram.com/p/Cuhf5Jbpbu4/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==
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
}