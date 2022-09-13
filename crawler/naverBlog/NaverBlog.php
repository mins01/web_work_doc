<?php

class NaverBlog{
    public $id = null;
    public $conn_timeout = 60;
    public $exec_timeout = 60;

    public $result = null;
    public $data = array();
    public function __construct(){

    }


    public function crawling($id){
        $this->id = $id;
        $this->result = null;
        $result = array();

        $url = "https://blog.naver.com/WidgetListAsync.naver?blogId={$id}&listNumVisitor=5&isVisitorOpen=true&isBuddyOpen=true&selectCategoryNo=&skinId=0&skinType=C&isCategoryOpen=true&isEnglish=false&listNumComment=5&areaCode=11B10101&weatherType=0&currencySign=ALL&enableWidgetKeys=title%2Cmenu%2Cprofile%2Ccategory%2Ctag%2Ccalendar%2Cmapview%2Csearch%2Clibrary%2Ccomment%2Cvisitor%2Cbuddy%2Ccounter%2Cstat%2Crss%2Cpowered%2Ccontent%2Cgnb%2Cexternalwidget&writingMaterialListType=1&calType=";

        $headers = array(
            'Authority: blog.naver.com',
            'Accept: */*',
            'Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Charset: utf-8',
            'Content-Type: application/x-www-form-urlencoded; charset=utf-8',
            "Referer: https://blog.naver.com/PostList.naver?blogId={$id}&widgetTypeCall=true&topReferer=https%3A%2F%2Fadmin.blog.naver.com%2FLayoutUpdate.naver%3FblogId%3Dmins01%26forward%3D0&directAccess=true",
            'sec-ch-ua: "Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
            'sec-ch-ua-mobile: ?0',
            'sec-ch-ua-platform: "Windows"',
            'Sec-Fetch-Dest: empty',
            'Sec-Fetch-Mode: cors',
            'Sec-Fetch-Site: same-origin',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        );


        $conn = curl_init($url);
        $conn_timeout = $this->conn_timeout;
        $exec_timeout = $this->exec_timeout;
        curl_setopt($conn, CURLOPT_HEADER, false); //응답헤더 OFF. ON 할경우 받는 파일에 헤더가 붙음.
        curl_setopt($conn, CURLOPT_RETURNTRANSFER , true); //응답 내용 가져올지 여부. TRUE면 내용을 리턴. FALSE면 직접 브라우저에 출력
        curl_setopt($conn, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"); //User Agent 설정
        curl_setopt($conn, CURLOPT_CONNECTTIMEOUT, $conn_timeout); //서버 접속시 timeout 설정
        curl_setopt($conn, CURLOPT_CONNECTTIMEOUT, $exec_timeout); //서버 접속시 timeout 설정

        curl_setopt($conn, CURLOPT_HTTPHEADER, $headers);

        $result['body'] = curl_exec($conn);
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
        $this->result = $result;
        $this->postCrawling();
    }

    public function crawlingFromFile($f){
        if(!is_file($f)){ return false; }
        $this->result = null;
        $result = array();
        $result['body'] =file_get_contents($f);
        $result['errormsg'] = 'crawlingFromFile';
        $result['errorno'] = 0;
        $result['httpcode'] = 0;

        $this->result = $result;
        $this->postCrawling();
    }

    private function postCrawling(){
        $this->data['stat'] = null;
        $this->data['counter'] = null;
        if(!isset($this->result['body'][10])) return;

        // JSON 모양이 PHP에서 지원되지 않아서 따로 라이브러리 사용.
        
        $json = new Services_JSON(SERVICES_JSON_USE_TO_JSON);
        $rs = $json->decode($this->result['body']);
        // var_dump($rs);exit;
        
        //-- 블로그 이웃/ 글 내보내기 / 글 스크랩
        $xml = simplexml_load_string($rs->stat->content);
        $r = $xml->xpath('ul/li/em');
        $this->data['stat']['블로그 이웃'] = trim(preg_replace('/[^\d]/','',(string)$r[0]));
        $this->data['stat']['글 보내기'] = trim(preg_replace('/[^\d]/','',(string)$r[1]));
        $this->data['stat']['글 스크랩'] = trim(preg_replace('/[^\d]/','',(string)$r[2]));
        //-- 블로그 이웃/ 글 내보내기 / 글 스크랩
        $xml = simplexml_load_string('<div>'.$rs->counter->content.'</div>');
        $r = $xml->xpath('p[@class="today"]/span');
       $this->data['counter']['Today'] = trim(preg_replace('/[^\d]/','',(string)$r[1]));
        $r = $xml->xpath('p[@class="total"]/span');
       $this->data['counter']['Total'] = trim(preg_replace('/[^\d]/','',(string)$r[1]));
    }

}
