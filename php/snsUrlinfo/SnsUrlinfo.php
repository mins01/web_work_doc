<?php
namespace mins01\snsUrlinfo;
/**
 * 2023-11-27 : filter_var($url, FILTER_VALIDATE_URL) 적용. 이상 URL에서는 동작안하도록.
 */

class SnsUrlinfo{
    public static $version = 0.2;
    public static $debug = false;
    public static $defaultModuleClassNs = '\mins01\snsUrlinfo\modules\Module';

    private static function echoDebug($msg){
        if(static::$debug){   echo $msg."\n"; }
    }

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
        if($classNS == null){ // 모듈이 없으면, 서브도메인 없는 걸로 로드!
            $removedSubDomain = preg_replace('/^[^\.]*\./','',$domain);
            $removedSubClassName = static::domainToClassName($removedSubDomain);
            $classNS = static::autoloadModule($removedSubClassName); // 서브도메인으로 한번 더 로드
        }
        if($classNS == null){ // 모듈이 없으면, 기본 모듈 사용
            $classNS = static::autoloadModule('Module');
            // static::echoDebug("기본 모듈 파일 로드");
        }
        return $classNS;
    }
    private static function autoloadModule($className){
        $classNS = "\\".__NAMESPACE__."\\modules\\{$className}";
        if(!class_exists($classNS)){
            $classPath = realpath(dirname(__FILE__)."/modules/{$className}.php");
            if(!$classPath){
                // static::echoDebug("모듈 파일 없음: {$className}");
            }else{
                require_once($classPath);
                static::echoDebug("모듈 파일 로드: {$className}");
            }
        }
        if(!class_exists($classNS)){
            return null;
        }
        $classNS::$debug = static::$debug;
        return  $classNS;
    }
    public static function urlinfo($url){
        if(!filter_var($url, FILTER_VALIDATE_URL)){ // 이상 URL이면 처리 안함. 비인코딩 한글도 이상 URL로 처리함
            return null;
        }
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