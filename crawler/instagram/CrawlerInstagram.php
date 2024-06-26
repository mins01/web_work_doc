<?php

class CrawlerInstagram{
    public $temp_dir = '/tmp';
    public $cache_dir = './cache';
    public $conn_timeout = 60;
    public $exec_timeout = 60;
    public $debug = false;

    function __construct(){

    }

    public function mediaByShortcode($shortcode){
        $shortcode_media = array(
            'shortcode'=>$shortcode,
        );
        $cacheKey = "_p_{$shortcode}.html";
        $url = 'https://www.instagram.com/p/'.urlencode($shortcode).'/';
        $body = $this->curlGetBodyWithCache($url,$cacheKey,86400);

        $doc = new DOMDocument();
        $doc->loadHTML($body);
        // print_r($doc);
        $xml = simplexml_import_dom($doc);
        $open_graph = $this->parseOpenGraph($xml);
        $shortcode_media['open_graph'] = $open_graph;


        $variables = array(
            'shortcode'=>$shortcode,
            'child_comment_count'=>3,
            'fetch_comment_count'=>40,
            'parent_comment_count'=>24,
            'has_threaded_comments'=>true,
        );        
        $query_hashes = $this->getQueryHashes($xml);
        $json_q = $this->getJsonGraphqlQuery($query_hashes[0],$variables);
        $like = isset($json_q['data']['shortcode_media']['edge_media_preview_like']['count'])?$json_q['data']['shortcode_media']['edge_media_preview_like']['count']:null;
        $shortcode_media_id = isset($json_q['data']['shortcode_media']['id'])?$json_q['data']['shortcode_media']['id']:null;
        $shortcode_media['id'] = $shortcode_media_id;
        $shortcode_media['like'] = $like;

        return $shortcode_media;
    }


    public function webProfileInfoByUsername($username){
        $data = [];
        $data['username'] = $username;
        $data['data'] = null;
        //--- 기본 데이터
        $cacheKey = "_{$username}.html";
        $url = "https://www.instagram.com/{$username}/";
        $res = $this->curlGetResWithCache($url,array(),$cacheKey,86400);
        // $res['body'] = '';
        $matches = [];
        preg_match_all('/{\\\"csrf_token\\\":\\\"([^"]+)\\\"/',$res['body'],$matches);
        // print_r($matches);exit;
        $csrftoken = $matches[1][0];
        $matches = [];
        preg_match_all('/"device_id":"([^$"]+)"/',$res['body'],$matches);

        $device_id = $matches[1][0];

        $mid = 'Y5_'.substr(md5($username.date('Ymdh')),0,25);




        // print_r($csrftoken);
        // print_r($device_id);
        // exit;
        $cookies = array();
        $cookies['csrftoken'] = $csrftoken;
        $cookies['mid'] =  $mid;
        $cookies['ig_did'] = $device_id;
        $cookies['ig_nrcb'] = 1;
        $cookie = http_build_query($cookies,'','; ',PHP_QUERY_RFC3986);
        // print_r($cookie);

        $headers = array();
        
        $headers[]= "authority: www.instagram.com";
        $headers[]= "accept: */*";
        $headers[]= "accept-language: ko-KR,ko;q=0.9";
        $headers[]= "cache-control: no-cache";
        $headers[] = 'cookie: '.$cookie;
        // $headers[]= "cookie: csrftoken=yXEF8fI5r4jQ5HuXQesB58zsX9gwpuEb; mid=Y5_CbwALAAFYtBcEqIS9jlYfnq_X; ig_did=146A211B-0941-4D92-891E-857AF09EF357; ig_nrcb=1";
        $headers[]= "pragma: no-cache";
        $headers[]= "referer: https://www.instagram.com/gongdaeyeoja/";
        $headers[]= "sec-ch-prefers-color-scheme: light";
        $headers[]= 'sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"';
        $headers[]= "sec-ch-ua-mobile: ?0";
        $headers[]= 'sec-ch-ua-platform: "Windows"';
        $headers[]= "sec-fetch-dest: empty";
        $headers[]= "sec-fetch-mode: cors";
        $headers[]= "sec-fetch-site: same-origin";
        $headers[]= "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36";
        $headers[]= "viewport-width: 923";
        $headers[]= "x-asbd-id: 198387";
        $headers[]= "x-csrftoken: {$csrftoken}";
        $headers[]= "x-ig-app-id: 936619743392459";
        $headers[]= "x-ig-www-claim: 0";
        $headers[]= "x-requested-with: XMLHttpRequest";

        $web_profile_info_url = "https://www.instagram.com/api/v1/users/web_profile_info/?username={$username}";
        // var_dump($res['header']);
        $cacheKey = "web_profile_info_{$username}.json";
        $res = $this->curlGetResWithCache($web_profile_info_url,$headers,$cacheKey,86400);
        // print_r($res['body']);
        $profile_info = json_decode($res['body'],1);
        $summary_profile_info = $this->summaryProfileInfo($profile_info);
        // print_r($profile_info);
        var_dump($summary_profile_info);
        // https://www.instagram.com/api/v1/users/web_profile_info/?username=gongdaeyeoja

    }
    
