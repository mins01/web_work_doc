"use strict";
if(!mocr){
  var mocr = {};
}

mocr.LetterPackageGroup = function(mocr){
  var LetterPackageGroup = function(){
    this.init();
  }
  LetterPackageGroup.prototype = {
    mih:null,
    width:32,
    data:[],
    letterPackages:[],
    letterPackagesByName:{},
    init:function(){
      this.mih = new mocr.ImageHandler();
    },
    getLetter:function(char,fontFamily,fontWeight,threshold){
      if(!fontFamily){
        fontFamily = 'Serif'; //serif
      }
      if(!fontWeight){
        fontWeight = 'normal'; //serif
      }
      if(!threshold){
        threshold = 0;
      }
      threshold = parseInt(threshold,10);
      this.mih.loadFromChar(char,fontFamily,fontWeight);
      this.mih.simplify(this.width,threshold);
      // var bb = this.mih.getBoundBoxes();
      // console.log(bb);
      var letter = this.mih.getLetter();
      letter.char = char;
      return letter;
    },
    generate:function(fontFamily,fontWeight){
      fontFamily = fontFamily.toLowerCase();
      fontWeight = fontWeight.toLowerCase();
      var name = fontFamily+"_"+fontWeight+"_"+this.width;
      if(this.letterPackagesByName[name]){
        return this.letterPackagesByName[name];
      }
      var mlp = new mocr.LetterPackage(fontFamily,fontWeight,this.width);
      // mlp.width = this.width;
      mlp.name = name
      this.letterPackages.push(mlp);
      this.letterPackagesByName[name] = mlp;
      return mlp;
    },
    generate4Ascii:function(){
      var mlp = this.generate('Serif','normal');
      this.addLetters(mlp,' ','~');
      mlp = this.generate('Sans-Serif','normal');
      this.addLetters(mlp,' ','~');
      mlp = this.generate('Monospace','normal');
      this.addLetters(mlp,' ','~');
    },
    generate4Digit:function(){
      var mlp = this.generate('Serif','normal');
      this.addLetters(mlp,'0','9');
      mlp = this.generate('Sans-Serif','normal');
      this.addLetters(mlp,'0','9');
      mlp = this.generate('Monospace','normal');
      this.addLetters(mlp,'0','9');
    },
    generate4Alphabet:function(){
      var mlp = this.generate('Serif','normal');
      this.addLetters(mlp,'A','Z');
      this.addLetters(mlp,'a','z');
      mlp = this.generate('Sans-Serif','normal');
      this.addLetters(mlp,'A','Z');
      this.addLetters(mlp,'a','z');
      mlp = this.generate('Monospace','normal');
      this.addLetters(mlp,'A','Z');
      this.addLetters(mlp,'a','z');
    },
    generate4Range:function(stChar,edChar){
      var mlp = this.generate('Serif','normal');
      this.addLetters(mlp,stChar,edChar);
      mlp = this.generate('Sans-Serif','normal');
      this.addLetters(mlp,stChar,edChar);
      mlp = this.generate('Monospace','normal');
      this.addLetters(mlp,stChar,edChar);
    },
    /**
     * mocr.LetterPackage 에 기준 문자를 기준으로 Letter를 추가한다.
     * @param  {mocr.LetterPackage} mlp        [description]
     * @param  {char} stChar     [description]
     * @param  {char} edChar     [description]
     * @param  {string} fontFamily Arial , serif , batang , Dotum
     * @param  {string} fontWeight   normal, bold
     * @return {mocr.LetterPackage}            [description]
     */
    addLetters:function(mlp,stChar,edChar,threshold){
      // var stCode = '가'.codePointAt(0);
      // var edCode = '힣'.codePointAt(0);
      // var stCode = '하'.codePointAt(0);
      // var edCode = '핳'.codePointAt(0);
      // var stCode = '0'.codePointAt(0);
      // var edCode = '9'.codePointAt(0);
      var stCode = stChar.codePointAt(0);
      var edCode = edChar.codePointAt(0);
      // console.log(stCode,edCode);
      for(var i=stCode,m=edCode;i<=m;i++){
        var char = String.fromCodePoint(i);
        // console.log(char,i);
        this.addLetter(mlp,char,threshold)
      }
      return mlp;
    },
    addLetter:function(mlp,char,threshold){
      var letter = this.getLetter(char,mlp.fontFamily,mlp.fontWeight,threshold);
      mlp.add(letter);
      return letter;
    },
    search:function(letter,searchedCount){
      var k = "search( )"
      if(console.time) console.time(k)
      var searched = []
      this.letterPackages.forEach((mlp, i) => {
        var searched2 = mlp.search(letter,searchedCount);
        searched = searched.concat(searched2);

        searched.sort(function(a,b){
          return b.matched - a.matched
        })
        if(searched.length > searchedCount){
          searched = searched.slice(0,searchedCount);
        }
      });
      if(console.time) console.timeEnd(k)
      return searched;
    },
    loadLetterPackageFromJson:function(json){
      var obj = JSON.parse(json);
      return this.loadLetterPackageFromObj(obj);
    },
    loadLetterPackageFromObj:function(obj){
      if(!obj){
        console.error("json 구문이 잘못 되었습니다.");
        return;
      }
      var mlp = this.generate(obj.fontFamily,obj.fontWeight);
      mlp.loadFromObj(obj);
      for(var i=0,m=obj.letters.length;i<m;i++){
        mlp.add(new mocr.Letter(obj.letters[i]));
      }
      return mlp;
    },
    loadFromJsonUrl:function(url,cb){
      var thisC = this;
      var k = "loadFromJsonUrl("+url+")";
      if(console.time) console.time(k)
      $.ajax({
        url: url,
        type: 'get', //GET
        dataType: 'json', //xml, json, script, jsonp, or html
        // data: post_data,
      })
      .done(function(rData) { //통신 성공 시 호출
        console.log("success");
        thisC.loadLetterPackageFromObj(rData)
      })
      .fail(function() { //통신 실패 시 호출
        console.log("error");
      })
      .always(function(k,cb){
        return function(data, textStatus, errorThrown) { //성공/실패 후 호출.
          console.log("complete");
          if(console.time) console.timeEnd(k)
          if(typeof cb == 'function'){
            cb(data, textStatus, errorThrown)
          }
        }
      }(k,cb));
    }

  }
  return LetterPackageGroup;
}(mocr);
