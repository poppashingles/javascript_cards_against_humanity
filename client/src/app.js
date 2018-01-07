//TODO: replace the rawdata with api calls??? Decision needs to be made - "https://api.myjson.com/bins/qhj4z"
const rawdata = require('./rawdata');

const blackCards = rawdata.data.blackCards
const whiteCards = rawdata.data.whiteCards

// Create local 'floor' and 'random' functions that mirror Math.floor(), Math.random()
const { floor: floor, random: random } = Math;
// Get counts for questions and answers
const numOfBlackCards = blackCards.length, numOfWhiteCards = whiteCards.length;
// Keep a constant maxScore
const maxScore = 2;

const getRandomBlackCard = () => { return blackCards[floor(random()*numOfBlackCards)] };
const getRandomWhiteCard = () => { return whiteCards[floor(random()*numOfWhiteCards)] };

// Register players
let players = [];

// TODO: how to new up new players from player class
// TODO: add Game object, addPlayer will be a function on that Prototype ie...
  // Game.prototype.addPlayer = function(player){
  //   this.players.push(player);
  // }
players.push({name: "Player1", score: 0, cards: [], isAsker: false});
players.push({name: "Player2", score: 0, cards: [], isAsker: false});
players.push({name: "Player3", score: 0, cards: [], isAsker: false});

const getActivePlayers = () => {
    let activePlayers = []
    for (player of players) {
        if (!player.isCardCzar)
        {
            activePlayers.push(player);
        }
    }
    return activePlayers
}

const isGameOver = () => {
    for (player of players) {
        if (player.score === maxScore)
        {
            return true;
        }
    }
    return false;
};

const getWinner = () => {
    for (player of players) {
        if (player.score === maxScore)
        {
            return player;
        }
    }
};

const setNewCardCzar = () => {
    // For each player in players
    for (let i = 0; i<players.length;i++) {
        // If this player is the Card Czar
        if (players[i].isCardCzar) {
            // Remove the czar flag, as we want to choose a new one
            players[i].isCardCzar = false;
            // If this player is the last in the array
            if (i === players.length-1)
            {
                // Set the first person in the array as Asker
                players[0].isCardCzar = true;
            }else{
                // Set the next person in the array as Asker
                players[i+1].isCardCzar = true;
            }
            return;
        }
    }
    // If we havent set an asker yet, set the first player as asker
    players[0].isCardCzar = true;
}


// Deal white cards to players
for (player of players){
    for(let i = 0; i < 10; i++) {
        player.cards.push(getRandomWhiteCard())
    }
}

// While no player has maxpoints
while (!isGameOver()){
    // Choose Czar
    setNewCardCzar();
    // Get active players
    let activePlayers = getActivePlayers();
    // Show black card
    q = getRandomBlackCard()
    console.log(`QUESTION: ${q.text}`)

    // For each player who is not Czar
    for (player of activePlayers){
        //   Play a white card(s), remove cards from hand
        for(let i = 0; i < q.pick; i++) {
            // Pick a random answer from our hand (for testing purposes)
            let answer = player.cards[floor(random()*player.cards.length)];
            // Remove the chosen answer from our hand
            player.cards = player.cards.filter(card => card !== answer);
            // Write answer/s to console
            console.log(`  ${player.name}: ${answer}`);
        }
        // Get new white cards to replace those used
        for(let i = 0; i < q.pick; i++){
            player.cards.push(getRandomWhiteCard());
        }
    }

    // Choose (random) round winner for testing purposes
    var winningPlayer = activePlayers[floor(random()*activePlayers.length)];
    console.log(`Winner: ${winningPlayer.name}`);

    // Increment winner players points
    winningPlayer.score += 1;

    console.log();
}

// Announce winner
console.log(`And the player with the most awesome points is: ${getWinner().name}!!!`);
