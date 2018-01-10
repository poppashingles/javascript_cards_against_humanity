const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nicknames = [];
const players = [];
app.use(bodyParser.json());
app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({extended: true}));
const Game = require('./src/models/game.js');
const Player = require('./src/models/player.js');
let selectedCards = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const newGame = new Game();

io.on('connection', function(socket) {
  socket.on('new user', function(data, callback) {
    if (nicknames.indexOf(data) != -1) {
      callback(false);
    } else {
      callback(true);
      socket.nickname = data;
      const player = {name: socket.nickname, id: socket.id};
      players.push(player);
      nicknames.push(socket.nickname);
      io.emit('usernames', nicknames);
      io.emit('chat message', socket.nickname + ' has joined the room');
    }
    if (nicknames.length === 1) {
      io.to(socket.id).emit('show button', data);
    }
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    if(socket.nickname) {
      io.emit('chat message', socket.nickname + ' has left the room');
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      players.splice(players.indexOf(socket.nickname), 1);
      io.emit('usernames', nicknames);
    }
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', socket.nickname + ': ' + msg);
  });

  socket.on('white card', function(card){

    let selectingPlayer = newGame.getPlayer(socket.id)
    // io.emit('selected white cards', {card: card, selectingPlayer: selectingPlayer} )

    selectedCards.push({card: card, selectingPlayer: selectingPlayer});
    let index = selectingPlayer.cards.indexOf(card);
    selectingPlayer.cards.splice(index, 1);
    console.log(selectedCards);
    if(selectedCards.length === players.length - 1) {
      io.emit('selected white cards', selectedCards);
    }


  })

  socket.on('czar selects winning card', function(data) {
    console.log("CZAR selected a winning card");
    let winnerOfRound = newGame.getPlayer(data.player.id)
    winnerOfRound.addPoint()
    io.emit('winner chosen')
    selectedCards = [];

    // if game over


    // new round


    newGame.dealWhiteCards()
    newGame.setCardCzar()


    newGame.players.forEach(function(player) {
      io.to(player.id).emit('cards given', player.cards)
      if (player.isCardCzar){
        io.to(player.id).emit('czar confirm', `${player.username}, you are the Card Czar. Select a winning card!`);
      }else{
        io.to(player.id).emit('czar confirm', `${player.username}, select a card to play`);
      };
    });
    io.emit('black card', newGame.getBlackCard());
    io.emit('announce winner')

  });

  socket.on('new game', function(msg){
    selectedCards = [];

    players.forEach(function(player){
      const newPlayer = new Player(player.name, player.id)
      newGame.addPlayer(newPlayer);
    });
    newGame.startGame();
    newGame.players.forEach(function(player) {
      io.to(player.id).emit('cards given', player.cards)
      if (player.isCardCzar){
        io.to(player.id).emit('czar confirm', `${player.username}, you are the Card Czar. Select a winning card!`);
      }else{
        io.to(player.id).emit('czar confirm', `${player.username}, select a card to play`);
      };
    });
    io.emit('black card', newGame.getBlackCard());







  });




});

const port = process.env.PORT || 3000;

http.listen(port, function() {
  console.log('App running!!');
});