    private function summaryProfileInfo(& $profile_info){

        $summ = array();
        foreach($profile_info['data']['user'] as $k => $v){
            if(is_array($v)){ continue;}
            $summ[$k] = $v;
        }
        $summ['edge_followed_by_count'] = $profile_info['data']['user']['edge_followed_by']['count'];
        $summ['edge_follow_count'] = $profile_info['data']['user']['edge_follow']['count'];
        return $summ;
    }

    // og 정보 추려내기
    private function parseOpenGraph($xml){
        $metas = $xml->xpath('//meta[contains(@property,"og:")]');
        $ogs = array();
        foreach($metas as $meta){
            $property = (string)$meta['property'];
            $content = (string)$meta['content'];

            if(!isset($ogs[$property])){
                $ogs[$property] = array();
            }
            $ogs[$property][] = $content;
        }
        return $ogs;
    }

    // query_hash 가져오기
    private function getQueryHashes($xml){
        $scripts = $xml->xpath('//script[contains(@src,"rsrc.php")]');
        $query_hashes = array();
        // print_r($scripts);
        foreach($scripts as $script){
            $src = (string)$script['src'];
            // echo $src;exit;
            $cacheKey = hash('sha256',$src).'.js';
            echo  "{$src} => {$cacheKey}\n";
            $body = $this->curlGetBodyWithCache($src,$cacheKey,86400*7);
            $matches = array();
            // function(a,b,c,d,e,f,g,h){"use strict";var i="9f8827793ef34641b2fb195d4d41151c",j="6ff3f5c474a240353993056428fb851e",k="ba5c3def9f75f43213da3d428f4c783a";
            // preg_match('/function\(a,b,c,d,e,f,g,h\)\{"use strict";var i="(.{32})",j="([0-9a-fA-F]{32})",k="([0-9a-fA-F]{32})";/',$body,$matches);
            preg_match('/function\(a,b,c,d,e,f,g,h\)\{"use strict";var i="([\da-fA-F]{32})",j="([0-9a-fA-F]{32})",k="([0-9a-fA-F]{32})";/',$body,$matches);
            if(!isset($matches[0])){
                continue;
            }

            $query_hashes[] = $matches[1];
            $query_hashes[] = $matches[2];
            $query_hashes[] = $matches[3];
            
            
        }
        return $query_hashes;        
    }

    // 
    public function getJsonGraphqlQuery($query_hash,$variables){
        // $variables = {"shortcode":"CgZKgZOLsOk","child_comment_count":3,"fetch_comment_count":40,"parent_comment_count":24,"has_threaded_comments":true}
        $url = "https://www.instagram.com/graphql/query/?query_hash={$query_hash}&variables=".urlencode(json_encode($variables));
        // echo $url ;exit;
        // $rs = $this->curlGet($url); $body = $rs['body'];
        $cacheKey = "{$query_hash}.json";
        $body = $this->curlGetBodyWithCache($url,$cacheKey,60*60);
        if(!isset($body[10])){return null;}
        return json_decode($body,true);
    }
    


