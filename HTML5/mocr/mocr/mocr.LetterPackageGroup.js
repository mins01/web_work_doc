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
      var charSize = this.mih.simplify(this.width,threshold);
      // var bb = this.mih.getBoundBoxes();
      // console.log(bb);
      var letter = this.mih.getLetter();
      letter.char = char;
      letter.charWidth = charSize[0];
      letter.charHeight = charSize[1];

      // var ctx = letter.toContext2d();
      // $("#div_out").append("<div class='letter-width"+letter.width+"' style='font-family:"+fontFamily+";'>"+letter.char+"</div><img title='"+letter.desc+"' src='"+this.mih.canvas.toDataURL()+"'>");
      // $("#div_out").append("<div class='letter-width"+letter.width+"' style='font-family:"+fontFamily+";'>"+letter.char+"</div><img title='"+letter.desc+"' src='"+ctx.canvas.toDataURL()+"'>");
      return letter;
    },
    generate:function(fontFamily,fontWeight){
      fontFamily = fontFamily.toLowerCase();
      fontWeight = fontWeight.toLowerCase();
      var name = fontFamily+"_"+fontWeight;
      if(this.letterPackagesByName[name]){
        return this.letterPackagesByName[name];
      }
      var mlp = new mocr.LetterPackage(fontFamily,fontWeight);
      mlp.width = this.width;
      mlp.name = name
      this.letterPackages.push(mlp);
      this.letterPackagesByName[name] = mlp;
      return mlp;
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
      return searched;
    }

  }
  return LetterPackageGroup;
}(mocr);
