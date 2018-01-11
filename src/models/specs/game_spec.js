const assert = require('assert');
const Player = require('../player.js');
const Game = require('../game.js')

describe('Game', function () {

	let player1;
  let player2;

  beforeEach(function () {
    player1 = new Player("Kayla");
    player2 = new Player("Pete")
    game = new Game();
  });

  it('should start with no players', function() {
    assert.strictEqual(game.players.length, 0);
  });

  it('should start with all possible black cards', function(){
    assert.strictEqual(game.blackCards.length, 414)
  });

  it('array of black cards should be shuffled', function(){
    assert.strictEqual(game.blackCards[0].text, "Why can't I sleep at night?");
    game.shuffleCards(game.blackCards);
    assert.notStrictEqual(game.blackCards[0].text, "Why can't I sleep at night?")
    // console.log(`New index 0 is: ${game.blackCards[0].text}`);
  });

  it('array of white cards should be shuffled', function(){
    assert.strictEqual(game.whiteCards[0], "Coat hanger abortions.")
    game.shuffleCards(game.whiteCards);
    assert.notStrictEqual(game.whiteCards[0], "Coat hanger abortions.")
    // console.log(`New index 0 is: ${game.whiteCards[0]}`);
  })

  it('should be able to add players to game', function(){
    game.addPlayer(player1);
    assert.strictEqual(game.players[0].username, "Kayla")
    game.addPlayer(player2);
    assert.strictEqual(game.players.length, 2)
  });

  it('should be able to add 10 white cards to players hands and deduct those cards from the white cards in the game', function(){
    game.addPlayer(player1);
    game.addPlayer(player2);
    assert.strictEqual(game.players[0].cards.length, 0);
    assert.strictEqual(game.players[1].cards.length, 0);
    assert.strictEqual(game.whiteCards.length, 1554);
    game.fillPlayerHands();
    assert.strictEqual(game.players[0].cards.length, 10);
    assert.strictEqual(game.players[1].cards.length, 10);
    assert.strictEqual(game.whiteCards.length, 1534);
  });

  it('should be able to loop through players array to assign one card czar', function(){
    game.addPlayer(player1);
    game.addPlayer(player2);
    assert.strictEqual(game.players[0].isCardCzar, false);
    assert.strictEqual(game.players[1].isCardCzar, false);
    game.setCardCzar();
    assert.strictEqual(game.players[0].isCardCzar, true);
    assert.strictEqual(game.players[1].isCardCzar, false);
    game.setCardCzar();
    assert.strictEqual(game.players[0].isCardCzar, false);
    assert.strictEqual(game.players[1].isCardCzar, true);
  });

  it('should be able to identify players not currently acting as card czar', function(){
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.setCardCzar();
    let nonCzarPlayers = game.getNonCardCzarPlayers();
    assert.strictEqual(nonCzarPlayers.length, 1);
  });

	it('should be able to play a black question card', function(){
		assert.strictEqual(game.blackCards.length, 414);
		game.getBlackCard();
		assert.strictEqual(game.blackCards.length, 413);

	});

	it('should know when game is over', function(){
		game.addPlayer(player1);
    game.addPlayer(player2);
		assert.strictEqual(game.isGameOver(), false);
		player1.addPoint();
		assert.strictEqual(game.isGameOver(), false);
		player1.addPoint();
		assert.strictEqual(game.isGameOver(), false);
		player1.addPoint();
		assert.strictEqual(game.isGameOver(), false);
		player1.addPoint();
		assert.strictEqual(game.isGameOver(), false);
		player1.addPoint();
		assert.strictEqual(game.isGameOver(), true);
	});

  });