    public function curlGetBodyWithCache($url,$cacheKey,$expire=3600){
        if(!$url[0]){return null;}
        $cached_path = "{$this->cache_dir}/{$cacheKey}";
        $body = null;
        if(is_file($cached_path) && time()-$expire <= filemtime($cached_path)){
            $body = file_get_contents($cached_path);
            if($this->debug) echo "cached\n";
        }else{
            if($this->debug && is_file($cached_path) && time()-$expire > filemtime($cached_path)){
                echo "expired\n";
            }
            // $url = 'https://www.instagram.com/p/'.urlencode($shortcode).'/';
            $rs = $this->curlGet($url);
            $body = $rs['body'];
            if($this->debug) echo "no-cache\n";
            file_put_contents($cached_path,$body);
            if($this->debug) echo "save-cache\n";
        }
        return $body;
    }
    public function curlGetResWithCache($url,$headers,$cacheKey,$expire=3600){
        if(!$url[0]){return null;}
        $cached_path = "{$this->cache_dir}/{$cacheKey}";
        $res = null;
        if(is_file($cached_path) && time()-$expire <= filemtime($cached_path)){
            $res = json_decode(file_get_contents($cached_path),true);
            if($this->debug) echo "cached\n";
        }else{
            if($this->debug && is_file($cached_path) && time()-$expire > filemtime($cached_path)){
                echo "expired\n";
            }
            // $url = 'https://www.instagram.com/p/'.urlencode($shortcode).'/';
            $res = $this->curlGet($url,$headers,true);
            if($this->debug) echo "no-cache\n";
            file_put_contents($cached_path,json_encode($res));
            if($this->debug) echo "save-cache\n";
        }
        return $res;
    }


