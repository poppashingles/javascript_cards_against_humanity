const player = require('./player.js');
const rawdata = require('../services/rawdata');


// TODO: Decide winning amount of points
const maxPoints = 5;


const Game = function() {
  this.players = [];
  this.blackCards = rawdata.data.blackCards;
  this.whiteCards = rawdata.data.whiteCards;
};

Game.prototype.shuffleCards = function(array){
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
};

Game.prototype.addPlayer = function(player){
  this.players.push(player)
};

Game.prototype.fillPlayerHands = function(){
  //player variable name is taken so used person as alternative naming
  for (person of this.players){
      while(person.cards.length < 10) {
          person.addCard(this.whiteCards[0]);
          this.whiteCards.shift();
      }
  }
};

Game.prototype.setCardCzar = function(){
  for (let i = 0; i<this.players.length;i++) {
      if (this.players[i].isCardCzar) {
          this.players[i].isCardCzar = false;
          if (i === this.players.length-1)
          {
              this.players[0].isCardCzar = true;
          }else{
              this.players[i+1].isCardCzar = true;
          }
          return;
      }
  }
  this.players[0].isCardCzar = true;
};

Game.prototype.getNonCardCzarPlayers = function(){
    let nonCzarPlayers = []
    for (person of this.players) {
        if (!person.isCardCzar)
        {
            nonCzarPlayers.push(player);
        }
    }
    return nonCzarPlayers;
};

Game.prototype.getBlackCard = function(){
  let cardToDelete = this.blackCards[0]
  this.blackCards.shift();
  return cardToDelete.text
}

Game.prototype.isGameOver = function(){
    for (person of this.players) {
        if (person.score === maxPoints)
        {
            return true;
        }
    }
    return false;
};


Game.prototype.startGame = function(){
  // this.addPlayer() TODO: need to get usernames from clientside, convert to Player objects and add to Game.
  this.shuffleCards(this.blackCards);
  this.shuffleCards(this.whiteCards);
  this.fillPlayerHands();
  this.setCardCzar();
  // this.isGameOver();
  //
  //   while (!isGameOver()){
  //     setCardCzar();
  //     let nonCzarPlayers = getNonCardCzarPlayers();
  //     // 8888: render black card to card czar view
  //     this.getBlackCard();
  //     //8888: logic for allowing players to select white card to play?
  //     //8888: logic for allowing czar to pick winner.
  //     //8888: winning player needs have addPoint function ran on them.
  //         this.fillPlayerHands();
  //
  //     }if (this.isGameOver()){

      }



// };

module.exports = Game;
