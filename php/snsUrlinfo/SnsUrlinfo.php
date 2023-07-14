<?php
namespace mins01\snsUrlinfo;

class SnsUrlinfo{
    public static $version = 0.2;
    public static $debug = false;
    public static $defaultModuleClassNs = '\mins01\snsUrlinfo\modules\Module';

    private static function domainToClassName($domain){
        if (version_compare(PHP_VERSION, '5.5.16', '>=')) {
            return str_replace('.', '', ucwords(strtolower($domain),'.'));
        }else{
            return str_replace(' ', '', ucwords(str_replace('.',' ',strtolower($domain))));
        }
        return $domain;
    }

    private static function autoloadModuleByDomain($domain){
        $className = static::domainToClassName($domain);
        $classNS = static::autoloadModule($className);
        if($classNS == null){ // 모듈이 없으면, 서브도메인 없는 걸로 체크!
            
            $removedSubDomain = preg_replace('/^[^\.]*\./','',$domain);
            $removedSubClassName = static::domainToClassName($removedSubDomain);
            $classNS = static::autoloadModule($removedSubClassName); // 서브도메인으로 한번 더 체크
        }
        if($classNS == null){ // 모듈이 없으면, 기본 모듈 사용
            $classNS = static::autoloadModule('Module');
            if(static::$debug){ echo "기본 클래스 파일 로드\n"; }
        }
        return $classNS;
    }
    private static function autoloadModule($className){
        $classNS = "\\".__NAMESPACE__."\\modules\\{$className}";
        if(!class_exists($classNS)){
            if(static::$debug){ echo "클래스 없음: {$classNS}\n"; }
            $classPath = realpath(dirname(__FILE__)."/modules/{$className}.php");
            if(!$classPath){
                if(static::$debug){ echo "클래스 파일 없음: {$classPath}\n"; }
            }else{
                require_once($classPath);
                if(static::$debug){ echo "클래스 파일 로드: {$classPath}\n"; }
            }
        }
        if(!class_exists($classNS)){
            return null;
            // // echo "클래스 없음!!\n";
            // $classNS = static::autoloadModule('Module');
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