const Player = function(username, id) {
  this.username = username;
  this.score = 0;
  this.cards = [];
  this.isCardCzar = false;
  this.canStartGame = false;
  this.id = id;
}

Player.prototype.addCard = function(card){
  this.cards.push(card);
}

Player.prototype.addPoint = function(){
  this.score++;
}

module.exports = Player;


// TODO: new players will have to be constructed - to happen on event listener for initial login???
