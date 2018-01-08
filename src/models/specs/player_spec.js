const assert = require('assert');
const Player = require('../player.js');
const rawdata = require('../../services/rawdata');


describe('Player', function () {

	let player1;
  let player2;
  const blackCards = rawdata.data.blackCards
  const whiteCards = rawdata.data.whiteCards

	beforeEach(function () {
		player1 = new Player("Kayla");
    player2 = new Player("Pete")
	});

	it('should have a username', function () {
		assert.strictEqual(player1.username, 'Kayla');
	});

  it('should start with a score of 0', function(){
    assert.strictEqual(player2.score, 0);
    assert.strictEqual(player1.score, 0);
  });

  it('should start with an empty array of cards', function(){
    assert.strictEqual(player1.cards.length, 0);
    assert.strictEqual(player2.cards.length, 0);
  });

  it('should start with isCardCzar set to false', function(){
    assert.strictEqual(player1.isCardCzar, false);
    assert.strictEqual(player2.isCardCzar, false);
  });

  it('should be able to increment the score by 1', function(){
    player1.addPoint();
    assert.strictEqual(player1.score, 1);
    player1.addPoint();
    assert.strictEqual(player1.score, 2);
  });

  it('should be able to add white cards to the players hand', function(){
    player1.addCard(whiteCards[0]);
    assert.strictEqual(player1.cards.length, 1);
  });

});
