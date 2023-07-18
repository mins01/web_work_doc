import Game from "./memory/Game.js";
// import Board from "./memory/Board.js";
// import Card from "./memory/Card.js";



let game = new Game();
game.board.debug = true;
game.onEnd = function(){
  this.draw();
  let msgs = [];
  let sec = game.score.gapSeconds();
  if(sec){
    sec = sec.toFixed(2)
  }else{
    sec = 'NO-PLAY'
  }
  msgs.push('카드 수 : '+this.board.cards.length+' 장')
  msgs.push('걸린시간 : '+sec+' sec')
  msgs.push('뒤집은 횟수 : '+game.score.history.length+' 번')
  console.log('# ==== END ============================ #');
  console.log(msgs.join("\n"));
  console.log('onEnd');
  process.exit();
}
game.draw = function(){
  // this.board.draw();
  let boxs = [];
  boxs.push("# [idx:num]");
  this.board.cards.forEach((card,idx)=>{
      if(card.found){
          boxs.push(`  #${idx}:${card.num}# : found`)    
      }else if(card.selected){
          boxs.push(`  <${idx}:${card.num}> : selected`)    
      }else{
          boxs.push(`  [${idx}:??]`)    
      }
  })
  console.log('# ==== CARDS ============================ #');
  console.log(boxs.join("\n"))
  console.log('# ==== COMMANDS ============================ #');
  console.error('? s: Start.   e: Exit.   number: select card');
}



game.ready(2);

console.log('# ==== COMMANDS ============================ #');
console.error('? s: Start.   e: Exit.   number: select card');

process.stdin.on('data', function (input) {
  if(!game.ended)
  {
    // console.log(input);
    let arg = input.toString("utf-8").trim()
    if(arg=='s'){
      game.start();
    }else if(arg=='e'){
      game.end();
      process.exit();
    }else if(game.running && !isNaN(parseInt(arg))){
      game.selectCard(arg);
    }

  }else{
    process.exit();
  }

});