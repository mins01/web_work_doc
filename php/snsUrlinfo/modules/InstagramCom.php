<?php
namespace mins01\snsUrlinfo\modules;

require_once(dirname(__FILE__).'/Module.php');

class InstagramCom extends \mins01\snsUrlinfo\modules\Module{
    public static $version = '20230712';
    public static $service = 'instagram';
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
            if($paths[1] =='p'){
                $rs['post_id'] = $paths[2];
            }else{
                $rs['user_id'] = $paths[1];
            }
        }
        return $rs;
    }
}