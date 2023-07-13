<?php
namespace mins01\snsUrlinfo;

class SnsUrlinfo{
    public static $version = 0.1;
    public static $debug = false;
    public static $defaultModuleClassNs = '\mins01\SnsUrlinfo\modules\Module';

    private static function autoloadModuleByDomain($domain){
        if (version_compare(PHP_VERSION, '5.5.16', '>=')) {
            $className = str_replace('.', '', ucwords(strtolower($domain),'.'));
        }else{
            $className = str_replace(' ', '', ucwords(str_replace('.',' ',strtolower($domain))));
        }
        return static::autoloadModule($className);
    }
    private static function autoloadModule($className){
        $classNS = "\\mins01\\snsUrlinfo\\modules\\{$className}";
        if(!class_exists($classNS)){
            // echo "클래스 없음\n";
            $classPath = realpath(dirname(__FILE__)."/modules/{$className}.php");
            if(!$classPath){
                // echo "클래스 파일 없음:{$classPath} \n";
            }else{
                // echo "클래스 파일 로드:{$classPath} \n";
                require_once($classPath);
            }
        }
        if(!class_exists($classNS)){
            // echo "클래스 없음!!\n";
            $classNS = static::autoloadModule('Module');
        }
        $classNS::$debug = static::$debug;
        return  $classNS;
    }
    public static function urlinfo($url){
        $parsedUrl = parse_url($url);
        // print_r($parsedUrl);
        if(!isset($parsedUrl['host'])){
            return null;
        }
        $module = static::autoloadModuleByDomain($parsedUrl['host']);
        return $module::urlinfo($url);

    }

    public static function userUrl($rs){
        if(!isset($rs['domain'])) return null;
        $module = static::autoloadModuleByDomain($rs['domain']);
        return $module::userUrl($rs);
    }
    public static function postUrl($rs){
        if(!isset($rs['domain'])) return null;
        $module = static::autoloadModuleByDomain($rs['domain']);
        return $module::postUrl($rs);
    }

}