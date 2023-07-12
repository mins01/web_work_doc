<?php
namespace mins01\snsUrlinfo;

class SnsUrlinfo{
    public static $version = 0.1;
    public static $debug = false;
    public static $defaultModuleClassNs = '\mins01\SnsUrlinfo\modules\Module';

    private static function autoloadModule($className){
        $classNS = "\\mins01\\SnsUrlinfo\\modules\\{$className}";
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
            return null;
        }
        $classNS::$debug = self::$debug;
        return  $classNS;
    }
    public static function urlinfo($url){
        $parsedUrl = parse_url($url);
        // print_r($parsedUrl);
        if(!isset($parsedUrl['host'])){
            return null;
        }
        $className = str_replace('.', '', ucwords($parsedUrl['host'],'.'));
        $module = self::autoloadModule($className);
        // echo $module::$version;
        if(!isset($module)){ // 관련 모듈이 없으면 기본 모듈로 처리한다.
            $module = self::$defaultModuleClassNs;
        }
        return $module::urlinfo($url);

    }

    static function parseSnsUrl_blog_naver_com($snsUrl){

    }
}