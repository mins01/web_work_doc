// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
	 let color = element.target.value;
	 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		 chrome.tabs.executeScript(
				 tabs[0].id,
				 {code: 'document.body.style.backgroundColor = "' + color + '";'});
	 });
 };
 
let btn_q = document.getElementById('btn_q');
let input_q = document.getElementById('input_q');
btn_q.onclick = function(element) {
 
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	 console.log(tabs);
	 chrome.tabs.executeScript(
			 tabs[0].id,
			 {code: 'document.querySelector("input[name=\'q\']").value="'+input_q.value+'"'});
 });
}
let btn_h = document.getElementById('btn_h');

btn_h.onclick = function(element) {
	console.log('xxxx');
	chrome.tabs.update({url: "http://mins01.com"});
}

/**
 * 스크립트 저장 처리부
 * @type {[type]}
 */
let txt_script = document.getElementById('txt_script');
let btn_save_txt_script = document.getElementById('btn_save_txt_script');
let btn_run_txt_script = document.getElementById('btn_run_txt_script');
chrome.storage.sync.get('txt_script', function(data) {
  txt_script.value = data.txt_script;
});
btn_save_txt_script.onclick = function(element) {
  chrome.storage.sync.set({txt_script: txt_script.value}, function() {
    console.log('save script ' + txt_script.value);
  })
}
btn_run_txt_script.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('run script ' + txt_script.value);
    chrome.tabs.executeScript(null, { file: "jquery-3.3.1.min.js" }, function() {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: txt_script.value}
        );
    });

    
  });
}
/**
 * 이동 입력 버튼 클릭 테스트
 */
let btn_test = document.getElementById('btn_test');
btn_test.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var listener=null;
    chrome.tabs.onUpdated.addListener(listener = function (tabId , info) {
      if(tabs[0].id != tabId){return;}
      if (info.status === 'complete') {
        console.log("로딩 완료");
        chrome.tabs.onUpdated.removeListener(listener);
        
        var script = `var f = document.querySelector('form.form-search');
        f.q.value='git';
        f.submit();
        `;
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: script}
        );
      }
    });
    
    chrome.tabs.update(tabs[0].id,{url: "http://www.mins01.com/mh/tech"},function(tab){
      console.log("update","http://www.mins01.com/mh/tech");
    });
  });
  

}

/**
 * PHP스쿨 가위바위보
 */
let btn_phpschool_rps = document.getElementById('btn_phpschool_rps');
btn_phpschool_rps.onclick = function(element) {
  var tmp_tm = setInterval(function(){
	var u_val = 'R';
	switch(Math.floor(Math.random()*3)){
		case 0:u_val = 'R'; break;
		case 1:u_val = 'S'; break;
		case 2:u_val = 'P'; break;
	}

  $.ajax(
    {
      url:	"https://phpschool.com/community/rock_paper_scissors_ajax.php",
      type:	"post",
      data:	{
        user: u_val,
        val : "50"
      },
      dataType:"json",
      error:	function(resData){
        alert("오류가 발생했습니다. 관리자에게 문의하세요.");
      },
      success:function(resData) {
        console.log(resData);
        if(resData.mode && resData.com_sel){
        }else{
          clearInterval(tmp_tm);
          console.log("END");
        }
      }
    });
  },1200);
}


