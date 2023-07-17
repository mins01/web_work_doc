import Game from "./memory/Game.js";
// import Board from "./memory/Board.js";
// import Card from "./memory/Card.js";



let game = new Game();
game.board.debug = true;
game.onEnd = function(){
  this.draw();
  console.log('onEnd');
  process.exit();
}
game.ready(1);

console.error('s: Start');
console.error('e: Exit');
console.error('number: select card');

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
  console.error('s: Start');
  console.error('e: Exit');
  console.error('number: select card');
});