<!doctype html>
<html lang="ko" >
<head>
	<title>parallel_multiple_call - imgs</title>
	<meta charset="utf-8">
	<meta http-equiv="Content-Script-Type" content="text/javascript">
	<meta http-equiv="Content-Style-Type" content="text/css">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="shortcut icon" href="http://www.mins01.com/favicon.ico">	
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<script src="/js/ForGoogle.js"></script>
	<!-- google analytics -->
	<script>if(window.ForGoogle){ ForGoogle.analytics() }else{ console.log("failure : ForGoogle.analytics()");}</script>
	

	<!-- jquery 관련 -->
	<!-- <script src="https://code.jquery.com/jquery-3.6.0.slim.min.js" integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous"></script> -->

	<!-- 부트스트랩 4 : IE8지원안됨! -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous"> 
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" crossorigin="anonymous"></script>  -->
	<!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" crossorigin="anonymous"></script> -->
	<!-- vue.js -->
	<!-- <script src="https://cdn.jsdelivr.net/npm/vue"></script> -->
	
	<!-- meta og -->
	
	<meta property="og:title" content="parallel_multiple_call - imgs">
	<meta property="og:description" content="parallel_multiple_call - imgs">
	<meta name="og:image" content="http://www.mins01.com/img/logo.gif">
	<meta property="og:image:width" content="190">
	<meta property="og:image:height" content="70" />
	<meta property="og:site_name" content="parallel_multiple_call - imgs" />
	<meta property="og:type" content="website">
	
	<!-- //meta og -->

</head>
<body>
	<div class="container">
        <h1>parallel_multiple_call - imgs</h1>
        <ul class="list-group">
            <li class="list-group-item">parallel_multiple_imgs</li>
            <li class="list-group-item">
                여러이미지를 동시에 호출 시 네트워크에서 어떻게 동작하는지 테스트 하기위한 페이지
            </li>
			<li class="list-group-item">
				결론<br>
				크롬 버전 : 버전 114.0.5735.90(공식 빌드) (64비트) 에서 하나의 도메인에 대한 여러 이미지 호출 시 <b>동시 6개</b>를 불러온다.
			</li>
          </ul>
        <ul>

	</div>
    <hr>
	<div class="container">
		<?php
		$tm = time();
		$m = 100;
		for($i=0;$i<$m;$i++):
		?>
		<img src="img.php?tm=<?=$tm?>&amp;i=<?=$i?>">
		<?php 
		endfor; 
		?>
        
    </div>

</body>
</html>