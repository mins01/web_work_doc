<?php

class Twitter{
    public $id = null;
    public $conn_timeout = 60;
    public $exec_timeout = 60;

    public $bearer_token = '';

    public $result = null;
    public $data = array();

    private $conf = array();
    public function __construct(){

    }

    public function setConf($conf){
        $this->conf['bearer_token'] = $conf['bearer_token'];
    }


    public function crawling($username){
        $this->id = $username;
        $this->result = null;
        $result = array();
        
        $url = "https://api.twitter.com/2/users/by";
        $qstrs = array();
        $qstrs['usernames']=$username;
        $qstrs['user.fields']='created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';
        $qstrs['expansions']='pinned_tweet_id';
        // $qstrs['tweet.fields']='attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,organic_metrics,possibly_sensitive,promoted_metrics,public_metrics,referenced_tweets,reply_settings,source,text,withheld';

        $url.='?'.http_build_query($qstrs);
        
        // echo $url;exit;
        $headers = array(
            "Authorization: Bearer {$this->conf['bearer_token']}",

        );


        $conn = curl_init($url);
        $conn_timeout = $this->conn_timeout;
        $exec_timeout = $this->exec_timeout;
        curl_setopt($conn, CURLOPT_HEADER, false); //응답헤더 OFF. ON 할경우 받는 파일에 헤더가 붙음.
        curl_setopt($conn, CURLOPT_RETURNTRANSFER , true); //응답 내용 가져올지 여부. TRUE면 내용을 리턴. FALSE면 직접 브라우저에 출력
        // curl_setopt($conn, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"); //User Agent 설정
        curl_setopt($conn, CURLOPT_USERAGENT,"cr-twitter-blog"); //User Agent 설정
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
        $this->data = null;
        if(!isset($this->result['body'][10])) return;
        $rs = json_decode($this->result['body'],true);
        if(!isset($rs['data'])) return;
        $this->data = $rs['data'];
    }

}