    public function curlGet($url,$headers=array(),$curlopt_header = false){
        
        // $url = 'https://www.instagram.com/p/CgZKgZOLsOk/';

        $this->result = null;
        $result = array();

        // $url = "https://blog.naver.com/WidgetListAsync.naver?blogId={$id}&listNumVisitor=5&isVisitorOpen=true&isBuddyOpen=true&selectCategoryNo=&skinId=0&skinType=C&isCategoryOpen=true&isEnglish=false&listNumComment=5&areaCode=11B10101&weatherType=0&currencySign=ALL&enableWidgetKeys=title%2Cmenu%2Cprofile%2Ccategory%2Ctag%2Ccalendar%2Cmapview%2Csearch%2Clibrary%2Ccomment%2Cvisitor%2Cbuddy%2Ccounter%2Cstat%2Crss%2Cpowered%2Ccontent%2Cgnb%2Cexternalwidget&writingMaterialListType=1&calType=";

        $headers = array_merge(array(
            'Authority: www.instagram.com',
            'Accept: */*',
            'Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Charset: utf-8',
            'Content-Type: application/x-www-form-urlencoded; charset=utf-8',
            // "Referer: https://blog.naver.com/PostList.naver?blogId={$id}&widgetTypeCall=true&topReferer=https%3A%2F%2Fadmin.blog.naver.com%2FLayoutUpdate.naver%3FblogId%3Dmins01%26forward%3D0&directAccess=true",
            'sec-ch-ua: "Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
            'sec-ch-ua-mobile: ?0',
            'sec-ch-ua-platform: "Windows"',
            'Sec-Fetch-Dest: empty',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Site: same-origin',
            // 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'User-Agent: cr-instagram',
        ),$headers);


        $conn = curl_init($url);
        $conn_timeout = $this->conn_timeout;
        $exec_timeout = $this->exec_timeout;
        curl_setopt($conn, CURLOPT_HEADER, $curlopt_header); //응답헤더 OFF. ON 할경우 받는 파일에 헤더가 붙음.
        curl_setopt($conn, CURLOPT_RETURNTRANSFER , true); //응답 내용 가져올지 여부. TRUE면 내용을 리턴. FALSE면 직접 브라우저에 출력
        // curl_setopt($conn, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"); //User Agent 설정
        curl_setopt($conn, CURLOPT_USERAGENT,"cr-instagram"); //User Agent 설정
        curl_setopt($conn, CURLOPT_CONNECTTIMEOUT, $conn_timeout); //서버 접속시 timeout 설정
        curl_setopt($conn, CURLOPT_CONNECTTIMEOUT, $exec_timeout); //서버 접속시 timeout 설정

        curl_setopt($conn, CURLOPT_HTTPHEADER, $headers);

        $result['body'] = curl_exec($conn);
        if($curlopt_header){
            $split_result = explode("\r\n\r\n", $result['body'], 2);
            $result['header'] = isset($split_result[0])?$split_result[0]:'';
            $result['body'] = isset($split_result[1])?$split_result[1]:'';
        }
        $result['errormsg'] = curl_error($conn);
        $result['errorno'] = curl_errno($conn);
        $result['httpcode'] = curl_getinfo($conn,CURLINFO_HTTP_CODE);
		$result['curl_info'] = array(
            'CURLINFO_TOTAL_TIME' => curl_getinfo($conn,CURLINFO_TOTAL_TIME),
            'CURLINFO_NAMELOOKUP_TIME' => curl_getinfo($conn,CURLINFO_NAMELOOKUP_TIME),
            'CURLINFO_CONNECT_TIME' => curl_getinfo($conn,CURLINFO_CONNECT_TIME),
            'CURLINFO_PRETRANSFER_TIME' => curl_getinfo($conn,CURLINFO_PRETRANSFER_TIME),
            'CURLINFO_STARTTRANSFER_TIME' => curl_getinfo($conn,CURLINFO_STARTTRANSFER_TIME),
            'CURLINFO_REDIRECT_TIME' => curl_getinfo($conn,CURLINFO_REDIRECT_TIME)
       );
       return $result;
        // $this->result = $result;
        // $this->postCrawling();
    }


    private function postCrawling(){
        // $this->data['stat'] = null;
        // $this->data['counter'] = null;
        // if(!isset($this->result['body'][10])) return;

        // // JSON 모양이 PHP에서 지원되지 않아서 따로 라이브러리 사용.
        
        // $json = new Services_JSON(SERVICES_JSON_USE_TO_JSON);
        // $rs = $json->decode($this->result['body']);
        // // var_dump($rs);exit;
        
        // //-- 블로그 이웃/ 글 내보내기 / 글 스크랩
        // if(isset($rs->stat->content)){
        //     $xml = simplexml_load_string($rs->stat->content);
        //     $r = $xml->xpath('ul/li/em');
        //     $this->data['stat']['블로그 이웃'] = trim(preg_replace('/[^\d]/','',(string)$r[0]));
        //     $this->data['stat']['글 보내기'] = trim(preg_replace('/[^\d]/','',(string)$r[1]));
        //     $this->data['stat']['글 스크랩'] = trim(preg_replace('/[^\d]/','',(string)$r[2]));
        // }
        // if(isset($rs->counter->content)){
        //     //-- 블로그 이웃/ 글 내보내기 / 글 스크랩
        //     $xml = simplexml_load_string('<div>'.$rs->counter->content.'</div>');
        //     $r = $xml->xpath('p[@class="today"]/span');
        //     $this->data['counter']['Today'] = trim(preg_replace('/[^\d]/','',(string)$r[1]));
        //     $r = $xml->xpath('p[@class="total"]/span');
        //     $this->data['counter']['Total'] = trim(preg_replace('/[^\d]/','',(string)$r[1]));
        // }
    }
}